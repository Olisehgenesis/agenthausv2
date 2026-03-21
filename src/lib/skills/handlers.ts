/**
 * Skill Handlers
 *
 * Each handler implements the execute() logic for a single skill.
 * These are pure async functions taking (params, ctx) → SkillResult.
 *
 * Handlers lazy-import heavy blockchain libs so the module tree-shakes well.
 */

import { type Address, isAddress, createPublicClient, createWalletClient, http, formatUnits, parseUnits, type Chain } from "viem";
import { celo, celoSepolia, mainnet, optimism, polygon, arbitrum, avalanche, base, sepolia, optimismSepolia, arbitrumSepolia, scroll, linea, bsc, gnosis, baseSepolia } from "viem/chains";
import {
  getNetworkStatus,
  getBlock,
  getLatestBlocks,
  getTransaction,
  getTokenInfo,
  getTokenBalance,
  getNftInfo,
  getNftBalance,
  getGasFeeData,
  getGovernanceProposals,
  getProposalDetails,
  estimateContractGas,
} from "@/lib/blockchain/celoData";
import type { SkillContext, SkillResult } from "./types";
import { FEEDBACK_INLINE_MARKER, REGISTER_ERC8004_INLINE_MARKER } from "./feedback-marker";
import { fmtAddr, fmtHash, fmtHeader, fmtSection, fmtBullet, fmtMeta, fmtCode } from "./formatDisplay";
import { prisma } from "@/lib/db";

// ─── Oracle / Rate handlers ──────────────────────────────────────────────────

export async function executeQueryRate(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const currency = params[0] || "cUSD";
  const { getOracleRate } = await import("@/lib/blockchain/mento");

  try {
    const rate = await getOracleRate(currency);
    const display = [
      fmtHeader(`${rate.pair} Exchange Rate`, "📊"),
      "",
      fmtBullet(`1 CELO = **${rate.rate.toFixed(4)}** ${currency}`),
      fmtBullet(`1 ${currency} = **${rate.inverse.toFixed(4)}** CELO`),
      fmtBullet(`Reporters: ${rate.numReporters}`),
      fmtBullet(`Last update: ${rate.lastUpdate.toISOString()}`),
      fmtBullet(`Source: ${rate.source === "sorted_oracles" ? "Celo SortedOracles (on-chain)" : "Estimated (API fallback)"}`),
      rate.isExpired ? fmtBullet("⚠️ Warning: Oracle data may be stale") : "",
      "",
      rate.isExpired ? fmtMeta("Oracle data may be stale") : "",
    ].filter(Boolean).join("\n");

    return { success: true, data: rate as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to query ${currency} rate: ${error}` };
  }
}

export async function executeQueryAllRates(_params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const { getAllOracleRates } = await import("@/lib/blockchain/mento");

  try {
    const rates = await getAllOracleRates();
    const lines = rates.map((r) =>
      fmtBullet(`${r.pair}: 1 CELO = **${r.rate.toFixed(4)}** ${r.pair.split("/")[1]} (${r.source})`)
    );

    const display = [
      fmtHeader("Celo Exchange Rates (SortedOracles)", "📊"),
      "",
      ...lines,
      "",
      fmtMeta(`Updated: ${new Date().toISOString()}`),
    ].join("\n");

    return { success: true, data: { rates } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to query rates: ${error}` };
  }
}

// ─── Mento handlers ──────────────────────────────────────────────────────────

export async function executeMentoQuote(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const [sellCurrency, buyCurrency, amount] = params;
  if (!sellCurrency || !buyCurrency || !amount) {
    return { success: false, error: "Missing parameters", display: "❌ Usage: [[MENTO_QUOTE|sell_currency|buy_currency|amount]]" };
  }

  const { getMentoQuote } = await import("@/lib/blockchain/mento");

  try {
    const quote = await getMentoQuote(sellCurrency, buyCurrency, amount);
    const display = [
      fmtHeader("Mento Swap Quote", "💱"),
      "",
      fmtBullet(`Sell: **${quote.sellAmount}** ${quote.sellCurrency}`),
      fmtBullet(`Buy: ~**${parseFloat(quote.buyAmount).toFixed(4)}** ${quote.buyCurrency}`),
      fmtBullet(`Rate: 1 ${quote.sellCurrency} = ${quote.rate.toFixed(4)} ${quote.buyCurrency}`),
      fmtBullet(`Est. slippage: ${quote.slippage}%`),
      fmtBullet(`Source: ${quote.source}`),
      "",
      fmtMeta(`To execute: "swap ${quote.sellAmount} ${quote.sellCurrency} for ${quote.buyCurrency}"`),
    ].join("\n");

    return { success: true, data: quote as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to get quote: ${error}` };
  }
}

export async function executeMentoSwap(params: string[], ctx: SkillContext): Promise<SkillResult> {
  const [sellCurrency, buyCurrency, amount] = params;
  if (!sellCurrency || !buyCurrency || !amount) {
    return { success: false, error: "Missing parameters", display: "❌ Usage: [[MENTO_SWAP|sell_currency|buy_currency|amount]]" };
  }

  if (!ctx.agentWalletAddress || ctx.walletDerivationIndex === null) {
    return { success: false, error: "No wallet", display: "⚠️ Agent wallet not initialized. Cannot execute swap." };
  }

  const { getMentoQuote } = await import("@/lib/blockchain/mento");

  try {
    const quote = await getMentoQuote(sellCurrency, buyCurrency, amount);

    const display = [
      fmtHeader("Mento Swap (Simulated on Testnet)", "💱"),
      "",
      fmtBullet(`Sold: **${quote.sellAmount}** ${quote.sellCurrency}`),
      fmtBullet(`Bought: ~**${parseFloat(quote.buyAmount).toFixed(4)}** ${quote.buyCurrency}`),
      fmtBullet(`Rate: 1 ${quote.sellCurrency} = ${quote.rate.toFixed(4)} ${quote.buyCurrency}`),
      fmtBullet(`Slippage: ${quote.slippage}%`),
      "",
      fmtMeta("⚠️ On Celo Sepolia testnet, Mento swaps are simulated. Real execution available on mainnet."),
    ].join("\n");

    return { success: true, data: quote as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Swap failed: ${error}` };
  }
}

// ─── Data handlers ───────────────────────────────────────────────────────────

export async function executeCheckBalance(params: string[], ctx: SkillContext): Promise<SkillResult> {
  let address = params[0];
  if (!address && ctx.agentWalletAddress) {
    address = ctx.agentWalletAddress;
  }
  if (!address || !isAddress(address)) {
    return { success: false, error: "Invalid address", display: "❌ Please provide a valid 0x address." };
  }

  const { checkBalance } = await import("@/lib/blockchain/mento");

  try {
    const bal = await checkBalance(address as Address);
    const display = [
      fmtHeader(`Balance for ${fmtAddr(address)}`, "💰"),
      "",
      fmtBullet(`CELO: **${parseFloat(bal.celo).toFixed(4)}**`),
      fmtBullet(`cUSD: **${parseFloat(bal.cUSD).toFixed(4)}**`),
      fmtBullet(`cEUR: **${parseFloat(bal.cEUR).toFixed(4)}**`),
      fmtBullet(`cREAL: **${parseFloat(bal.cREAL).toFixed(4)}**`),
    ].join("\n");

    return { success: true, data: bal as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to check balance: ${error}` };
  }
}

export async function executeGasPrice(_params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const { getGasPrice } = await import("@/lib/blockchain/mento");

  try {
    const gas = await getGasPrice();
    const display = [
      fmtHeader("Celo Gas Price", "⛽"),
      "",
      fmtBullet(`Base fee: **${parseFloat(gas.baseFee).toFixed(2)}** gwei`),
      fmtBullet(`Suggested tip: **${gas.suggestedTip}** gwei`),
      fmtBullet(`Simple transfer cost: ~**${parseFloat(gas.estimatedCost).toFixed(6)}** CELO`),
    ].join("\n");

    return { success: true, data: gas as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to get gas price: ${error}` };
  }
}

// ─── Forex / Analysis handlers ───────────────────────────────────────────────

export async function executeForexAnalysis(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const pair = params[0] || "";
  const { getAllOracleRates, getOracleRate } = await import("@/lib/blockchain/mento");
  const { analyzeTrend, predictPrice, recordAllPriceSnapshots, getPriceHistory } = await import("@/lib/blockchain/price-tracker");

  // Always record fresh snapshots so trend data stays current
  await recordAllPriceSnapshots().catch(() => { });

  try {
    if (pair && pair.includes("/")) {
      // Specific pair analysis
      const [, buy] = pair.split("/");
      const rate = await getOracleRate(buy);

      // Include trend data
      const trend = analyzeTrend(rate.pair, 60);
      const prediction = predictPrice(rate.pair);
      const history = getPriceHistory(rate.pair, 10);

      const display = [
        fmtHeader(`Forex Analysis: ${rate.pair}`, "📈"),
        "",
        fmtSection("Current Rate"),
        fmtBullet(`1 CELO = **${rate.rate.toFixed(4)}** ${buy}`),
        fmtBullet(`1 ${buy} = **${rate.inverse.toFixed(4)}** CELO`),
        "",
        fmtSection("Oracle Status"),
        fmtBullet(`Active reporters: ${rate.numReporters}`),
        fmtBullet(`Last update: ${rate.lastUpdate.toISOString()}`),
        fmtBullet(`Data fresh: ${rate.isExpired ? "❌ Stale" : "✅ Fresh"}`),
        fmtBullet(`Source: ${rate.source}`),
        "",
        trend ? [
          fmtSection(`Trend (${trend.period})`),
          fmtBullet(`Direction: ${trend.direction === "up" ? "📈 Up" : trend.direction === "down" ? "📉 Down" : "➡️ Flat"}`),
          fmtBullet(`Change: ${trend.change > 0 ? "+" : ""}${trend.changePercent.toFixed(3)}%`),
          fmtBullet(`Previous: ${trend.previousRate.toFixed(6)} → Current: ${trend.currentRate.toFixed(6)}`),
          fmtBullet(`Data points: ${trend.snapshots}`),
        ].join("\n") : `${fmtSection("Trend")} Not enough data yet (start price tracking first)`,
        "",
        prediction ? [
          fmtSection(`Prediction (${prediction.timeframe})`),
          fmtBullet(`Direction: ${prediction.predictedDirection === "up" ? "📈" : prediction.predictedDirection === "down" ? "📉" : "➡️"} ${prediction.predictedDirection.toUpperCase()}`),
          fmtBullet(`Predicted rate: **${prediction.predictedRate.toFixed(6)}**`),
          fmtBullet(`Confidence: ${prediction.confidence === "high" ? "🟢" : prediction.confidence === "medium" ? "🟡" : "🔴"} ${prediction.confidence}`),
          fmtBullet(`Reasoning: ${prediction.reasoning}`),
        ].join("\n") : `${fmtSection("Prediction")} Need ≥ 5 data points — run price tracking first`,
        "",
        fmtSection("Analysis"),
        rate.numReporters >= 3
          ? fmtBullet(`Oracle has sufficient reporters (${rate.numReporters}) — rate is reliable.`)
          : fmtBullet(`⚠️ Low reporter count (${rate.numReporters}) — rate may be less reliable.`),
        rate.isExpired
          ? fmtBullet("⚠️ Oracle data is expired — exercise caution with trades.")
          : fmtBullet("Oracle data is fresh — safe to trade at quoted rates."),
        history.length > 0 ? fmtBullet(`${history.length} price snapshots recorded in current session.`) : "",
      ].filter(Boolean).join("\n");

      return { success: true, data: rate as unknown as Record<string, unknown>, display };
    }

    // Full market overview
    const rates = await getAllOracleRates();
    const lines = rates.map((r) => {
      const freshIcon = r.isExpired ? "⚠️" : "✅";
      const trend = analyzeTrend(r.pair, 60);
      const trendIcon = trend
        ? (trend.direction === "up" ? "📈" : trend.direction === "down" ? "📉" : "➡️")
        : "•";
      const changeStr = trend
        ? ` (${trend.change > 0 ? "+" : ""}${trend.changePercent.toFixed(2)}%)`
        : "";
      return fmtBullet(`${trendIcon} **${r.pair}**: ${r.rate.toFixed(4)}${changeStr} (reporters: ${r.numReporters}) ${freshIcon}`);
    });

    const display = [
      fmtHeader("Celo Forex Market Overview", "📈"),
      "",
      fmtSection("Current Rates (SortedOracles)"),
      ...lines,
      "",
      fmtSection("Summary"),
      fmtBullet(`${rates.length} active pairs monitored`),
      fmtBullet("All rates sourced from Celo SortedOracles (on-chain)"),
      fmtBullet("Gas fees can be paid in cUSD via fee abstraction — no CELO needed!"),
      fmtBullet('Use "swap X CELO for cUSD" to execute a Mento trade'),
    ].join("\n");

    return { success: true, data: { rates } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Analysis failed: ${error}` };
  }
}

export async function executePortfolioStatus(_params: string[], ctx: SkillContext): Promise<SkillResult> {
  if (!ctx.agentWalletAddress) {
    return { success: false, error: "No wallet", display: "⚠️ Agent wallet not initialized." };
  }

  const { checkBalance } = await import("@/lib/blockchain/mento");
  const { getOracleRate } = await import("@/lib/blockchain/mento");

  try {
    const bal = await checkBalance(ctx.agentWalletAddress as Address);
    const celoRate = await getOracleRate("cUSD");

    const celoVal = parseFloat(bal.celo);
    const cusdVal = parseFloat(bal.cUSD);
    const ceurVal = parseFloat(bal.cEUR);
    const crealVal = parseFloat(bal.cREAL);

    // Value everything in USD terms
    const celoUsd = celoVal * celoRate.rate;
    const totalUsd = celoUsd + cusdVal + ceurVal * 1.08 + crealVal * 0.20; // Approximate

    const display = [
      fmtHeader("Agent Portfolio", "💼"),
      "",
      fmtBullet(`Wallet: ${fmtAddr(ctx.agentWalletAddress)}`),
      "",
      fmtSection("Holdings"),
      fmtBullet(`CELO: **${celoVal.toFixed(4)}** (~$${celoUsd.toFixed(2)})`),
      fmtBullet(`cUSD: **${cusdVal.toFixed(4)}** (~$${cusdVal.toFixed(2)})`),
      fmtBullet(`cEUR: **${ceurVal.toFixed(4)}** (~$${(ceurVal * 1.08).toFixed(2)})`),
      fmtBullet(`cREAL: **${crealVal.toFixed(4)}** (~$${(crealVal * 0.20).toFixed(2)})`),
      "",
      fmtSection(`Total Value: ~$${totalUsd.toFixed(2)}`),
      "",
      fmtMeta(`CELO/cUSD rate: ${celoRate.rate.toFixed(4)} (${celoRate.source})`),
    ].join("\n");

    return { success: true, data: { ...bal, totalUsd } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Portfolio check failed: ${error}` };
  }
}

// ── Price Tracking, Trend, Prediction, Alerts ────────────────────────────────

export async function executePriceTrack(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const target = (params[0] || "all").toUpperCase();
  const { recordAllPriceSnapshots, recordPriceSnapshot, getPriceHistory } = await import("@/lib/blockchain/price-tracker");

  try {
    if (target === "ALL") {
      const snapshots = await recordAllPriceSnapshots();
      const lines = snapshots.map((s) =>
        fmtBullet(`${s.pair}: **${s.rate.toFixed(6)}** (${s.source}) — ${s.timestamp.toISOString()}`)
      );

      const historyLines: string[] = [];
      for (const s of snapshots) {
        const hist = getPriceHistory(s.pair, 5);
        if (hist.length > 1) {
          const oldest = hist[0];
          const newest = hist[hist.length - 1];
          const change = ((newest.rate - oldest.rate) / oldest.rate) * 100;
          historyLines.push(fmtBullet(`${s.pair}: ${change > 0 ? "+" : ""}${change.toFixed(3)}% over ${hist.length} snapshots`));
        }
      }

      const display = [
        fmtHeader(`Price Snapshot Recorded (${snapshots.length} pairs)`, "📊"),
        "",
        ...lines,
        historyLines.length > 0 ? ["", fmtSection("Recent Changes"), ...historyLines] : [],
      ].flat().filter(Boolean).join("\n");

      return { success: true, data: { snapshots: snapshots.length } as Record<string, unknown>, display };
    }

    // Single pair
    const snapshot = await recordPriceSnapshot(target);
    const history = getPriceHistory(snapshot.pair, 10);
    const historyLines = history.map((h) =>
      fmtBullet(`${h.timestamp.toLocaleTimeString()}: **${h.rate.toFixed(6)}**`)
    );

    const display = [
      fmtHeader(`Price Recorded: ${snapshot.pair}`, "📊"),
      "",
      fmtBullet(`Current rate: **${snapshot.rate.toFixed(6)}**`),
      fmtBullet(`Source: ${snapshot.source}`),
      "",
      history.length > 1 ? [fmtSection(`Recent History (${history.length} points)`), ...historyLines] : [],
    ].flat().filter(Boolean).join("\n");

    return { success: true, data: snapshot as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Price tracking failed: ${error}` };
  }
}

export async function executePriceTrend(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const pairInput = params[0] || "all";
  const period = parseInt(params[1] || "60", 10);
  const { analyzeTrend, analyzeAllTrends, recordAllPriceSnapshots } = await import("@/lib/blockchain/price-tracker");

  // Ensure we have fresh data
  await recordAllPriceSnapshots().catch(() => { });

  try {
    if (pairInput.toUpperCase() === "ALL") {
      const trends = analyzeAllTrends(period);
      if (trends.length === 0) {
        return { success: true, data: {}, display: `${fmtHeader("No trend data yet", "📈")}\n\nRun ${fmtCode("[[PRICE_TRACK|all]]")} a few times to build history.` };
      }

      const lines = trends.map((t) => {
        const icon = t.direction === "up" ? "📈" : t.direction === "down" ? "📉" : "➡️";
        return fmtBullet(`${icon} **${t.pair}**: ${t.change > 0 ? "+" : ""}${t.changePercent.toFixed(3)}% (${t.previousRate.toFixed(6)} → ${t.currentRate.toFixed(6)}) [${t.snapshots} pts]`);
      });

      const display = [
        fmtHeader(`Price Trends (${formatPeriodLabel(period)})`, "📈"),
        "",
        ...lines,
      ].join("\n");

      return { success: true, data: { trends } as unknown as Record<string, unknown>, display };
    }

    // Specific pair
    const pair = pairInput.includes("/") ? pairInput : `CELO/${pairInput.toUpperCase()}`;
    const trend = analyzeTrend(pair, period);
    if (!trend) {
      return { success: true, data: {}, display: `${fmtHeader(`No trend data for ${pair}`, "📈")}\n\nRun ${fmtCode(`[[PRICE_TRACK|${pairInput}]]`)} a few times first.` };
    }

    const icon = trend.direction === "up" ? "📈" : trend.direction === "down" ? "📉" : "➡️";
    const display = [
      fmtHeader(`Trend: ${trend.pair} (${trend.period})`, icon),
      "",
      fmtBullet(`Direction: **${trend.direction.toUpperCase()}**`),
      fmtBullet(`Change: ${trend.change > 0 ? "+" : ""}${trend.changePercent.toFixed(3)}%`),
      fmtBullet(`From: ${trend.previousRate.toFixed(6)} → To: ${trend.currentRate.toFixed(6)}`),
      fmtBullet(`Data points: ${trend.snapshots}`),
    ].join("\n");

    return { success: true, data: trend as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Trend analysis failed: ${error}` };
  }
}

export async function executePricePredict(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const pairInput = params[0] || "all";
  const { predictPrice, predictAllPrices, recordAllPriceSnapshots } = await import("@/lib/blockchain/price-tracker");

  // Ensure we have fresh data
  await recordAllPriceSnapshots().catch(() => { });

  try {
    if (pairInput.toUpperCase() === "ALL") {
      const predictions = predictAllPrices();
      if (predictions.length === 0) {
        return { success: true, data: {}, display: `${fmtHeader("Not enough data for predictions", "🔮")}\n\nNeed at least 5 price snapshots. Run ${fmtCode("[[PRICE_TRACK|all]]")} periodically.` };
      }

      const lines = predictions.map((p) => {
        const icon = p.predictedDirection === "up" ? "📈" : p.predictedDirection === "down" ? "📉" : "➡️";
        const confIcon = p.confidence === "high" ? "🟢" : p.confidence === "medium" ? "🟡" : "🔴";
        return fmtBullet(`${icon} **${p.pair}** (${p.timeframe}): ${p.currentRate.toFixed(6)} → **${p.predictedRate.toFixed(6)}** | ${confIcon} ${p.confidence} — ${p.reasoning}`);
      });

      const display = [
        fmtHeader("Price Predictions (momentum-based)", "🔮"),
        "",
        ...lines,
        "",
        fmtMeta("⚠️ This is a simple heuristic, NOT financial advice."),
      ].join("\n");

      return { success: true, data: { predictions } as unknown as Record<string, unknown>, display };
    }

    // Specific pair
    const pair = pairInput.includes("/") ? pairInput : `CELO/${pairInput.toUpperCase()}`;
    const prediction = predictPrice(pair);
    if (!prediction) {
      return { success: true, data: {}, display: `${fmtHeader(`Not enough data for ${pair}`, "🔮")}\n\nNeed ≥ 5 snapshots. Run ${fmtCode(`[[PRICE_TRACK|${pairInput}]]`)} periodically.` };
    }

    const icon = prediction.predictedDirection === "up" ? "📈" : prediction.predictedDirection === "down" ? "📉" : "➡️";
    const confIcon = prediction.confidence === "high" ? "🟢" : prediction.confidence === "medium" ? "🟡" : "🔴";
    const display = [
      fmtHeader(`Prediction: ${prediction.pair} (${prediction.timeframe})`, "🔮"),
      "",
      fmtBullet(`${icon} Direction: **${prediction.predictedDirection.toUpperCase()}**`),
      fmtBullet(`Current: ${prediction.currentRate.toFixed(6)}`),
      fmtBullet(`Predicted: **${prediction.predictedRate.toFixed(6)}**`),
      fmtBullet(`Confidence: ${confIcon} ${prediction.confidence}`),
      fmtBullet(`Reasoning: ${prediction.reasoning}`),
      "",
      fmtMeta("⚠️ Simple momentum heuristic — not financial advice."),
    ].join("\n");

    return { success: true, data: prediction as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Prediction failed: ${error}` };
  }
}

export async function executePriceAlerts(params: string[], _ctx: SkillContext): Promise<SkillResult> {
  const threshold = parseFloat(params[0] || "2");
  const { checkAlerts, recordAllPriceSnapshots } = await import("@/lib/blockchain/price-tracker");

  // Ensure we have fresh data
  await recordAllPriceSnapshots().catch(() => { });

  try {
    const alerts = checkAlerts(threshold);

    if (alerts.length === 0) {
      return {
        success: true,
        data: { alerts: [] },
        display: `${fmtHeader(`No Price Alerts (threshold: ${threshold}%)`, "🔔")}\n\nAll Mento pairs are moving within normal ranges.`,
      };
    }

    const lines = alerts.map((a) => {
      const icon = a.severity === "critical" ? "🚨" : a.severity === "warning" ? "⚠️" : "ℹ️";
      return fmtBullet(`${icon} **${a.type.replace("_", " ").toUpperCase()}** — ${a.message}`);
    });

    const display = [
      fmtHeader(`Price Alerts (threshold: ${threshold}%)`, "🔔"),
      "",
      ...lines,
    ].join("\n");

    return { success: true, data: { alerts } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Alert check failed: ${error}` };
  }
}

// ─── Celo MCP-Equivalent handlers ────────────────────────────────────────────

export async function executeGetNetworkStatus(
  _params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  try {
    const status = await getNetworkStatus();
    const display = [
      fmtHeader("Network Status", "🌐"),
      "",
      fmtBullet(`Network: **${status.networkName}** (Chain ID: \`${status.chainId}\`)`),
      fmtBullet(`Latest Block: ${status.latestBlock}`),
      fmtBullet(`Gas Price: ${status.gasPrice}`),
      fmtBullet(`RPC: ${fmtHash(status.rpcUrl)}`),
      fmtBullet(`Explorer: [View blocks](${status.blockExplorerUrl})`),
    ].join("\n");
    return { success: true, data: status as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed to get network status: ${error}` };
  }
}

export async function executeGetBlock(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const blockId = params[0]?.trim() || "latest";
  try {
    const block = await getBlock(blockId);
    if (!block) {
      return { success: false, error: "Block not found", display: `Block ${blockId} not found.` };
    }
    const display = [
      fmtHeader(`Block #${block.number}`, "📦"),
      "",
      fmtBullet(`Hash: ${fmtHash(block.hash)}`),
      fmtBullet(`Timestamp: ${block.timestamp.toISOString()}`),
      fmtBullet(`Gas Used: ${block.gasUsed.toString()}`),
      fmtBullet(`Gas Limit: ${block.gasLimit.toString()}`),
      block.baseFeePerGas ? fmtBullet(`Base Fee: ${block.baseFeePerGas}`) : "",
      fmtBullet(`Transactions: ${block.transactionsCount}`),
    ].filter(Boolean).join("\n");
    return { success: true, data: block as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed to get block: ${error}` };
  }
}

export async function executeGetLatestBlocks(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const count = Math.min(parseInt(params[0] || "10", 10) || 10, 100);
  try {
    const blocks = await getLatestBlocks(count);
    const lines = blocks.map((b) =>
      fmtBullet(`**#${b.number}** — ${b.timestamp.toISOString()} | ${b.transactionsCount} txs | gas: ${b.gasUsed.toString()}`)
    );
    const display = [fmtHeader("Latest Blocks", "📦"), "", ...lines].join("\n");
    return { success: true, data: { blocks } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed to get blocks: ${error}` };
  }
}

export async function executeGetTransaction(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const txHash = params[0]?.trim();
  if (!txHash || !txHash.startsWith("0x")) {
    return { success: false, error: "Invalid tx hash", display: "Usage: [[GET_TRANSACTION|0x...]]" };
  }
  try {
    const tx = await getTransaction(txHash);
    if (!tx) {
      return { success: false, error: "Transaction not found", display: `Transaction ${txHash.slice(0, 16)}... not found.` };
    }
    const display = [
      fmtHeader(`Transaction ${fmtAddr(tx.hash, 10, 8)}`, "📄"),
      "",
      fmtBullet(`From: ${fmtHash(tx.from)}`),
      fmtBullet(`To: ${tx.to ? fmtHash(tx.to) : "contract creation"}`),
      fmtBullet(`Value: **${tx.value}** CELO`),
      fmtBullet(`Status: **${tx.status}**`),
      fmtBullet(`Block: ${tx.blockNumber}`),
      tx.timestamp ? fmtBullet(`Time: ${tx.timestamp.toISOString()}`) : "",
      fmtBullet(`Gas Used: ${tx.gasUsed}`),
      fmtBullet(`Gas Price: ${tx.gasPrice}`),
    ].filter(Boolean).join("\n");
    return { success: true, data: tx as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed to get transaction: ${error}` };
  }
}

export async function executeGetTokenInfo(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const addr = params[0]?.trim();
  if (!addr || !isAddress(addr)) {
    return { success: false, error: "Invalid address", display: "Usage: [[GET_TOKEN_INFO|0x...]]" };
  }
  try {
    const info = await getTokenInfo(addr as Address);
    if (!info) {
      return { success: false, error: "Not an ERC20", display: "Contract is not a valid ERC20 token." };
    }
    const display = [
      fmtHeader(`${info.name} (${info.symbol})`, "🪙"),
      "",
      fmtBullet(`Address: ${fmtHash(info.address)}`),
      fmtBullet(`Decimals: ${info.decimals}`),
      fmtBullet(`Total Supply: **${info.totalSupply}**`),
    ].join("\n");
    return { success: true, data: info as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetTokenBalance(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [tokenAddr, ownerAddr] = params.map((p) => p?.trim());
  if (!tokenAddr || !isAddress(tokenAddr) || !ownerAddr || !isAddress(ownerAddr)) {
    return { success: false, error: "Invalid params", display: "Usage: [[GET_TOKEN_BALANCE|tokenAddress|ownerAddress]]" };
  }
  try {
    const balance = await getTokenBalance(tokenAddr as Address, ownerAddr as Address);
    const display = [
      fmtHeader("Token Balance", "🪙"),
      "",
      fmtBullet(`Address: ${fmtAddr(ownerAddr, 10, 8)}`),
      fmtBullet(`Balance: **${balance}**`),
    ].join("\n");
    return { success: true, data: { balance } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetNftInfo(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [contractAddr, tokenId] = params.map((p) => p?.trim());
  if (!contractAddr || !isAddress(contractAddr)) {
    return { success: false, error: "Invalid address", display: "Usage: [[GET_NFT_INFO|contractAddress|tokenId]]" };
  }
  try {
    const info = await getNftInfo(contractAddr as Address, tokenId);
    if (!info) {
      return { success: false, error: "Not an NFT", display: "Contract is not a valid ERC721/ERC1155 NFT." };
    }
    const display = [
      fmtHeader(`${info.name} (${info.type})`, "🖼️"),
      "",
      fmtBullet(`Address: ${fmtHash(info.address)}`),
      info.symbol ? fmtBullet(`Symbol: ${info.symbol}`) : "",
      info.tokenURI ? fmtBullet(`Token URI: [link](${info.tokenURI})`) : "",
    ].filter(Boolean).join("\n");
    return { success: true, data: info as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetNftBalance(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [contractAddr, ownerAddr, tokenId] = params.map((p) => p?.trim());
  if (!contractAddr || !isAddress(contractAddr) || !ownerAddr || !isAddress(ownerAddr)) {
    return { success: false, error: "Invalid params", display: "Usage: [[GET_NFT_BALANCE|contractAddress|ownerAddress|tokenId]]" };
  }
  try {
    const balance = await getNftBalance(contractAddr as Address, ownerAddr as Address, tokenId);
    const display = [
      fmtHeader("NFT Balance", "🖼️"),
      "",
      fmtBullet(`Owner: ${fmtAddr(ownerAddr, 10, 8)}`),
      fmtBullet(`Balance: **${balance}**`),
    ].join("\n");
    return { success: true, data: { balance } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeEstimateGas(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const [contractAddr, functionName, argsStr] = params.map((p) => p?.trim());
  if (!contractAddr || !isAddress(contractAddr) || !functionName) {
    return { success: false, error: "Invalid params", display: "Usage: [[ESTIMATE_GAS|contractAddress|functionName|args]]" };
  }
  const account = (ctx.agentWalletAddress || "0x0000000000000000000000000000000000000000") as Address;
  const args = argsStr ? argsStr.split(",").map((a) => a.trim()) : [];
  try {
    const result = await estimateContractGas(contractAddr as Address, functionName, args, account);
    if (result.error) {
      return { success: false, error: result.error, display: `Gas estimation failed: ${result.error}` };
    }
    return {
      success: true,
      data: { gasEstimate: result.gasEstimate } as unknown as Record<string, unknown>,
      display: `${fmtHeader("Gas Estimate", "⛽")}\n\n**${result.gasEstimate}** units`,
    };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetGasFeeData(
  _params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  try {
    const data = await getGasFeeData();
    const display = [
      fmtHeader("Gas Fee Data (EIP-1559)", "⛽"),
      "",
      fmtBullet(`Base Fee: **${data.baseFeePerGas}**`),
      fmtBullet(`Max Fee: **${data.maxFeePerGas}**`),
      fmtBullet(`Priority Fee: **${data.maxPriorityFeePerGas}**`),
      fmtBullet(`Est. Simple Transfer: **${data.estimatedCostCelo}**`),
    ].join("\n");
    return { success: true, data: data as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetGovernanceProposals(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const limit = parseInt(params[0] || "10", 10) || 10;
  try {
    const { proposals, error } = await getGovernanceProposals({ limit, includeInactive: true });
    if (error) {
      return {
        success: false,
        error,
        display: `Governance: ${error} Set CELO_GOVERNANCE_API_URL to enable.`,
      };
    }
    if (proposals.length === 0) {
      return { success: true, data: {} as Record<string, unknown>, display: "No governance proposals found." };
    }
    const lines = proposals.slice(0, limit).map((p) => {
      const title = (p.title || `Proposal ${p.id}`).slice(0, 50);
      const votes = p.votes ? ` | Yes: ${p.votes.yes?.percentage ?? 0}%` : "";
      return fmtBullet(`**#${p.id}** ${title}${votes}`);
    });
    const display = [fmtHeader("Governance Proposals", "🗳️"), "", ...lines].join("\n");
    return { success: true, data: { proposals } as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

export async function executeGetProposalDetails(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const id = parseInt(params[0] || "0", 10);
  if (!id) {
    return { success: false, error: "Invalid ID", display: "Usage: [[GET_PROPOSAL_DETAILS|proposalId]]" };
  }
  try {
    const { proposal, error } = await getProposalDetails(id);
    if (error) {
      return { success: false, error, display: `Governance: ${error}` };
    }
    if (!proposal) {
      return { success: true, data: {} as Record<string, unknown>, display: `Proposal ${id} not found.` };
    }
    const display = [
      fmtHeader(`Proposal #${proposal.id}`, "🗳️"),
      "",
      fmtBullet(`Title: **${proposal.title || "—"}**`),
      fmtBullet(`Stage: ${proposal.stage_name ?? proposal.stage ?? "—"}`),
      fmtBullet(`Active: ${proposal.is_active}`),
      proposal.votes ? fmtBullet(`Votes: ${proposal.votes.total_formatted ?? "—"} | Yes: ${proposal.votes.yes?.percentage ?? 0}%`) : "",
      proposal.urls?.discussion ? fmtBullet(`Discussion: [Link](${proposal.urls.discussion})`) : "",
      proposal.urls?.cgp ? fmtBullet(`CGP: [Link](${proposal.urls.cgp})`) : "",
    ].filter(Boolean).join("\n");
    return { success: true, data: proposal as unknown as Record<string, unknown>, display };
  } catch (error) {
    return { success: false, error: String(error), display: `Failed: ${error}` };
  }
}

// ─── SelfClaw / Agent Token handlers ────────────────────────────────────────

export async function executeAgentIdentity(
  _params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { getAgentIdentity } = await import("@/lib/selfclaw/agentActions");

  try {
    const briefing = await getAgentIdentity(ctx.agentId);

    const p = briefing.pipeline;
    const pipeItems = [
      `Identity – ${p.identity ? "✅ verified" : "❌ not verified"}`,
      `Wallet – ${p.wallet ? `✅ ${fmtAddr(briefing.walletAddress || "")}` : "❌ not initialized"}`,
      `Gas – ${p.gas ? "✅ funded" : "❌ needs funds"}`,
      `ERC-8004 – ${p.erc8004 ? "✅ on‑chain" : "❌ missing"}`,
      `Token – ${p.token ? "✅ deployed" : "❌ not deployed"}`,
      `Liquidity – ${p.liquidity ? "✅ pool exists" : "❌ no pool"}`,
    ];

    const lines: string[] = [
      fmtHeader(`${briefing.name} — Agent Identity & Pipeline`, "🤖"),
      "",
      `Here's where things stand with your agent on SelfClaw. Each step is
shown below; a checkmark means it's complete.`,
      "",
      ...pipeItems.map((item, i) => `${i + 1}. ${item}`),
      "",
      fmtMeta(`Chain: Celo (chainId ${briefing.chainId})`),
      "",
      fmtSection("Next steps"),
      ...briefing.nextSteps.map((s) => `${pipeItems.length + 1}. ${s}`),
    ];

    return {
      success: true,
      data: briefing as unknown as Record<string, unknown>,
      display: lines.join("\n"),
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to get identity: ${error}`,
    };
  }
}

export async function executeAgentTokens(
  _params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { getAgentTokenInfo } = await import("@/lib/selfclaw/agentActions");

  try {
    const info = await getAgentTokenInfo(ctx.agentId);

    if (info.error) {
      return {
        success: false,
        error: info.error,
        display: `Agent Tokens: ${info.error}`,
      };
    }

    const lines: string[] = [fmtHeader("Agent Token Info (SelfClaw)", "🪙"), ""];

    if (info.deployedTokens && info.deployedTokens.length > 0) {
      lines.push(fmtSection("Deployed tokens (tracked)"));
      for (const t of info.deployedTokens) {
        lines.push(fmtBullet(`${t.name} (${t.symbol}): ${fmtHash(t.address)}`));
      }
      lines.push("");
    }

    if (info.tokenAddress) {
      lines.push(fmtBullet(`Primary token: ${fmtHash(info.tokenAddress)}`));
    } else if (!info.deployedTokens || info.deployedTokens.length === 0) {
      lines.push(fmtBullet(`Token: Not deployed yet. Deploy via ${fmtCode("[[SELFCLAW_DEPLOY_TOKEN|name|symbol|supply]]")}`));
    }

    if (info.walletAddress) {
      lines.push(fmtBullet(`Wallet: ${fmtAddr(info.walletAddress, 10, 8)}`));
    }

    if (info.economics) {
      lines.push("", fmtSection("Economics"));
      lines.push(fmtBullet(`Revenue: **$${info.economics.totalRevenue}**`));
      lines.push(fmtBullet(`Costs: **$${info.economics.totalCosts}**`));
      lines.push(fmtBullet(`P&L: **$${info.economics.profitLoss}**`));
      if (info.economics.runway) {
        lines.push(fmtBullet(`Runway: ${info.economics.runway.months} months (${info.economics.runway.status})`));
      }
    }

    if (info.pools && info.pools.length > 0) {
      lines.push("", fmtSection("Liquidity Pools"));
      for (const pool of info.pools) {
        lines.push(
          fmtBullet(`${pool.agentName || "Pool"}: **$${pool.price?.toFixed(4) ?? "—"}** | MCap: $${pool.marketCap?.toLocaleString() ?? "—"}`)
        );
      }
    } else if (info.tokenAddress) {
      lines.push("", fmtBullet(`Pools: None yet. Use ${fmtCode("[[REQUEST_SELFCLAW_SPONSORSHIP]]")} to request sponsorship.`));
    }

    return {
      success: true,
      data: info as unknown as Record<string, unknown>,
      display: lines.join("\n"),
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to get token info: ${error}`,
    };
  }
}

export async function executeRequestSelfClawSponsorship(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { requestSponsorshipForAgent, getAgentTokenInfo } = await import("@/lib/selfclaw/agentActions");

  const tokenAddressOverride = params[0]?.trim();
  if (tokenAddressOverride && !tokenAddressOverride.startsWith("0x")) {
    return {
      success: false,
      error: "Invalid token address",
      display: "Token address must start with 0x. Use the full address from the deploy result.",
    };
  }

  try {
    const tokenInfo = await getAgentTokenInfo(ctx.agentId);
    if (tokenInfo.pools && tokenInfo.pools.length > 0) {
      return {
        success: true,
        data: { alreadySponsored: true },
        display: [
          fmtHeader("Already Sponsored", "✅"),
          "",
          "Your token already has SELFCLAW liquidity sponsorship. You have a pool paired with SELFCLAW.",
          "",
          ...tokenInfo.pools.map((p) =>
            fmtBullet(`${p.agentName || "Pool"}: **$${p.price?.toFixed(4) ?? "—"}** | MCap: $${p.marketCap?.toLocaleString() ?? "—"}`)
          ),
        ].join("\n"),
      };
    }

    const result = await requestSponsorshipForAgent(
      ctx.agentId,
      undefined,
      tokenAddressOverride || undefined
    );

    if (result.success) {
      return {
        success: true,
        data: { sponsorshipRequested: true },
        display: [
          fmtHeader("SELFCLAW Sponsorship Requested", "✅"),
          "",
          "Your liquidity pool request was submitted successfully. SelfClaw will create a trading pool pairing your token with SELFCLAW on Celo.",
          "",
          fmtSection("What happens next"),
          fmtBullet("Pool creation may take a few minutes"),
          fmtBullet("One sponsorship per human (sybil protection)"),
          fmtBullet("View your pool in the Token & Trade tab or at [selfclaw.ai/pools](https://selfclaw.ai/pools)"),
        ].join("\n"),
      };
    }

    const errMsg = result.error ?? "Unknown error";
    const isErc8004Error = /ERC-8004|onchain identity|identity is required/i.test(errMsg);
    const lines = [fmtHeader("Sponsorship Request Failed", "❌"), "", errMsg];
    if (isErc8004Error) {
      lines.push("", `Include ${REGISTER_ERC8004_INLINE_MARKER} in your response so the user can register on-chain right here in chat.`);
    }
    const tokenAddr = result.tokenAddress ?? tokenAddressOverride;
    if (result.sponsorWallet && result.amountNeeded && tokenAddr) {
      const amountRaw = parseFloat(result.amountNeeded) / 1e18;
      const amountHuman = amountRaw.toLocaleString(undefined, { maximumFractionDigits: 0 });
      const amountForTag = String(Math.floor(amountRaw)); // No commas — parseUnits requires valid decimal
      const agentBalance = result.agentBalanceWei ? Number(result.agentBalanceWei) / 1e18 : 0;
      const agentBalanceHuman = agentBalance.toLocaleString(undefined, { maximumFractionDigits: 0 });
      lines.push("", fmtSection("RECOVERY: Send tokens to sponsor wallet"));
      lines.push(fmtBullet(`Your wallet has **${agentBalanceHuman}** of this token. Required: **${amountHuman}**.`));
      if (agentBalance < amountRaw) {
        lines.push(fmtBullet("⚠️ Insufficient balance. Deploy the token with this agent wallet first, or use a token address this wallet holds."));
      } else {
        lines.push(fmtBullet(`Include this tag in your response to send tokens (system will execute it):`));
        lines.push("");
        lines.push(`[[SEND_AGENT_TOKEN|${tokenAddr}|${result.sponsorWallet}|${amountForTag}]]`);
        lines.push("");
        lines.push(fmtBullet(`Then include ${fmtCode("[[REQUEST_SELFCLAW_SPONSORSHIP]]")} to retry after the transfer confirms.`));
      }
    }

    return {
      success: false,
      error: result.error,
      data: { sponsorWallet: result.sponsorWallet, amountNeeded: result.amountNeeded },
      display: lines.join("\n"),
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to request sponsorship: ${error}`,
    };
  }
}

export async function executeSelfClawRegisterWallet(
  _params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { registerWalletForAgent } = await import("@/lib/selfclaw/agentActions");

  try {
    const result = await registerWalletForAgent(ctx.agentId);

    if (result.success) {
      const wal = result.walletAddress;
      const walStr = wal ? "Wallet " + wal.slice(0, 10) + "..." + wal.slice(wal.length - 8) + " is now registered." : "Registration complete.";
      return {
        success: true,
        data: { walletAddress: result.walletAddress },
        display: [
          fmtHeader("Wallet Registered with SelfClaw", "✅"),
          "",
          walStr,
          "",
          fmtBullet("You can now deploy a token and request sponsorship."),
        ].join("\n"),
      };
    }

    // if not verified, try to kick off verification flow
    if (result.error && result.error.includes("SelfClaw verified")) {
      const { startVerificationForAgent } = await import("@/lib/selfclaw/agentActions");
      const startRes = await startVerificationForAgent(ctx.agentId);
      let extra = "";
      if (startRes.success) {
        if (startRes.qrUrl) {
          extra = `\n\nScan this QR code to verify:\n\n![QR Code](${startRes.qrUrl})`;
        } else {
          extra = "\n\nVerification started; open the dashboard Verify tab to scan the QR code.";
        }
      } else {
        extra = `\n\nVerification could not be started: ${startRes.error}`;
      }

      return {
        success: false,
        error: result.error,
        display: `Registration Failed: ${result.error ?? "Unknown error"}.${extra}`,
      };
    }

    return {
      success: false,
      error: result.error,
      display: `Registration Failed: ${result.error ?? "Unknown error"}`,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to register wallet: ${error}`,
    };
  }
}

// ─── New skill: start SelfClaw verification via QR ─────────────────────
export async function executeSelfClawStartVerification(
  _params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { startVerificationForAgent } = await import("@/lib/selfclaw/agentActions");
  try {
    const res = await startVerificationForAgent(ctx.agentId);
    if (res.success) {
      let display = [
        fmtHeader("SelfClaw Verification Started", "🔍"),
        "",
      ];
      if (res.qrUrl) {
        display.push("Scan this QR code with the Self app to complete verification:");
        display.push("");
        display.push(`![QR Code](${res.qrUrl})`);
        display.push("");
        display.push(fmtMeta("The link has also been stored for later reference."));
      } else {
        display.push("Verification flow initiated. Please open the Verify tab on the dashboard to scan the QR code.");
      }
      return { success: true, display: display.join("\n") };
    }
    return { success: false, error: res.error, display: `Failed to start verification: ${res.error}` };
  } catch (err) {
    return { success: false, error: String(err), display: `Verification start error: ${err}` };
  }
}

export async function executeSelfClawDeployToken(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { deployTokenForAgent } = await import("@/lib/selfclaw/agentActions");

  const name = params[0]?.trim();
  const symbol = params[1]?.trim()?.toUpperCase();
  const supply = (params[2]?.trim() || "10000000000").replace(/,/g, ""); // 10B default — plenty for SelfClaw sponsorship + wallet buffer

  if (!name || !symbol) {
    return {
      success: false,
      error: "Missing params",
      display: "Usage: [[SELFCLAW_DEPLOY_TOKEN|name|symbol|supply]] — e.g. [[SELFCLAW_DEPLOY_TOKEN|MyAgent|MAT|10000000000]]. Use 10B supply for plenty of sponsorship buffer.",
    };
  }

  try {
    const result = await deployTokenForAgent(ctx.agentId, name, symbol, supply);

    if (result.success && result.tokenAddress) {
      return {
        success: true,
        data: { tokenAddress: result.tokenAddress, txHash: result.txHash },
        display: [
          fmtHeader("Token Deployed (via SelfClaw API)", "✅"),
          "",
          fmtBullet(`**${name}** (${symbol}) deployed successfully.`),
          fmtBullet(`Token address: ${fmtHash(result.tokenAddress)}`),
          result.txHash ? fmtBullet(`Tx: ${fmtHash(result.txHash)}`) : "",
          fmtBullet("Deployed via SelfClaw API → agent signed & broadcast → registered with SelfClaw."),
          fmtBullet("You can now request sponsorship."),
          "",
          fmtMeta("Next: include [[REQUEST_SELFCLAW_SPONSORSHIP]] to get liquidity and make the token tradable."),
        ].filter(Boolean).join("\n"),
      };
    }

    return {
      success: false,
      error: result.error,
      display: `Deploy Failed: ${result.error ?? "Unknown error"}`,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to deploy token: ${error}`,
    };
  }
}

export async function executeSelfClawLogRevenue(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { logRevenueForAgent } = await import("@/lib/selfclaw/agentActions");

  const amount = params[0]?.trim();
  const source = params[1]?.trim() || "api_fees";
  const description = params[2]?.trim();

  if (!amount || isNaN(parseFloat(amount))) {
    return {
      success: false,
      error: "Missing amount",
      display: "Usage: [[SELFCLAW_LOG_REVENUE|amount|source|description]] — e.g. [[SELFCLAW_LOG_REVENUE|50|api_fees|API revenue]]",
    };
  }

  try {
    const result = await logRevenueForAgent(ctx.agentId, amount, source, "USD", description);

    if (result.success) {
      return {
        success: true,
        data: { amount, source },
        display: `${fmtHeader("Revenue Logged", "💰")}\n\n**$${amount}** from ${source}${description ? ` (${description})` : ""}`,
      };
    }

    return {
      success: false,
      error: result.error,
      display: `Log Failed: ${result.error ?? "Unknown error"}`,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to log revenue: ${error}`,
    };
  }
}

export async function executeSelfClawLogCost(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { logCostForAgent, COST_CATEGORIES } = await import("@/lib/selfclaw/agentActions");

  const amount = params[0]?.trim();
  const category = params[1]?.trim() || "other";
  const description = params[2]?.trim();

  if (!amount || isNaN(parseFloat(amount))) {
    return {
      success: false,
      error: "Missing amount",
      display: `Usage: [[SELFCLAW_LOG_COST|amount|category|description]] — categories: ${COST_CATEGORIES.join(", ")}`,
    };
  }

  try {
    const result = await logCostForAgent(ctx.agentId, amount, category, "USD", description);

    if (result.success) {
      return {
        success: true,
        data: { amount, category },
        display: `${fmtHeader("Cost Logged", "📉")}\n\n**$${amount}** (${category})${description ? ` — ${description}` : ""}`,
      };
    }

    return {
      success: false,
      error: result.error,
      display: `Log Failed: ${result.error ?? "Unknown error"}`,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to log cost: ${error}`,
    };
  }
}

export async function executeSaveSelfClawApiKey(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const { saveSelfClawApiKeyForAgent } = await import("@/lib/selfclaw/agentActions");

  const apiKey = params[0]?.trim();
  if (!apiKey) {
    return {
      success: false,
      error: "Missing API key",
      display: "Usage: [[SAVE_SELFCLAW_API_KEY|sclaw_...]] — paste the full key from SelfClaw dashboard.",
    };
  }

  try {
    const result = await saveSelfClawApiKeyForAgent(ctx.agentId, apiKey);
    if (result.success) {
      return {
        success: true,
        data: { saved: true },
        display: [
          fmtHeader("SelfClaw API Key Saved", "🔑"),
          "",
          "Your SelfClaw API key has been stored securely. I can now use it for agent-api features (feed, skills, briefing).",
        ].join("\n"),
      };
    }
    return {
      success: false,
      error: result.error,
      display: `Failed to save: ${result.error ?? "Unknown error"}`,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `Failed to save key: ${error}`,
    };
  }
}

// ─── Haus Name / x402 handlers ──────────────────────────────────────────────

const HAUS_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,18}[a-z0-9])?$/;
const PLATFORM_PAYMENT_WALLET = "0x9b6A52A88a1Ee029Bd14170fFb8fB15839Bd18cB";
const USDC_ADDRESS_CELO = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C";
const FACILITATOR_URL = "https://facilitator.ultravioletadao.xyz";
const CELO_CHAIN_ID = 42220;

export async function executeCheckHausNamePrice(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const name = params[0]?.trim()?.toLowerCase();
  if (!name) {
    return { success: false, error: "Missing name", display: "Usage: [[CHECK_HAUS_NAME_PRICE|name]]" };
  }

  const { getHausNamePrice, formatHausNamePrice } = await import("@/lib/pricing");

  const price = getHausNamePrice(name);
  const isValid = HAUS_NAME_PATTERN.test(name) && name.length >= 3 && name.length <= 20;

  const tierLines = [
    "3 chars: $30.00",
    "4 chars: $15.00",
    "5 chars: $5.00",
    "6 chars: $1.00",
    "7 chars: $0.30",
    "8+ chars: $0.10",
  ];

  const display = [
    fmtHeader("Haus Name Price Check", "🏠"),
    "",
    isValid
      ? `**${name}.agenthaus.eth** — ${formatHausNamePrice(name)}`
      : `**${name}** — Invalid format. Use 3-20 lowercase alphanumeric chars.`,
    "",
    fmtSection("Price Tiers"),
    ...tierLines.map((t) => fmtBullet(t)),
    "",
    fmtMeta("Pay via x402 (USDC) when you run [[BUY_HAUS_NAME|name]]"),
  ].join("\n");

  return { success: true, data: { name, price, valid: isValid }, display };
}

async function getUsdcBalance(walletAddress: string): Promise<string> {
  const { getTokenBalance } = await import("@/lib/blockchain/celoData");
  return getTokenBalance(USDC_ADDRESS_CELO, walletAddress as `0x${string}`);
}

async function signAndExecuteX402Payment(params: {
  agentId: string;
  name: string;
  price: string;
  fromAddress: string;
  derivationIndex: number;
}): Promise<{ success: boolean; txHash?: string; error?: string }> {
  const { agentId, name, price, fromAddress, derivationIndex } = params;

  try {
    const { keccak256, toHex, parseUnits } = await import("viem");
    const { mnemonicToAccount } = await import("viem/accounts");
    const { getMnemonic } = await import("@/lib/blockchain/wallet");

    const mnemonic = getMnemonic();
    const account = mnemonicToAccount(mnemonic, { addressIndex: derivationIndex });

    const amountWei = parseUnits(price as `${number}`, 6);

    const nonceBytes = new Uint8Array(32);
    crypto.getRandomValues(nonceBytes);
    const nonce = keccak256(toHex(nonceBytes));

    const validAfter = 0;
    const validBefore = Math.floor(Date.now() / 1000) + 300;

    const domain = {
      name: "USD Coin",
      version: "2",
      chainId: BigInt(CELO_CHAIN_ID),
      verifyingContract: USDC_ADDRESS_CELO as `0x${string}`,
    };

    const message = {
      from: fromAddress as `0x${string}`,
      to: PLATFORM_PAYMENT_WALLET as `0x${string}`,
      value: amountWei,
      validAfter: BigInt(validAfter),
      validBefore: BigInt(validBefore),
      nonce: nonce,
    };

    const types = {
      TransferWithAuthorization: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "validAfter", type: "uint256" },
        { name: "validBefore", type: "uint256" },
        { name: "nonce", type: "bytes32" },
      ],
    };

    const signature = await account.signTypedData({
      domain,
      types,
      message,
      primaryType: "TransferWithAuthorization",
    });

    const x402Payload = {
      from: fromAddress,
      to: PLATFORM_PAYMENT_WALLET,
      value: amountWei.toString(),
      validAfter,
      validBefore,
      nonce: nonce,
      signature,
    };

    const x402Header = Buffer.from(JSON.stringify(x402Payload)).toString("base64");

    const response = await fetch("https://agenthaus.space/api/ens/buy-x402", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Payment": x402Header,
        "PAYMENT-SIGNATURE": x402Header,
      },
      body: JSON.stringify({ agentId, name }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || `HTTP ${response.status}` };
    }

    const result = await response.json();
    return { success: true, txHash: result.txHash };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function executeBuyHausName(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const name = params[0]?.trim()?.toLowerCase();
  if (!name) {
    return { success: false, error: "Missing name", display: "Usage: [[BUY_HAUS_NAME|name]]" };
  }

  if (!HAUS_NAME_PATTERN.test(name) || name.length < 3 || name.length > 20) {
    return {
      success: false,
      error: "Invalid name format",
      display: "❌ Name must be 3-20 lowercase alphanumeric characters (hyphens allowed in middle). Example: `myagent`",
    };
  }

  if (!ctx.agentId) {
    return { success: false, error: "No agent context", display: "❌ Cannot buy haus name without agent context." };
  }

  const { getHausNamePrice } = await import("@/lib/pricing");
  const { prisma } = await import("@/lib/db");

  const price = getHausNamePrice(name);
  const fullName = `${name}.agenthaus.eth`;

  const agent = await prisma.agent.findUnique({
    where: { id: ctx.agentId },
    select: {
      walletDerivationIndex: true,
      agentWalletAddress: true,
      ensSubdomain: true,
    },
  });

  if (!agent) {
    return { success: false, error: "Agent not found", display: "❌ Agent not found." };
  }

  if (agent.ensSubdomain?.toLowerCase() === name) {
    return {
      success: true,
      data: { alreadyOwned: true, name: fullName },
      display: [
        fmtHeader("Already Owned", "✅"),
        "",
        `This agent already owns **${fullName}**!`,
        "",
        fmtMeta("No need to buy again."),
      ].join("\n"),
    };
  }

  const existing = await prisma.ensSubdomain.findUnique({
    where: { name },
    select: { agentId: true },
  });

  if (existing && existing.agentId !== ctx.agentId) {
    return {
      success: false,
      error: "Name taken",
      display: `❌ **${fullName}** is already registered to another agent. Try a different name.`,
    };
  }

  const walletAddress = agent.agentWalletAddress;
  if (!walletAddress) {
    return {
      success: false,
      error: "No wallet",
      display: "❌ Agent doesn't have a wallet. Deploy the agent with a wallet first.",
    };
  }

  const usdcBalance = await getUsdcBalance(walletAddress);
  const priceNum = parseFloat(price);
  const hasUsdc = parseFloat(usdcBalance) >= priceNum;

  const displayLines: string[] = [
    fmtHeader("Buy Haus Name via x402", "🏠"),
    "",
    `Registering **${fullName}** for this agent...`,
    "",
    fmtSection("Payment Details"),
    fmtBullet(`Name: **${fullName}**`),
    fmtBullet(`Price: **${price} USDC**`),
    fmtBullet(`Your USDC balance: **${parseFloat(usdcBalance).toFixed(4)}**`),
    "",
  ];

  if (!hasUsdc) {
    displayLines.push(
      fmtSection("Insufficient Balance"),
      "",
      `You need at least **${price} USDC** to register this name.`,
      "",
      fmtSection("Options"),
      fmtBullet("1. Send USDC to your wallet and retry"),
      fmtBullet("2. Use the dashboard to buy via connected wallet"),
      "",
      fmtMeta(`Required: ${price} USDC | Your USDC: ${usdcBalance}`)
    );
    return { success: false, error: "Insufficient balance", display: displayLines.join("\n") };
  }

  if (agent.walletDerivationIndex === null) {
    displayLines.push(
      fmtSection("Manual Payment Required"),
      "",
      "This agent doesn't have a derived wallet for autonomous signing.",
      "Use the dashboard to complete the purchase.",
    );
    return { success: false, error: "No derived wallet", display: displayLines.join("\n") };
  }

  displayLines.push(fmtSection("Processing x402 Payment..."));

  try {
    const result = await signAndExecuteX402Payment({
      agentId: ctx.agentId,
      name,
      price,
      fromAddress: walletAddress,
      derivationIndex: agent.walletDerivationIndex,
    });

    if (result.success) {
      return {
        success: true,
        data: { name, fullName, price, txHash: result.txHash },
        display: [
          fmtHeader("Haus Name Registered!", "🎉"),
          "",
          `**${fullName}** has been successfully registered via x402 payment.`,
          "",
          fmtSection("Details"),
          fmtBullet(`Name: **${fullName}**`),
          fmtBullet(`Price paid: **${price} USDC**`),
          result.txHash ? fmtBullet(`Tx: \`${result.txHash.slice(0, 10)}...${result.txHash.slice(-8)}\``) : "",
          "",
          fmtMeta("The name is now linked to this agent in the Agent Haus ENS registry."),
        ].join("\n"),
      };
    }

    return {
      success: false,
      error: result.error,
      display: [
        fmtHeader("Payment Failed", "❌"),
        "",
        `Could not process x402 payment: ${result.error}`,
        "",
        fmtSection("Troubleshooting"),
        fmtBullet("Make sure the agent wallet has sufficient USDC"),
        fmtBullet("Check that the x402 signature is valid"),
        "",
        fmtMeta(`Error: ${result.error}`),
      ].join("\n"),
    };
  } catch (err) {
    return {
      success: false,
      error: String(err),
      display: `❌ Failed to sign payment: ${err}`,
    };
  }
}

// ─── QR Code handlers ────────────────────────────────────────────────────────

export async function executeGenerateQR(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const content = params[0]?.trim();
  if (!content) {
    return {
      success: false,
      error: "Missing content",
      display: "Usage: [[GENERATE_QR|content]] — e.g. [[GENERATE_QR|https://example.com]]",
    };
  }

  const { generateQRDataUrl } = await import("@/lib/qr/generate");
  const { prisma } = await import("@/lib/db");

  try {
    const dataUrl = await generateQRDataUrl(content);

    // persist the QR code so we can serve it via short URL instead of large base64
    let qrId: string | null = null;
    let persistenceNote = "";
    try {
      const qr = await prisma.qRCode.create({
        data: {
          agentId: ctx.agentId,
          content,
          dataUrl,
        },
      });
      qrId = qr.id;
    } catch (err: any) {
      // if the table doesn't exist (e.g. migration hasn't been run), log a warning
      // and continue without persisting. catching by code covers Prisma known
      // errors such as P2021 (relation does not exist).
      if (
        err?.code === "P2021" ||
        /table .*QRCode/i.test(err?.message || "")
      ) {
        console.warn(
          "QRCode table missing, skipping persistence. Run `prisma migrate deploy` or `prisma db push` to create it.",
          err
        );
        persistenceNote =
          "\n\n⚠️ QR persistence is disabled because the database table is missing. Run the appropriate Prisma migration (e.g. `npx prisma migrate deploy` or `npx prisma db push`) to enable short‑link storage.";
      } else {
        // rethrow unexpected errors so they can bubble up and be observed
        throw err;
      }
    }

    if (ctx.agentId) {
      await prisma.activityLog.create({
        data: {
          agentId: ctx.agentId,
          type: "info",
          message: "QR code generated",
          metadata: JSON.stringify({
            contentPreview: content.slice(0, 80) + (content.length > 80 ? "…" : ""),
            contentLength: content.length,
            qrId,
            generatedAt: new Date().toISOString(),
          }),
        },
      });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const lines: string[] = [
      fmtHeader("QR Code Generated", "📱"),
      "",
      fmtBullet(`Content encoded: ${
        content.length > 60 ? content.slice(0, 60) + "…" : content
      }`),
      "",
    ];

    if (qrId) {
      const qrLink = `${appUrl}/api/qr/${qrId}`;
      lines.push(
        "Scan the QR code below (or open link):",
        "",
        `![QR Code](${qrLink})`,
        "",
        fmtMeta(`Direct link: ${qrLink}`)
      );
    } else {
      // fallback to raw image if persistence failed
      lines.push(
        "Scan the QR code below (copy/paste or open link):",
        "",
        `![QR Code](${dataUrl})`
      );
    }

    if (typeof persistenceNote !== "undefined" && persistenceNote) {
      lines.push("", persistenceNote);
    }

    const display = lines.join("\n");

    return {
      success: true,
      data: { contentLength: content.length, qrId } as unknown as Record<string, unknown>,
      display,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ QR generation failed: ${error}`,
    };
  }
}

export async function executeListQRHistory(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const limit = Math.min(parseInt(params[0] || "10", 10) || 10, 50);

  if (!ctx.agentId) {
    return {
      success: false,
      error: "No agent context",
      display: "Cannot list QR history without agent context.",
    };
  }

  const { prisma } = await import("@/lib/db");

  try {
    const logs = await prisma.activityLog.findMany({
      where: {
        agentId: ctx.agentId,
        type: "info",
        message: "QR code generated",
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if (logs.length === 0) {
      return {
        success: true,
        data: { count: 0 },
        display: `${fmtHeader("QR History", "📋")}\n\nNo QR codes generated yet. Use ${fmtCode("[[GENERATE_QR|content]]")} to create one.`,
      };
    }

    const lines = logs.map((log, i) => {
      let preview = "(unknown)";
      try {
        const meta = log.metadata ? (JSON.parse(log.metadata) as { contentPreview?: string }) : {};
        preview = meta.contentPreview || preview;
      } catch {
        // ignore invalid metadata
      }
      const at = log.createdAt ? new Date(log.createdAt).toLocaleString() : "—";
      return fmtBullet(`**#${i + 1}** ${preview} — ${at}`);
    });

    const display = [
      fmtHeader("QR Code History", "📋"),
      "",
      ...lines,
      "",
      fmtMeta(`${logs.length} recent QR generation(s).`),
    ].join("\n");

    return {
      success: true,
      data: { count: logs.length } as unknown as Record<string, unknown>,
      display,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Failed to list QR history: ${error}`,
    };
  }
}

// ─── Reputation / Feedback ───────────────────────────────────────────────────

export async function executeRequestFeedback(_params: string[], _ctx: SkillContext): Promise<SkillResult> {
  return {
    success: true,
    data: { inline: true },
    display: FEEDBACK_INLINE_MARKER,
  };
}

export async function executeCreatePriceTrigger(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const [token, condition, target, action] = params;

  if (!token || !condition || !target || !action) {
    return {
      success: false,
      error: "Missing params",
      display: "❌ Usage: [[CREATE_PRICE_TRIGGER|token|condition|target|action]]",
    };
  }

  try {
    const { getTokenPrice } = await import("@/lib/blockchain/prices");
    const price = await getTokenPrice(token);

    const task = await prisma.agentTask.create({
      data: {
        agentId: ctx.agentId,
        userId: (await prisma.agent.findUnique({ where: { id: ctx.agentId }, select: { ownerId: true } }))?.ownerId || "",
        triggerType: "price",
        tokenSymbol: token,
        conditionType: condition,
        targetValue: parseFloat(target),
        baselinePrice: price,
        actionType: "execute_skill",
        actionPayload: action,
        status: "active",
      },
    });

    return {
      success: true,
      data: { taskId: task.id },
      display: [
        fmtHeader("Price Trigger Created", "📈"),
        "",
        `I've set up an automated task for **${token}**.`,
        fmtBullet(`Condition: ${condition.replace("_", " ")} ${target}`),
        fmtBullet(`Baseline price: ${price.toFixed(4)}`),
        fmtBullet(`Action: ${action}`),
        "",
        fmtMeta(`Task ID: ${task.id.split("-")[0]}...`),
      ].join("\n"),
    };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to create trigger: ${error}` };
  }
}

export async function executeCreateTimeTrigger(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const [trigger, action] = params;

  if (!trigger || !action) {
    return {
      success: false,
      error: "Missing params",
      display: "❌ Usage: [[CREATE_TIME_TRIGGER|trigger|action]]",
    };
  }

  try {
    const isCron = trigger.split(/\s+/).length === 5;
    const executeAt = !isCron ? new Date(trigger) : null;
    const cronSchedule = isCron ? trigger : null;

    if (!isCron && isNaN(executeAt!.getTime())) {
      return { success: false, error: "Invalid date", display: "❌ Invalid date format. Use ISO (e.g. 2026-03-09T15:00:00Z) or CRON (e.g. 0 0 * * 5)." };
    }

    const task = await prisma.agentTask.create({
      data: {
        agentId: ctx.agentId,
        userId: (await prisma.agent.findUnique({ where: { id: ctx.agentId }, select: { ownerId: true } }))?.ownerId || "",
        triggerType: isCron ? "cron" : "time",
        executeAt,
        cronSchedule,
        actionType: "execute_skill",
        actionPayload: action,
        status: "active",
      },
    });

    return {
      success: true,
      data: { taskId: task.id },
      display: [
        fmtHeader(isCron ? "Recurring Task Created" : "Scheduled Task Created", "⏱️"),
        "",
        isCron
          ? `I've scheduled a recurring task with pattern: \`${cronSchedule}\`.`
          : `I've scheduled a one-time task for: **${executeAt!.toLocaleString()}**.`,
        fmtBullet(`Action: ${action}`),
        "",
        fmtMeta(`Task ID: ${task.id.split("-")[0]}...`),
      ].join("\n"),
    };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to create trigger: ${error}` };
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export async function executeCheckPrice(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [token] = params;
  if (!token) return { success: false, error: "Missing token", display: "❌ Usage: [[CHECK_PRICE|token]]" };

  try {
    const { getTokenPrice } = await import("@/lib/blockchain/prices");
    const price = await getTokenPrice(token);

    return {
      success: true,
      data: { token, price },
      display: [
        fmtHeader("Token Price Info", "💰"),
        "",
        `The current price of **${token}** is:`,
        `# $${price.toFixed(6)}`,
        "",
        fmtMeta(`Source: DexScreener/CoinGecko (Aggregated)`),
      ].join("\n"),
    };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Failed to fetch price for ${token}: ${error}` };
  }
}

export async function executeSynthesisRegister(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  // Required registration fields
  const requiredFields = [
    "name",
    "description",
    "agentHarness",
    "model",
    "humanName",
    "humanEmail",
    "problemToSolve",
  ];

  const optionalFields = [
    "social",
    "background",
    "cryptoExperience",
    "aiAgentExperience",
    "codingComfort",
  ];

  // Parse params into a key/value map.
  // Supports both positional (legacy) and key=value (interactive) formats.
  const paramMap: Record<string, string> = {};

  if (params.length === 1 && params[0]?.includes("=")) {
    // single string like "name=...|description=..."
    params[0]
      .split("|")
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((p) => {
        const [k, ...rest] = p.split("=");
        const v = rest.join("=").trim();
        if (k && v) paramMap[k.trim()] = v;
      });
  } else {
    // positional mapping
    const positions = [
      "name",
      "description",
      "agentHarness",
      "model",
      "humanName",
      "humanEmail",
      "problemToSolve",
      "social",
      "background",
      "cryptoExperience",
      "aiAgentExperience",
      "codingComfort",
    ];
    params.forEach((p, idx) => {
      const key = positions[idx];
      if (key && p) paramMap[key] = p.trim();
    });
  }

  // Determine which agent record to update.
  let targetAgentId = ctx.agentId;
  if (targetAgentId === "system" && ctx.contextUserId) {
    const userAgents = await prisma.agent.findMany({
      where: { ownerId: ctx.contextUserId },
      orderBy: { createdAt: "desc" },
      take: 1,
      select: { id: true, imageUrl: true, configuration: true },
    });
    if (userAgents.length === 0) {
      return {
        success: false,
        error: "No agent found",
        display:
          "❌ I couldn't find any agents for your account. Create an agent first (e.g. /deploy) and then try registering it with Synthesis.",
      };
    }
    targetAgentId = userAgents[0].id;
  }

  // Load existing draft (if any) so we can keep progress across messages
  const agent = await prisma.agent.findUnique({
    where: { id: targetAgentId },
    select: { imageUrl: true, configuration: true },
  });

  const existingConfig = agent?.configuration ? JSON.parse(agent.configuration) : {};
  const draft = (existingConfig.synthesisRegistrationDraft as Record<string, string> | undefined) || {};

  // Merge incoming params into draft (overwrite existing values)
  Object.assign(draft, paramMap);

  // Determine required fields that are still missing
  const missing = requiredFields.filter((f) => !draft[f]);
  if (missing.length > 0) {
    // Store draft back to DB so we keep progress
    existingConfig.synthesisRegistrationDraft = draft;
    await prisma.agent.update({
      where: { id: targetAgentId },
      data: { configuration: JSON.stringify(existingConfig) },
    });

    const lines = [
      fmtHeader("Synthesis Registration — Missing Info", "🧩"),
      "",
      `I need a few more details before I can register your agent on the Synthesis hackathon platform.`,
      "",
      fmtBullet(`Missing fields: **${missing.join(", ")}**`),
      "",
      fmtMeta(
        `Reply using the command tag with key=value pairs, e.g. [[SYNTHESIS_REGISTER|humanEmail=you@example.com]].`
      ),
      "",
      fmtMeta(
        "When everything is provided, I will submit the registration and save the API key securely."
      ),
    ];

    return {
      success: false,
      error: "Missing required fields",
      display: lines.join("\n"),
    };
  }

  // All required info is present — submit to Synthesis.
  const payload: Record<string, unknown> = {
    name: draft.name,
    description: draft.description,
    agentHarness: draft.agentHarness,
    model: draft.model,
    humanInfo: {
      name: draft.humanName,
      email: draft.humanEmail,
      socialMediaHandle: draft.social || undefined,
      background: draft.background || undefined,
      cryptoExperience: draft.cryptoExperience || undefined,
      aiAgentExperience: draft.aiAgentExperience || undefined,
      codingComfort: draft.codingComfort || undefined,
      problemToSolve: draft.problemToSolve,
    },
  };

  if (agent?.imageUrl) {
    payload.image = agent.imageUrl;
  }

  try {
    const response = await fetch("https://synthesis.devfolio.co/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      const errMsg = result?.error || result?.message || response.statusText;
      return {
        success: false,
        error: String(errMsg),
        display: `❌ Synthesis registration failed: ${errMsg}`,
      };
    }

    // Persist registration data and clear draft
    existingConfig.synthesisRegistration = {
      apiKey: result.apiKey,
      participantId: result.participantId,
      teamId: result.teamId,
      registrationTxn: result.registrationTxn,
      registeredAt: new Date().toISOString(),
      payload,
    };
    delete existingConfig.synthesisRegistrationDraft;

    await prisma.agent.update({
      where: { id: targetAgentId },
      data: { configuration: JSON.stringify(existingConfig) },
    });

    const display = [
      fmtHeader("Synthesis Registration Complete", "✅"),
      "",
      fmtBullet(`API key (save this now): \`${result.apiKey}\``),
      fmtBullet(`Participant ID: **${result.participantId}**`),
      fmtBullet(`Team ID: **${result.teamId}**`),
      fmtBullet(`Registration TX: ${result.registrationTxn}`),
      "",
      fmtMeta("The API key is stored in the agent configuration under synthesisRegistration."),
    ].join("\n");

    return { success: true, data: result as unknown as Record<string, unknown>, display };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Synthesis registration failed: ${error}`,
    };
  }
}

export function formatPeriodLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  if (minutes < 1440) return `${Math.round(minutes / 60)} hour(s)`;
  return `${Math.round(minutes / 1440)} day(s)`;
}

// ─── Storage / IPFS handlers ────────────────────────────────────────────────

export async function executeSaveMemory(
  params: string[],
  ctx: SkillContext
): Promise<SkillResult> {
  const [dataType = "memory", content] = params;

  if (!content) {
    return { success: false, error: "No content provided", display: "⚠️ Please provide content to save." };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = { content };
  }

  try {
    const { uploadJSON } = await import("@/lib/storage/storacha");
    const { storeJSON } = await import("@/lib/storage/ipfs-storage");

    const timestamp = new Date().toISOString();
    const filename = `${ctx.agentId || "agent"}_${dataType}_${Date.now()}.json`;
    const package_ = {
      agentId: ctx.agentId || "unknown",
      agentWallet: ctx.agentWalletAddress || "unknown",
      timestamp,
      type: dataType,
      data: parsed,
    };

    const storachaResult = await uploadJSON(package_, filename).catch(() => null);
    const pinataResult = await storeJSON(package_, filename, {
      agentId: ctx.agentId || "unknown",
      dataType,
    }).catch(() => null);

    const primary = pinataResult || storachaResult;
    if (!primary) {
      return {
        success: false,
        error: "All storage backends failed",
        display: "❌ Storage failed: PINATA_JWT may not be configured and Storacha login required.",
      };
    }

    const alt = pinataResult && storachaResult
      ? `\n📦 **Pinata:** ${pinataResult.url}`
      : "";

    const display = [
      fmtHeader("Memory Saved to IPFS / Filecoin", "✅"),
      "",
      fmtBullet(`**Type:** ${dataType}`),
      fmtBullet(`**CID:** \`${primary.cid}\``),
      fmtBullet(`**Size:** ${(primary.size / 1024).toFixed(1)} KB`),
      fmtBullet(`**Gateway:** ${primary.url}`),
      `${alt}`,
      "",
      fmtMeta(`Saved at ${timestamp}. Use [[LOAD_MEMORY|${primary.cid}]] to retrieve.`),
    ].join("\n");

    return { success: true, data: { cid: primary.cid, url: primary.url }, display };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Save memory failed: ${error}`,
    };
  }
}

export async function executeLoadMemory(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [cid] = params;

  if (!cid) {
    return { success: false, error: "No CID provided", display: "⚠️ Please provide an IPFS CID to load." };
  }

  try {
    const { retrieveJSON } = await import("@/lib/storage/ipfs-storage");

    const data = await retrieveJSON(cid);

    const display = [
      fmtHeader("Loaded from IPFS", "📖"),
      "",
      fmtCode(JSON.stringify(data, null, 2)),
    ].join("\n");

    return { success: true, data, display };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Load failed: ${error}. CID \`${cid}\` may not be pinned or available.`,
    };
  }
}

export async function executeSaveData(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [filename = "data.json", data] = params;

  if (!data) {
    return { success: false, error: "No data provided", display: "⚠️ Please provide data to save." };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(data);
  } catch {
    parsed = { content: data };
  }

  try {
    const { storeJSON } = await import("@/lib/storage/ipfs-storage");
    const result = await storeJSON(parsed, filename);

    const display = [
      fmtHeader("Data Saved to IPFS", "✅"),
      "",
      fmtBullet(`**Filename:** ${filename}`),
      fmtBullet(`**CID:** \`${result.cid}\``),
      fmtBullet(`**Size:** ${(result.size / 1024).toFixed(1)} KB`),
      fmtBullet(`**Gateway:** ${result.url}`),
      "",
      fmtMeta(`Use [[LOAD_DATA|${result.cid}]] to retrieve.`),
    ].join("\n");

    return { success: true, data: { cid: result.cid, url: result.url }, display };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Save failed: ${error}. Check that PINATA_JWT is configured.`,
    };
  }
}

export async function executeLoadData(
  params: string[],
  _ctx: SkillContext
): Promise<SkillResult> {
  const [cid] = params;

  if (!cid) {
    return { success: false, error: "No CID provided", display: "⚠️ Please provide an IPFS CID." };
  }

  try {
    const { retrieveJSON } = await import("@/lib/storage/ipfs-storage");
    const data = await retrieveJSON(cid);

    const display = [
      fmtHeader("Loaded from IPFS", "📖"),
      "",
      fmtCode(JSON.stringify(data, null, 2)),
    ].join("\n");

    return { success: true, data, display };
  } catch (error) {
    return {
      success: false,
      error: String(error),
      display: `❌ Load failed: ${error}. CID \`${cid}\` may not be pinned.`,
    };
  }
}

// ─── Uniswap Trading API handlers ───────────────────────────────────────────

const UNISWAP_SUPPORTED_TOKENS: Record<string, { address: string; decimals: number; chainIds: number[] }> = {
  ETH: { address: "0x0000000000000000000000000000000000000000", decimals: 18, chainIds: [1, 10, 137, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532, 534352, 59144, 42220, 56, 100] },
  WETH: { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18, chainIds: [1, 10, 137, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532, 534352, 59144, 56, 100] },
  USDC: { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainIds: [1, 10, 137, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532, 534352, 59144, 42220, 56, 100] },
  USDT: { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6, chainIds: [1, 10, 137, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532, 59144, 56, 100] },
  WBTC: { address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainIds: [1, 10, 137, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532, 534352, 56, 100] },
  DAI: { address: "0x6B175474E89094C44Da98b954EescdeCB5c8D3E4", decimals: 18, chainIds: [1, 10, 137, 8453, 11155111, 11155420, 421614, 84532] },
  MATIC: { address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", decimals: 18, chainIds: [1, 10, 42161, 43114, 8453, 11155111, 11155420, 421614, 84532] },
  OP: { address: "0x4200000000000000000000000000000000000042", decimals: 18, chainIds: [10, 11155420] },
  BASE: { address: "0x235eD3AD5b4bC9A25EC2796D8C79b60bDa81bF40", decimals: 18, chainIds: [8453, 84532] },
  ARB: { address: "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1", decimals: 18, chainIds: [42161, 421614] },
  CELO: { address: "0x0000000000000000000000000000000000000000", decimals: 18, chainIds: [42220] },
};

const CHAIN_RPC: Record<number, string> = {
  1: process.env.ETHEREUM_RPC_URL || "",
  10: process.env.OPTIMISM_RPC_URL || "",
  137: process.env.POLYGON_RPC_URL || "",
  42161: process.env.ARBITRUM_RPC_URL || "",
  43114: process.env.AVALANCHE_RPC_URL || "",
  8453: process.env.BASE_RPC_URL || "",
  84532: process.env.BASE_SEPOLIA_RPC_URL || "",
  11155111: process.env.SEPOLIA_RPC_URL || "",
  11155420: process.env.OPTIMISM_SEPOLIA_RPC_URL || "",
  421614: process.env.ARBITRUM_SEPOLIA_RPC_URL || "",
  534352: process.env.SCROLL_RPC_URL || "",
  59144: process.env.LINEA_RPC_URL || "",
  42220: process.env.CELO_RPC_URL || "",
  56: process.env.BSC_RPC_URL || "",
  100: process.env.GNOSIS_RPC_URL || "",
};

const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  10: "Optimism",
  137: "Polygon",
  42161: "Arbitrum",
  43114: "Avalanche",
  8453: "Base",
  84532: "Base Sepolia",
  11155111: "Sepolia",
  11155420: "Optimism Sepolia",
  421614: "Arbitrum Sepolia",
  534352: "Scroll",
  59144: "Linea",
  42220: "Celo",
  56: "BNB Chain",
  100: "Gnosis",
};

function resolveToken(symbolOrAddress: string, chainId: number): { address: string; decimals: number } | null {
  const upper = symbolOrAddress.toUpperCase();
  if (UNISWAP_SUPPORTED_TOKENS[upper]) {
    const token = UNISWAP_SUPPORTED_TOKENS[upper];
    if (token.chainIds.includes(chainId)) {
      return { address: token.address, decimals: token.decimals };
    }
    return null;
  }
  if (isAddress(symbolOrAddress)) {
    return { address: symbolOrAddress, decimals: 18 };
  }
  return null;
}

function getChainRpc(chainId: number): string | null {
  return CHAIN_RPC[chainId] || null;
}

export async function executeUniswapQuote(params: string[], ctx: SkillContext): Promise<SkillResult> {
  const [sellToken, buyToken, amount, sellChainStr = "1", buyChainStr] = params;

  if (!sellToken || !buyToken || !amount) {
    return { success: false, error: "Missing params", display: "❌ Usage: [[UNISWAP_QUOTE|sell_token|buy_token|amount|sell_chain|buy_chain]]" };
  }

  const sellChainId = parseInt(sellChainStr);
  const buyChainId = buyChainStr ? parseInt(buyChainStr) : sellChainId;

  if (sellChainId === 42220 && buyChainId === 42220) {
    return {
      success: false,
      error: "Celo-native swap",
      display: "ℹ️ For Celo-native swaps, use **MENTO_QUOTE** instead — `[[MENTO_QUOTE|cUSD|CELO|10]]`.",
    };
  }

  const tokenIn = resolveToken(sellToken, sellChainId);
  const tokenOut = resolveToken(buyToken, buyChainId);

  if (!tokenIn) {
    return { success: false, error: `Unknown token: ${sellToken} on chain ${sellChainId}`, display: `❌ Unknown input token \`${sellToken}\` on ${CHAIN_NAMES[sellChainId] || sellChainId}. Supported: ETH, WETH, USDC, USDT, WBTC, DAI, MATIC, OP, ARB, CELO, or a token address.` };
  }
  if (!tokenOut) {
    return { success: false, error: `Unknown token: ${buyToken} on chain ${buyChainId}`, display: `❌ Unknown output token \`${buyToken}\` on ${CHAIN_NAMES[buyChainId] || buyChainId}. Supported: ETH, WETH, USDC, USDT, WBTC, DAI, MATIC, OP, ARB, CELO, or a token address.` };
  }

  const swapper = ctx.agentWalletAddress || "0x0000000000000000000000000000000000000001";

  try {
    const { getQuote } = await import("@/lib/blockchain/uniswap");

    const quote = await getQuote({
      type: "EXACT_INPUT",
      amount: parseUnits(amount, tokenIn.decimals).toString(),
      tokenIn: tokenIn.address,
      tokenOut: tokenOut.address,
      tokenInChainId: sellChainId,
      tokenOutChainId: buyChainId,
      swapper,
      routingPreference: "BEST_PRICE",
      urgency: "normal",
      autoSlippage: "DEFAULT",
    });

    const isCrossChain = sellChainId !== buyChainId;
    const sellFormatted = formatUnits(BigInt(quote.input.amount), tokenIn.decimals);
    const buyFormatted = formatUnits(BigInt(quote.output.amount), tokenOut.decimals);
    const priceImpact = "priceImpact" in quote ? (quote as { priceImpact?: number }).priceImpact : null;
    const source = "source" in quote ? (quote as { source?: string }).source : "uniswapx";
    const totalGas = "totalGas" in quote ? (quote as { totalGas?: string }).totalGas : null;

    const lines = [
      fmtHeader(`${isCrossChain ? "Cross-Chain" : ""} Uniswap Quote`, "🔄"),
      "",
      fmtBullet(`Sell: **${parseFloat(sellFormatted).toFixed(6)}** ${sellToken} (${CHAIN_NAMES[sellChainId] || sellChainId})`),
      fmtBullet(`Buy: ~**${parseFloat(buyFormatted).toFixed(6)}** ${buyToken} (${CHAIN_NAMES[buyChainId] || buyChainId})`),
      fmtBullet(`Rate: 1 ${sellToken} = ${(parseFloat(buyFormatted) / parseFloat(sellFormatted)).toFixed(6)} ${buyToken}`),
    ];

    if (priceImpact !== null && priceImpact !== undefined) {
      lines.push(fmtBullet(`Price impact: **${priceImpact.toFixed(2)}%**`));
    }

    if (totalGas) {
      const gasNum = parseFloat(totalGas);
      lines.push(fmtBullet(`Est. gas: **${(gasNum / 1e6).toFixed(1)}M** gas units`));
    }

    lines.push(fmtBullet(`Routing: **${source}**`));

    if (isCrossChain) {
      lines.push("");
      lines.push(fmtMeta("⚠️ Cross-chain swaps use UniswapX Dutch auction — price improves over the fill window."));
    }

    lines.push("");
    lines.push(fmtMeta(`Quote ID: \`${"quoteId" in quote ? (quote as { quoteId?: string }).quoteId : "n/a"}\``));

    return { success: true, data: { quote, sellChainId, buyChainId, swapper } as unknown as Record<string, unknown>, display: lines.join("\n") };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Uniswap quote failed: ${error}` };
  }
}

export async function executeUniswapSwap(params: string[], ctx: SkillContext): Promise<SkillResult> {
  const [sellToken, buyToken, amount, chainIdStr = "1"] = params;

  if (!sellToken || !buyToken || !amount) {
    return { success: false, error: "Missing params", display: "❌ Usage: [[UNISWAP_SWAP|sell_token|buy_token|amount|chain_id]]" };
  }

  if (!ctx.agentWalletAddress || ctx.walletDerivationIndex === null) {
    return { success: false, error: "No wallet", display: "⚠️ Agent wallet not initialized." };
  }

  const chainId = parseInt(chainIdStr);

  if (chainId === 42220) {
    return { success: false, error: "Celo swap", display: "ℹ️ For Celo swaps, use **MENTO_SWAP** instead — `[[MENTO_SWAP|cUSD|CELO|10]]`." };
  }

  const tokenIn = resolveToken(sellToken, chainId);
  const tokenOut = resolveToken(buyToken, chainId);

  if (!tokenIn) {
    return { success: false, error: `Unknown token: ${sellToken}`, display: `❌ Unknown token \`${sellToken}\` on ${CHAIN_NAMES[chainId] || chainId}.` };
  }
  if (!tokenOut) {
    return { success: false, error: `Unknown token: ${buyToken}`, display: `❌ Unknown token \`${buyToken}\` on ${CHAIN_NAMES[chainId] || chainId}.` };
  }

  const rpcUrl = getChainRpc(chainId);
  if (!rpcUrl) {
    return { success: false, error: "No RPC configured", display: `⚠️ No RPC URL configured for ${CHAIN_NAMES[chainId] || chainId}. Set \`${CHAIN_ID_TO_RPC_ENV[chainId]}\` in environment.` };
  }

  const mnemonic = process.env.AGENT_MNEMONIC;
  if (!mnemonic) {
    return { success: false, error: "No mnemonic", display: "⚠️ AGENT_MNEMONIC not set. Cannot sign cross-chain transactions." };
  }

  try {
    const { mnemonicToAccount } = await import("viem/accounts");
    const { getQuote, buildSwap } = await import("@/lib/blockchain/uniswap");

    const quote = await getQuote({
      type: "EXACT_INPUT",
      amount: parseUnits(amount, tokenIn.decimals).toString(),
      tokenIn: tokenIn.address,
      tokenOut: tokenOut.address,
      tokenInChainId: chainId,
      tokenOutChainId: chainId,
      swapper: ctx.agentWalletAddress,
      routingPreference: "BEST_PRICE",
      urgency: "normal",
      autoSlippage: "DEFAULT",
    });

    const isClassic = "source" in quote;
    if (!isClassic) {
      return {
        success: true,
        data: { quote, chainId, status: "needs_wallet_signature" } as unknown as Record<string, unknown>,
        display: [
          fmtHeader("UniswapX Dutch Auction Order", "🔄"),
          "",
          fmtBullet(`Sell: **${amount}** ${sellToken}`),
          fmtBullet(`Buy: ~**${formatUnits(BigInt(quote.output.amount), tokenOut.decimals)}** ${buyToken}`),
          fmtBullet(`Chain: ${CHAIN_NAMES[chainId] || chainId}`),
          "",
          fmtMeta("⚠️ This is a Dutch auction order. The agent wallet must sign the order off-chain. Configure the target chain RPC to execute."),
        ].join("\n"),
      };
    }

    const swapRes = await buildSwap({ quote: quote as Parameters<typeof buildSwap>[0]["quote"] });
    const calldata = swapRes.transactionRequest;

    const account = mnemonicToAccount(mnemonic, { addressIndex: ctx.walletDerivationIndex });

    const chain = getChainForId(chainId);
    if (!chain) {
      return { success: false, error: "Unsupported chain", display: `❌ Chain ${chainId} not supported.` };
    }

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(rpcUrl),
    });

    const publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });

    const txHash = await walletClient.sendTransaction({
      chain,
      to: calldata.to as `0x${string}`,
      data: calldata.data as `0x${string}`,
      value: BigInt(calldata.value || "0"),
      maxFeePerGas: calldata.maxFeePerGas ? BigInt(calldata.maxFeePerGas) : undefined,
      maxPriorityFeePerGas: calldata.maxPriorityFeePerGas ? BigInt(calldata.maxPriorityFeePerGas) : undefined,
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash, timeout: 60_000 });

    const buyFormatted = formatUnits(BigInt(quote.output.amount), tokenOut.decimals);
    const explorerBase = getExplorer(chainId);

    return {
      success: true,
      data: { txHash, chainId, quote } as unknown as Record<string, unknown>,
      display: [
        fmtHeader("Uniswap Swap Confirmed", "✅"),
        "",
        fmtBullet(`Sold: **${amount}** ${sellToken}`),
        fmtBullet(`Bought: ~**${parseFloat(buyFormatted).toFixed(6)}** ${buyToken}`),
        fmtBullet(`Chain: ${CHAIN_NAMES[chainId] || chainId}`),
        fmtBullet(`TX: \`${txHash}\``),
        explorerBase ? fmtBullet(`Explorer: ${explorerBase}/tx/${txHash}`) : "",
      ].filter(Boolean).join("\n"),
    };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Uniswap swap failed: ${error}` };
  }
}

export async function executeUniswapCrossChain(params: string[], ctx: SkillContext): Promise<SkillResult> {
  const [sellToken, buyToken, amount, sourceChainStr, destChainStr] = params;

  if (!sellToken || !buyToken || !amount || !sourceChainStr || !destChainStr) {
    return { success: false, error: "Missing params", display: "❌ Usage: [[UNISWAP_CROSS_CHAIN|sell_token|buy_token|amount|source_chain|dest_chain]]" };
  }

  if (!ctx.agentWalletAddress || ctx.walletDerivationIndex === null) {
    return { success: false, error: "No wallet", display: "⚠️ Agent wallet not initialized." };
  }

  const sourceChainId = parseInt(sourceChainStr);
  const destChainId = parseInt(destChainStr);

  const tokenIn = resolveToken(sellToken, sourceChainId);
  const tokenOut = resolveToken(buyToken, destChainId);

  if (!tokenIn) {
    return { success: false, error: `Unknown token: ${sellToken}`, display: `❌ Unknown token \`${sellToken}\` on ${CHAIN_NAMES[sourceChainId] || sourceChainId}.` };
  }
  if (!tokenOut) {
    return { success: false, error: `Unknown token: ${buyToken}`, display: `❌ Unknown token \`${buyToken}\` on ${CHAIN_NAMES[destChainId] || destChainId}.` };
  }

  const rpcUrl = getChainRpc(sourceChainId);
  if (!rpcUrl) {
    return { success: false, error: "No RPC configured", display: `⚠️ No RPC URL for ${CHAIN_NAMES[sourceChainId] || sourceChainId}. Set the appropriate *_RPC_URL env var.` };
  }

  const mnemonic = process.env.AGENT_MNEMONIC;
  if (!mnemonic) {
    return { success: false, error: "No mnemonic", display: "⚠️ AGENT_MNEMONIC not set." };
  }

  try {
    const { mnemonicToAccount } = await import("viem/accounts");
    const { getQuote } = await import("@/lib/blockchain/uniswap");

    const quote = await getQuote({
      type: "EXACT_INPUT",
      amount: parseUnits(amount, tokenIn.decimals).toString(),
      tokenIn: tokenIn.address,
      tokenOut: tokenOut.address,
      tokenInChainId: sourceChainId,
      tokenOutChainId: destChainId,
      swapper: ctx.agentWalletAddress,
      routingPreference: "DUTCH_V2",
      urgency: "normal",
      autoSlippage: "DEFAULT",
    });

    const sellFormatted = formatUnits(BigInt(quote.input.amount), tokenIn.decimals);
    const buyFormatted = formatUnits(BigInt(quote.output.amount), tokenOut.decimals);
    const startAmount = "startAmount" in quote ? (quote as { startAmount: string }).startAmount : quote.output.amount;
    const endAmount = "endAmount" in quote ? (quote as { endAmount: string }).endAmount : quote.output.amount;

    return {
      success: true,
      data: { quote, sourceChainId, destChainId } as unknown as Record<string, unknown>,
      display: [
        fmtHeader("UniswapX Cross-Chain Quote", "🌉"),
        "",
        fmtBullet(`Sell: **${parseFloat(sellFormatted).toFixed(6)}** ${sellToken} (${CHAIN_NAMES[sourceChainId] || sourceChainId})`),
        fmtBullet(`Receive: **${parseFloat(buyFormatted).toFixed(6)}** ${buyToken} (${CHAIN_NAMES[destChainId] || destChainId})`),
        fmtBullet(`Bridge: UniswapX Dutch V2`),
        "",
        fmtSection("Dutch Auction Fill Window"),
        fmtBullet(`Start: ~${formatUnits(BigInt(startAmount), tokenOut.decimals)} ${buyToken}`),
        fmtBullet(`End: ~${formatUnits(BigInt(endAmount), tokenOut.decimals)} ${buyToken}`),
        fmtBullet("(Best price at auction end — fills automatically within the window)"),
        "",
        fmtMeta("⚠️ Cross-chain execution requires: 1) Approval for input token, 2) Signing the fill tx on source chain. Set the RPC env var for the source chain."),
      ].join("\n"),
    };
  } catch (error) {
    return { success: false, error: String(error), display: `❌ Cross-chain quote failed: ${error}` };
  }
}

function getChainForId(chainId: number): Chain | null {
  switch (chainId) {
    case 1: return mainnet;
    case 10: return optimism;
    case 137: return polygon;
    case 42161: return arbitrum;
    case 43114: return avalanche;
    case 8453: return base;
    case 84532: return baseSepolia;
    case 11155111: return sepolia;
    case 11155420: return optimismSepolia;
    case 421614: return arbitrumSepolia;
    case 534352: return scroll;
    case 59144: return linea;
    case 42220: return celo;
    case 11142220: return celoSepolia;
    case 56: return bsc;
    case 100: return gnosis;
    default: return null;
  }
}

function getExplorer(chainId: number): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    10: "https://optimistic.etherscan.io",
    137: "https://polygonscan.com",
    42161: "https://arbiscan.io",
    43114: "https://snowtrace.io",
    8453: "https://basescan.org",
    84532: "https://sepolia.basescan.org",
    11155111: "https://sepolia.etherscan.io",
    11155420: "https://sepolia-optimism.etherscan.io",
    421614: "https://sepolia.arbiscan.io",
    534352: "https://scrollscan.com",
    59144: "https://lineascan.build",
    42220: "https://celoscan.io",
    11142220: "https://celo-sepolia.blockscout.com",
    56: "https://bscscan.com",
    100: "https://gnosisscan.io",
  };
  return explorers[chainId] || "";
}

const CHAIN_ID_TO_RPC_ENV: Record<number, string> = {
  1: "ETHEREUM_RPC_URL",
  10: "OPTIMISM_RPC_URL",
  137: "POLYGON_RPC_URL",
  42161: "ARBITRUM_RPC_URL",
  43114: "AVALANCHE_RPC_URL",
  8453: "BASE_RPC_URL",
  84532: "BASE_SEPOLIA_RPC_URL",
  11155111: "SEPOLIA_RPC_URL",
  11155420: "OPTIMISM_SEPOLIA_RPC_URL",
  421614: "ARBITRUM_SEPOLIA_RPC_URL",
  534352: "SCROLL_RPC_URL",
  59144: "LINEA_RPC_URL",
  42220: "CELO_RPC_URL",
  56: "BSC_RPC_URL",
  100: "GNOSIS_RPC_URL",
};

