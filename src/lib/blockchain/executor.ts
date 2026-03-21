/**
 * Transaction Executor
 *
 * Parses structured transaction commands from LLM responses and executes
 * them on-chain using the agent's HD-derived wallet.
 *
 * Command format embedded in LLM output:
 *   [[SEND_CELO|<to_address>|<amount>]]
 *   [[SEND_TOKEN|<currency>|<to_address>|<amount>]]
 *
 * After execution, the command tags are replaced with a human-readable
 * transaction receipt block.
 */

import { type Address, isAddress, parseUnits, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { getWalletBalance, getPublicClient, detectFeeCurrency, getFeeCurrencyLabel, deriveAddress, getAgentWalletClient, getActiveChain, getRpcUrl } from "./wallet";
import { getTokenBalanceWei } from "./celoData";
import { getSessionPermission } from "./session-keys";
import { prisma } from "@/lib/db";
import { CELO_TOKENS, BLOCK_EXPLORER } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TransactionIntent {
  action: "send_celo" | "send_token" | "send_agent_token";
  to: string;
  amount: string;
  currency: string;
  tokenAddress?: string; // for send_agent_token
  raw: string; // original tag text
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
  intent: TransactionIntent;
  feeCurrencyUsed?: string; // e.g. "cUSD (fee abstraction)" or "CELO (native)"
}

// ─── Command Parsing ──────────────────────────────────────────────────────────

/**
 * Regex patterns for transaction commands embedded in LLM output.
 *   [[SEND_CELO|0x...|1.5]]
 *   [[SEND_TOKEN|cUSD|0x...|10]]
 *   [[SEND_AGENT_TOKEN|tokenAddress|toAddress|amount]] — send any ERC20 by address
 */
const SEND_CELO_REGEX = /\[\[SEND_CELO\|([^\|]+)\|([^\]]+)\]\]/g;
const SEND_TOKEN_REGEX = /\[\[SEND_TOKEN\|([^\|]+)\|([^\|]+)\|([^\]]+)\]\]/g;
const SEND_AGENT_TOKEN_REGEX = /\[\[SEND_AGENT_TOKEN\|([^\|]+)\|([^\|]+)\|([^\]]+)\]\]/g;

/**
 * Extract all transaction intents from an LLM response string.
 */
export function parseTransactionIntents(text: string): TransactionIntent[] {
  const intents: TransactionIntent[] = [];

  // Match SEND_CELO commands
  let match;
  const celoRegex = new RegExp(SEND_CELO_REGEX.source, "g");
  while ((match = celoRegex.exec(text)) !== null) {
    intents.push({
      action: "send_celo",
      to: match[1].trim(),
      amount: match[2].trim(),
      currency: "CELO",
      raw: match[0],
    });
  }

  // Match SEND_TOKEN commands
  const tokenRegex = new RegExp(SEND_TOKEN_REGEX.source, "g");
  while ((match = tokenRegex.exec(text)) !== null) {
    intents.push({
      action: "send_token",
      to: match[2].trim(),
      amount: match[3].trim(),
      currency: match[1].trim().toUpperCase(),
      raw: match[0],
    });
  }

  // Match SEND_AGENT_TOKEN commands (tokenAddress|toAddress|amount)
  const agentTokenRegex = new RegExp(SEND_AGENT_TOKEN_REGEX.source, "g");
  while ((match = agentTokenRegex.exec(text)) !== null) {
    intents.push({
      action: "send_agent_token",
      to: match[2].trim(),
      amount: match[3].trim(),
      currency: "AGENT_TOKEN",
      tokenAddress: match[1].trim(),
      raw: match[0],
    });
  }

  return intents;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateAddress(addr: string): addr is Address {
  return isAddress(addr);
}

function validateAmount(amount: string, isAgentToken = false): boolean {
  const n = parseFloat(amount);
  if (isNaN(n) || n <= 0) return false;
  // Agent tokens (e.g. for sponsorship) can have large supplies (1M, 10M+)
  if (isAgentToken) return n <= 1e15; // cap at 1 quadrillion
  return n < 1_000_000; // CELO/stablecoins: cap at 1M
}

function getTokenInfo(currency: string) {
  const key = currency.toUpperCase() as keyof typeof CELO_TOKENS;
  return CELO_TOKENS[key] || null;
}

// ─── Execution ────────────────────────────────────────────────────────────────

/**
 * Execute a single transaction intent using the agent's wallet.
 * Supports both HD-derived wallets and ERC-7715 session keys.
 */
async function executeIntent(
  intent: TransactionIntent,
  walletIndex: number,
  agentId: string
): Promise<TransactionResult> {
  // Validate address
  if (!validateAddress(intent.to)) {
    return {
      success: false,
      error: `Invalid recipient address: ${intent.to}`,
      intent,
    };
  }

  // Validate amount (agent tokens allow larger amounts for sponsorship)
  if (!validateAmount(intent.amount, intent.action === "send_agent_token")) {
    return {
      success: false,
      error: `Invalid amount: ${intent.amount}`,
      intent,
    };
  }

  try {
    const hdAddress = deriveAddress(walletIndex);

    // Check for ERC-7715 session key — if active, use it for signing
    const session = await getSessionPermission(agentId);
    let signerAddress: Address;
    let walletClient: ReturnType<typeof createWalletClient>;
    let usingSessionKey = false;

    if (session) {
      // Session key is active: decrypt and use it
      const sessionAccount = privateKeyToAccount(`0x${session.sessionPrivateKey}` as `0x${string}`);
      signerAddress = sessionAccount.address as Address;
      walletClient = createWalletClient({
        account: sessionAccount,
        chain: getActiveChain(),
        transport: http(getRpcUrl()),
      });
      usingSessionKey = true;
      console.log(`[Executor] Using ERC-7715 session key: ${signerAddress}`);
    } else {
      // Fall back to HD wallet
      signerAddress = hdAddress;
      walletClient = getAgentWalletClient(walletIndex);
    }

    // Detect fee currency for reporting
    const feeCurrencyAddr = await detectFeeCurrency(signerAddress);
    const feeCurrencyLabel = getFeeCurrencyLabel(feeCurrencyAddr);

    let txHash: string;

    // ── Resolve amount in wei ────────────────────────────────────────────────
    const amountFormatted = String(intent.amount).replace(/,/g, "");

    if (intent.action === "send_celo") {
      const value = parseEtherSafe(amountFormatted);
      const txParams = buildTxParams(signerAddress, intent.to as Address, value, undefined);
      txHash = await walletClient.sendTransaction(txParams);
    } else if (intent.action === "send_agent_token" && intent.tokenAddress && validateAddress(intent.tokenAddress)) {
      const balanceWei = await getTokenBalanceWei(intent.tokenAddress as Address, signerAddress);
      let amountWei: bigint;
      try {
        amountWei = parseUnits(amountFormatted, 18);
      } catch {
        return {
          success: false,
          error: `Invalid amount format: ${intent.amount}. Use a number without commas.`,
          intent,
        };
      }
      if (BigInt(balanceWei) < amountWei) {
        const balanceHuman = (Number(balanceWei) / 1e18).toLocaleString(undefined, { maximumFractionDigits: 0 });
        return {
          success: false,
          error: `Insufficient balance. Wallet has ${balanceHuman} tokens, but ${intent.amount} requested.`,
          intent,
        };
      }
      txHash = await sendTokenWithClient(
        walletClient, signerAddress, intent.tokenAddress as Address,
        intent.to as Address, amountFormatted, 18, feeCurrencyAddr
      );
    } else {
      const tokenInfo = getTokenInfo(intent.currency);
      if (!tokenInfo) {
        return {
          success: false,
          error: `Unsupported currency: ${intent.currency}. Supported: ${Object.keys(CELO_TOKENS).join(", ")}`,
          intent,
        };
      }
      if (tokenInfo.address === "0x0000000000000000000000000000000000000000") {
        const value = parseEtherSafe(amountFormatted);
        txHash = await walletClient.sendTransaction(
          buildTxParams(signerAddress, intent.to as Address, value, undefined)
        );
      } else {
        txHash = await sendTokenWithClient(
          walletClient, signerAddress, tokenInfo.address as Address,
          intent.to as Address, amountFormatted, tokenInfo.decimals, feeCurrencyAddr
        );
      }
    }

    // Wait for receipt
    const publicClient = getPublicClient();
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
      timeout: 30_000,
    });

    const signerLabel = usingSessionKey ? `session key ${signerAddress}` : `HD wallet ${signerAddress}`;
    await prisma.transaction.create({
      data: {
        agentId,
        txHash,
        type: "send",
        status: receipt.status === "success" ? "confirmed" : "failed",
        toAddress: intent.to,
        amount: parseFloat(intent.amount),
        currency: intent.currency,
        gasUsed: receipt.gasUsed ? Number(receipt.gasUsed) / 1e18 : null,
        blockNumber: receipt.blockNumber ? Number(receipt.blockNumber) : null,
        description: `Sent ${intent.amount} ${intent.currency} to ${intent.to} via ${signerLabel} (gas: ${feeCurrencyLabel})`,
      },
    });

    return {
      success: receipt.status === "success",
      txHash,
      intent,
      feeCurrencyUsed: feeCurrencyLabel,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const isNonceTooLow = /nonce too low|nonce provided.*lower/i.test(msg);

    if (isNonceTooLow) {
      console.warn(`Transaction failed (nonce too low), retrying once...`);
      try {
        // Re-check session key for retry
        const sessionRetry = await getSessionPermission(agentId);
        let signerAddressRetry: Address;
        let walletClientRetry: ReturnType<typeof createWalletClient>;
        if (sessionRetry) {
          const account = privateKeyToAccount(`0x${sessionRetry.sessionPrivateKey}` as `0x${string}`);
          signerAddressRetry = account.address as Address;
          walletClientRetry = createWalletClient({ account, chain: getActiveChain(), transport: http(getRpcUrl()) });
        } else {
          signerAddressRetry = deriveAddress(walletIndex);
          walletClientRetry = getAgentWalletClient(walletIndex);
        }
        const feeCurrencyAddr = await detectFeeCurrency(signerAddressRetry);
        const feeCurrencyLabel = getFeeCurrencyLabel(feeCurrencyAddr);
        const amountFormatted = String(intent.amount).replace(/,/g, "");

        let txHashRetry: string;
        if (intent.action === "send_celo" || (!intent.tokenAddress && !["cUSD","cEUR","cREAL"].includes(intent.currency.toUpperCase()))) {
          txHashRetry = await walletClientRetry.sendTransaction(
            buildTxParams(signerAddressRetry, intent.to as Address, parseEtherSafe(amountFormatted), undefined)
          );
        } else {
          const tokenInfo = getTokenInfo(intent.currency);
          const addr = intent.tokenAddress || tokenInfo?.address;
          const decimals = intent.tokenAddress ? 18 : (tokenInfo?.decimals ?? 18);
          txHashRetry = await sendTokenWithClient(
            walletClientRetry, signerAddressRetry, addr as Address,
            intent.to as Address, amountFormatted, decimals, feeCurrencyAddr
          );
        }

        const publicClient = getPublicClient();
        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHashRetry as `0x${string}`, timeout: 30_000 });
        await prisma.transaction.create({
          data: {
            agentId,
            txHash: txHashRetry,
            type: "send",
            status: receipt.status === "success" ? "confirmed" : "failed",
            toAddress: intent.to,
            amount: parseFloat(intent.amount),
            currency: intent.currency,
            gasUsed: receipt.gasUsed ? Number(receipt.gasUsed) / 1e18 : null,
            blockNumber: receipt.blockNumber ? Number(receipt.blockNumber) : null,
            description: `Sent ${intent.amount} ${intent.currency} to ${intent.to} (retry, gas: ${feeCurrencyLabel})`,
          },
        });
        return { success: receipt.status === "success", txHash: txHashRetry, intent, feeCurrencyUsed: feeCurrencyLabel };
      } catch (retryError) {
        console.error(`Retry failed:`, retryError);
      }
    }

    console.error(`Transaction execution failed:`, msg);
    await prisma.transaction.create({
      data: {
        agentId,
        type: "send",
        status: "failed",
        toAddress: intent.to,
        amount: parseFloat(intent.amount),
        currency: intent.currency,
        description: `Failed: ${msg.slice(0, 200)}`,
      },
    });

    return {
      success: false,
      error: msg,
      intent,
    };
  }
}

function parseEtherSafe(amount: string) {
  const n = parseFloat(amount);
  return parseUnits(n.toFixed(18), 18);
}

function buildTxParams(
  from: Address,
  to: Address,
  value: bigint,
  feeCurrency: Address | undefined
): Parameters<ReturnType<typeof createWalletClient>["sendTransaction"]>[0] {
  const params: Parameters<ReturnType<typeof createWalletClient>["sendTransaction"]>[0] = {
    account: from,
    to,
    value,
    chain: getActiveChain(),
  };
  if (feeCurrency) {
    (params as Record<string, unknown>).feeCurrency = feeCurrency;
  }
  return params;
}

async function sendTokenWithClient(
  walletClient: ReturnType<typeof createWalletClient>,
  from: Address,
  tokenAddress: Address,
  to: Address,
  amount: string,
  decimals: number,
  feeCurrency: Address | undefined
): Promise<string> {
  const { encodeFunctionData } = await import("viem");
  const data = encodeFunctionData({
    abi: [
      {
        name: "transfer",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "success", type: "bool" }],
      },
    ],
    functionName: "transfer",
    args: [to, parseUnits(amount.replace(/,/g, ""), decimals)],
  });

  const txParams: Parameters<ReturnType<typeof createWalletClient>["sendTransaction"]>[0] = {
    account: from,
    to: tokenAddress,
    data,
    chain: getActiveChain(),
  };
  if (feeCurrency) {
    (txParams as Record<string, unknown>).feeCurrency = feeCurrency;
  }
  return walletClient.sendTransaction(txParams);
}

// ─── Format Results ───────────────────────────────────────────────────────────

function formatTxResult(result: TransactionResult): string {
  const assetLabel = result.intent.currency === "AGENT_TOKEN" ? "agent tokens" : result.intent.currency;
  if (result.success && result.txHash) {
    return [
      `\n✅ **Transaction Confirmed**`,
      `• Sent: ${result.intent.amount} ${assetLabel}`,
      `• To: ${result.intent.to}`,
      `• TX Hash: \`${result.txHash}\``,
      `• Explorer: ${BLOCK_EXPLORER}/tx/${result.txHash}`,
      result.feeCurrencyUsed ? `• Gas paid in: ${result.feeCurrencyUsed}` : "",
    ].filter(Boolean).join("\n");
  } else {
    return [
      `\n❌ **Transaction Failed**`,
      `• Attempted: ${result.intent.amount} ${assetLabel} → ${result.intent.to}`,
      `• Error: ${result.error || "Unknown error"}`,
    ].join("\n");
  }
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────

/**
 * Process LLM response text: find transaction commands, execute them,
 * and replace the command tags with human-readable results.
 *
 * Returns the updated text with transaction receipts.
 */
export async function executeTransactionsInResponse(
  responseText: string,
  agentId: string,
  walletIndex: number | null,
  disallowedReason?: string
): Promise<{ text: string; executedCount: number; results: TransactionResult[] }> {
  const intents = parseTransactionIntents(responseText);

  if (intents.length === 0) {
    return { text: responseText, executedCount: 0, results: [] };
  }

  // Agent must have a wallet (or caller must be admin)
  if (walletIndex === null) {
    const msg =
      disallowedReason ??
      "Cannot execute transaction — this agent does not have a wallet initialized. Please initialize a wallet first.";
    let updatedText = responseText;
    for (const intent of intents) {
      updatedText = updatedText.replace(intent.raw, `\n⚠️ **${msg}**`);
    }
    return { text: updatedText, executedCount: 0, results: [] };
  }

  // Check balance first
  try {
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      select: { agentWalletAddress: true, spendingLimit: true, spendingUsed: true },
    });

    if (agent?.agentWalletAddress) {
      const balance = await getWalletBalance(agent.agentWalletAddress as Address);

      // Quick balance check for CELO sends
      const totalCeloNeeded = intents
        .filter((i) => i.currency === "CELO")
        .reduce((sum, i) => sum + parseFloat(i.amount), 0);

      if (totalCeloNeeded > parseFloat(balance.nativeBalance)) {
        let updatedText = responseText;
        for (const intent of intents) {
          if (intent.currency === "CELO") {
            updatedText = updatedText.replace(
              intent.raw,
              `\n⚠️ **Insufficient CELO balance.** Wallet has ${parseFloat(balance.nativeBalance).toFixed(4)} CELO but needs ${totalCeloNeeded} CELO. Please top up the agent wallet.`
            );
          }
        }
        if (intents.every((i) => i.currency === "CELO")) {
          return { text: updatedText, executedCount: 0, results: [] };
        }
      }

      // Spending limit check — only count USD-equivalent (CELO, cUSD, cEUR, cREAL)
      const { getAmountUsd } = await import("./spending");
      let totalSpendUsd = 0;
      for (const i of intents) {
        if (i.action === "send_agent_token") continue;
        const usd = await getAmountUsd(i.currency, parseFloat(i.amount));
        if (usd != null) totalSpendUsd += usd;
      }
      if (agent.spendingLimit && totalSpendUsd > 0 && (agent.spendingUsed + totalSpendUsd) > agent.spendingLimit) {
        let updatedText = responseText;
        for (const intent of intents) {
          updatedText = updatedText.replace(
            intent.raw,
            `\n⚠️ **Spending limit reached.** Used: $${agent.spendingUsed.toFixed(2)} / Limit: $${agent.spendingLimit.toFixed(2)}.`
          );
        }
        return { text: updatedText, executedCount: 0, results: [] };
      }
    }
  } catch (err) {
    console.warn("Pre-execution balance check failed:", err);
    // Continue anyway — sendCelo/sendToken will fail with a clear error
  }

  // Execute all intents sequentially
  const results: TransactionResult[] = [];
  let updatedText = responseText;

  for (const intent of intents) {
    const result = await executeIntent(intent, walletIndex, agentId);
    results.push(result);

    // Replace the command tag with the result
    updatedText = updatedText.replace(intent.raw, formatTxResult(result));

    // Update spending — only USD-equivalent tokens (CELO, cUSD, cEUR, cREAL)
    if (result.success && intent.action !== "send_agent_token") {
      const { getAmountUsd } = await import("./spending");
      const usdValue = await getAmountUsd(intent.currency, parseFloat(intent.amount));
      if (usdValue != null && usdValue > 0) {
        await prisma.agent.update({
          where: { id: agentId },
          data: { spendingUsed: { increment: usdValue } },
        });
      }
    }
  }

  // Log execution summary
  const successCount = results.filter((r) => r.success).length;
  await prisma.activityLog.create({
    data: {
      agentId,
      type: successCount === results.length ? "action" : "warning",
      message: `Executed ${successCount}/${results.length} transaction(s)`,
      metadata: JSON.stringify(
        results.map((r) => ({
          success: r.success,
          txHash: r.txHash,
          amount: r.intent.amount,
          currency: r.intent.currency,
          to: r.intent.to,
          error: r.error,
        }))
      ),
    },
  });

  return {
    text: updatedText,
    executedCount: successCount,
    results,
  };
}

