"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useSendTransaction, useBalance, usePublicClient } from "wagmi";
import { formatUnits, type Address, type Hash, encodeFunctionData } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import {
  Loader2, Globe, CheckCircle, ArrowLeft, Wallet,
  AlertCircle, Bot, Plus, Download, Copy, ExternalLink, RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { prepareCeloTransaction } from "@/lib/transactions/fee-abstraction";
import Link from "next/link";
import { getHausNamePrice } from "@/lib/pricing";

const REGISTRAR_ADDRESS = "0xcf5D3d90DB4129D1063d8ad0942B375691ef6a2a";
const CELO_MAINNET_CHAIN_ID = 42220;

const registrarAbi = [
  {
    name: "getRegistrationFee",
    type: "function",
    inputs: [
      { name: "name", type: "string" },
      { name: "token", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "registerSubdomain",
    type: "function",
    inputs: [
      { name: "name", type: "string" },
      { name: "targetOwner", type: "address" },
      { name: "token", type: "address" },
      { name: "maxAmount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

const registrarRecordAbi = [
  {
    name: "getNameRecord",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "name", type: "string" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "token", type: "address" },
          { name: "paidAmount", type: "uint256" },
          { name: "registeredAt", type: "uint64" },
          { name: "active", type: "bool" },
        ],
      },
    ],
  },
] as const;

const erc20Abi = [
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const registrarTokenAbi = [
  {
    name: "getSupportedTokens",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
  },
  {
    name: "supportedTokens",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "enabled", type: "bool" },
      { name: "fee", type: "uint256" },
    ],
  },
  {
    name: "tokenDecimals",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint8" }],
  },
] as const;

type View = "buy" | "import";
type PaymentTokenOption = { symbol: string; address: Address; decimals: number };

function maskContractAddress(address?: string): string {
  if (!address) return "-";
  if (address.length < 9) return address;
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
}

export default function EnsBuyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAgentId = searchParams.get("agentId");

  const { address, isConnected, chainId } = useAccount();
  const [agents, setAgents] = React.useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = React.useState(initialAgentId || "");
  const [subdomain, setSubdomain] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [registering, setRegistering] = React.useState(false);
  const [supportedTokens, setSupportedTokens] = React.useState<PaymentTokenOption[]>([]);
  const [paymentToken, setPaymentToken] = React.useState<PaymentTokenOption | null>(null);
  const [onChainFee, setOnChainFee] = React.useState<string | null>(null);
  const [feeLoading, setFeeLoading] = React.useState(false);
  const [approvalRequired, setApprovalRequired] = React.useState(false);
  const [approvalCheckLoading, setApprovalCheckLoading] = React.useState(false);
  const [txError, setTxError] = React.useState<string | null>(null);
  const [showBuyModal, setShowBuyModal] = React.useState(false);
  const [view, setView] = React.useState<View>("buy");
  const [paymentMethod, setPaymentMethod] = React.useState<"x402" | "onchain">(
    (searchParams.get("method") as any) === "x402" ? "x402" : "onchain"
  );

  const { data: selectedTokenBalance } = useBalance({
    address,
    token: paymentToken?.address,
  });

  const currentPrice = getHausNamePrice(subdomain);

  // Import form state
  const [importName, setImportName] = React.useState("");
  const [importWallet, setImportWallet] = React.useState("");
  const [importId, setImportId] = React.useState("");
  const [importPubKey, setImportPubKey] = React.useState("");
  const [importChain, setImportChain] = React.useState("42220");
  const [importing, setImporting] = React.useState(false);
  const [fetchingMetadata, setFetchingMetadata] = React.useState(false);
  const [importMetadata, setImportMetadata] = React.useState<any>(null);
  const [discoveredAgents, setDiscoveredAgents] = React.useState<any[]>([]);
  const [discovering, setDiscovering] = React.useState(false);

  const { sendTransactionAsync } = useSendTransaction();
  const publicClient = usePublicClient();
  const isOnchainCeloSupported = chainId === CELO_MAINNET_CHAIN_ID;

  const fetchAgents = React.useCallback(() => {
    if (!address) return;
    setLoading(true);
    fetch(`/api/agents?ownerAddress=${address}`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.agents || [];
        setAgents(list);
        if (!selectedAgentId && list.length > 0) {
          setSelectedAgentId(list[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [address, selectedAgentId]);

  React.useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  React.useEffect(() => {
    if (!isOnchainCeloSupported && paymentMethod === "onchain") {
      setPaymentMethod("x402");
    }
  }, [isOnchainCeloSupported, paymentMethod]);

  React.useEffect(() => {
    if (!publicClient || !isOnchainCeloSupported) {
      setSupportedTokens([]);
      setPaymentToken(null);
      return;
    }

    let isCancelled = false;

    (async () => {
      try {
        const tokenAddresses = (await publicClient.readContract({
          address: REGISTRAR_ADDRESS as Address,
          abi: registrarTokenAbi,
          functionName: "getSupportedTokens",
        })) as Address[];

        const entries = await Promise.all(
          tokenAddresses.map(async (tokenAddress) => {
            const [tokenInfo, decimals, symbol] = await Promise.all([
              publicClient.readContract({
                address: REGISTRAR_ADDRESS as Address,
                abi: registrarTokenAbi,
                functionName: "supportedTokens",
                args: [tokenAddress],
              }) as Promise<readonly [boolean, bigint]>,
              publicClient.readContract({
                address: REGISTRAR_ADDRESS as Address,
                abi: registrarTokenAbi,
                functionName: "tokenDecimals",
                args: [tokenAddress],
              }) as Promise<number>,
              publicClient.readContract({
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "symbol",
              }).catch(() => "TOKEN"),
            ]);

            if (!tokenInfo[0]) return null;

            return {
              symbol: String(symbol),
              address: tokenAddress,
              decimals: Number(decimals),
            } as PaymentTokenOption;
          })
        );

        const enabledTokens = entries.filter((t): t is PaymentTokenOption => !!t);

        if (!isCancelled) {
          setSupportedTokens(enabledTokens);
          setPaymentToken((prev) => {
            if (prev && enabledTokens.some((t) => t.address.toLowerCase() === prev.address.toLowerCase())) {
              return prev;
            }
            return enabledTokens[0] ?? null;
          });
        }
      } catch {
        if (!isCancelled) {
          setSupportedTokens([]);
          setPaymentToken(null);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [publicClient, isOnchainCeloSupported]);

  React.useEffect(() => {
    const cleanName = subdomain.toLowerCase().trim();
    if (paymentMethod !== "onchain" || !publicClient || !paymentToken || cleanName.length < 3 || cleanName.length > 20) {
      setOnChainFee(null);
      return;
    }

    let isCancelled = false;
    setFeeLoading(true);

    publicClient
      .readContract({
        address: REGISTRAR_ADDRESS as Address,
        abi: registrarAbi,
        functionName: "getRegistrationFee",
        args: [cleanName, paymentToken.address as Address],
      })
      .then((feeRaw) => {
        if (isCancelled) return;
        const formatted = formatUnits(feeRaw as bigint, paymentToken.decimals);
        setOnChainFee(formatted);
      })
      .catch(() => {
        if (!isCancelled) setOnChainFee(null);
      })
      .finally(() => {
        if (!isCancelled) setFeeLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [paymentMethod, paymentToken, publicClient, subdomain]);

  React.useEffect(() => {
    if (paymentMethod !== "onchain" || !publicClient || !address || !paymentToken || feeLoading || !onChainFee) {
      setApprovalRequired(false);
      return;
    }

    let isCancelled = false;
    setApprovalCheckLoading(true);

    (async () => {
      try {
        const feeRaw = (await publicClient.readContract({
          address: REGISTRAR_ADDRESS as Address,
          abi: registrarAbi,
          functionName: "getRegistrationFee",
          args: [subdomain.toLowerCase().trim(), paymentToken.address as Address],
        })) as bigint;

        const allowance = (await publicClient.readContract({
          address: paymentToken.address as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, REGISTRAR_ADDRESS as Address],
        })) as bigint;

        if (!isCancelled) {
          setApprovalRequired(allowance < feeRaw);
        }
      } catch {
        if (!isCancelled) {
          setApprovalRequired(false);
        }
      } finally {
        if (!isCancelled) {
          setApprovalCheckLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [paymentMethod, publicClient, address, paymentToken, onChainFee, feeLoading]);

  // ── Import agent logic ───────────────────────────────────
  const fetchMetadata = async () => {
    if (!importId.trim()) return;
    setFetchingMetadata(true);
    try {
      const res = await fetch(`/api/ens/erc8004-metadata?chainId=${importChain}&agentId=${importId.trim()}`);
      if (!res.ok) throw new Error("Agent not found or registry issue");
      const data = await res.json();
      setImportName(data.name || "");
      setImportWallet(data.wallet || "");
      setImportPubKey(data.publicKey || "");
      setImportMetadata(data);
      toast.success("Metadata populated from ERC-8004!");
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch metadata");
    } finally {
      setFetchingMetadata(false);
    }
  };

  const discoverAgents = React.useCallback(async () => {
    if (!address || view !== "import") return;
    setDiscovering(true);
    try {
      const res = await fetch(`/api/ens/discover-agents?chainId=${importChain}&address=${address}`);
      if (!res.ok) throw new Error("Discovery failed");
      const data = await res.json();
      setDiscoveredAgents(data.agents || []);
      if (data.hint) toast.info(data.hint, { duration: 5000 });
    } catch (err) {
      console.error("Discovery error:", err);
    } finally {
      setDiscovering(false);
    }
  }, [address, importChain, view]);

  React.useEffect(() => {
    discoverAgents();
  }, [discoverAgents]);

  const handleImport = async () => {
    if (!address || !importName.trim() || !importWallet.trim()) return;
    setImporting(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: importName.trim(),
          agentWalletAddress: importWallet.trim(),
          erc8004AgentId: importId.trim() || undefined,
          erc8004ChainId: importChain,
          erc8004URI: importMetadata?.erc8004URI,
          publicKey: importPubKey.trim() || undefined,
          source: "import",
          ownerAddress: address,
          templateType: "custom",
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Import failed");
      }
      toast.success(`Agent "${importName}" imported!`);
      setImportName("");
      setImportWallet("");
      setImportId("");
      setImportPubKey("");
      setImportMetadata(null);
      setView("buy");
      fetchAgents();
    } catch (err: any) {
      toast.error(err.message || "Failed to import agent");
    } finally {
      setImporting(false);
    }
  };

  // ── Buy / register handler ───────────────────────────────
  const handleBuy = async () => {
    if (!address || !selectedAgentId || !subdomain || !publicClient) return;
    setRegistering(true);
    setTxError(null);

    try {
      const selectedAgent = agents.find((a) => a.id === selectedAgentId);
      if (!selectedAgent) throw new Error("Agent not found");

      const tryReconcileRegistration = async () => {
        const reconcileRes = await fetch("/api/ens/register-reconcile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentId: selectedAgent.id,
            subdomain,
            ownerAddress: address,
          }),
        });

        if (!reconcileRes.ok) {
          return false;
        }

        toast.success(`Registered ${subdomain}.agenthaus.eth!`);
        router.push(`/dashboard/agents/${selectedAgent.id}`);
        return true;
      };

      const runOnchainPreflight = async () => {
        if (paymentMethod !== "onchain") return false;

        const chainRecord = (await publicClient.readContract({
          address: REGISTRAR_ADDRESS as Address,
          abi: registrarRecordAbi,
          functionName: "getNameRecord",
          args: [subdomain.toLowerCase().trim()],
        })) as {
          owner: Address;
          token: Address;
          paidAmount: bigint;
          registeredAt: bigint;
          active: boolean;
        };

        const recordOwner = chainRecord.owner;
        const active = chainRecord.active;

        if (!active) return false;

        const selectedAgentWallet = String(selectedAgent.agentWalletAddress || "").toLowerCase();
        if (recordOwner.toLowerCase() === selectedAgentWallet) {
          toast.info("Name already active on-chain for this agent. Syncing now...");
          const recovered = await tryReconcileRegistration();
          if (recovered) {
            return true;
          }
          throw new Error("Name is already active on-chain for this agent, but sync failed.");
        }

        throw new Error("Name is already registered on-chain by another owner.");
      };

      if (paymentMethod === "x402") {
        // x402 Gasless Flow
        const { X402Client } = await import("uvd-x402-sdk");
        const x402 = new X402Client({ defaultChain: "celo" });
        await x402.connect("celo");

        const payment = await x402.createPayment({
          recipient: "0x9b6A52A88a1Ee029Bd14170fFb8fB15839Bd18cB",
          amount: currentPrice,
        });

        const res = await fetch("/api/ens/buy-x402", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Payment": payment.paymentHeader
          },
          body: JSON.stringify({
            agentId: selectedAgent.id,
            name: subdomain,
          }),
        });

        if (res.ok) {
          toast.success(`Registered ${subdomain}.agenthaus.eth via x402!`);
          router.push(`/dashboard/agents/${selectedAgent.id}`);
        } else {
          const error = await res.json();
          throw new Error(error.error || "x402 Registration failed");
        }
      } else {
        if (!isOnchainCeloSupported) {
          throw new Error("On-chain ENS payment is supported on Celo Mainnet only.");
        }

        const alreadyHandled = await runOnchainPreflight();
        if (alreadyHandled) {
          return;
        }

        if (!paymentToken) {
          throw new Error("No payment token available");
        }

        // On-chain flow: ensure selected token approval, then call registrar.
        const feeRaw = (await publicClient.readContract({
          address: REGISTRAR_ADDRESS as Address,
          abi: registrarAbi,
          functionName: "getRegistrationFee",
          args: [subdomain.toLowerCase().trim(), paymentToken.address as Address],
        })) as bigint;

        if (feeRaw <= BigInt(0)) {
          throw new Error(`${paymentToken.symbol} is not enabled in registrar`);
        }

        const allowance = (await publicClient.readContract({
          address: paymentToken.address as Address,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, REGISTRAR_ADDRESS as Address],
        })) as bigint;

        if (allowance < feeRaw) {
          const approveData = encodeFunctionData({
            abi: erc20Abi,
            functionName: "approve",
            args: [REGISTRAR_ADDRESS as Address, feeRaw],
          });

          const approveRequest = await prepareCeloTransaction(address, {
            to: paymentToken.address as Address,
            data: approveData,
          });

          toast.info(`Approving ${paymentToken.symbol} for registrar...`);
          const approveHash = await sendTransactionAsync(approveRequest as any);
          const approveReceipt = await publicClient.waitForTransactionReceipt({ hash: approveHash as Hash });

          if (approveReceipt.status !== "success") {
            throw new Error("Token approval failed");
          }
        }

        const txData = encodeFunctionData({
          abi: registrarAbi,
          functionName: "registerSubdomain",
          args: [
            subdomain.toLowerCase().trim(),
            selectedAgent.agentWalletAddress as Address,
            paymentToken.address as Address,
            feeRaw,
          ],
        });

        const txRequest = await prepareCeloTransaction(address, {
          to: REGISTRAR_ADDRESS,
          data: txData,
        });

        const hash = await sendTransactionAsync(txRequest as any);
        const receipt = await publicClient.waitForTransactionReceipt({ hash: hash as Hash });

        if (receipt.status !== "success") {
          const recovered = await tryReconcileRegistration();
          if (recovered) {
            return;
          }
          throw new Error("Registration transaction failed on-chain");
        }

        const payload = {
          agentId: selectedAgent.id,
          subdomain,
          txHash: hash,
          ownerAddress: address,
        };

        let res = await fetch("/api/ens/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // If backend had a transient issue (e.g. DB reconnect), retry once.
        if (!res.ok) {
          await new Promise((resolve) => setTimeout(resolve, 1200));
          res = await fetch("/api/ens/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }

        if (res.ok) {
          toast.success(`Registered ${subdomain}.agenthaus.eth!`);
          router.push(`/dashboard/agents/${selectedAgent.id}`);
        } else {
          const recovered = await tryReconcileRegistration();
          if (recovered) {
            return;
          }

          const error = await res.json();
          toast.error(error.message || `Payment confirmed on-chain (tx: ${hash.slice(0, 10)}...), but backend sync failed. Please retry.`);
        }
      }
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || "An error occurred";
      setTxError(message);
      toast.error(message);
    } finally {
      setRegistering(false);
    }
  };

  // ── Not connected ────────────────────────────────────────
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white border-4 border-forest shadow-hard">
        <Wallet className="w-20 h-20 text-forest mb-6" />
        <h2 className="text-4xl font-black uppercase tracking-tighter text-forest mb-4">Connect Wallet</h2>
        <p className="text-forest font-medium max-w-sm mb-8">
          Connect your wallet to buy a haus name for your agent.
        </p>
      </div>
    );
  }

  // ── Loading ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-forest animate-spin" />
        <span className="mt-4 font-bold uppercase tracking-widest">Loading...</span>
      </div>
    );
  }

  // ── No agents: empty state ────────────────────────────────
  if (agents.length === 0 && view === "buy") {
    return (
      <div className="min-h-screen bg-gypsum p-4 sm:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="border-4 border-forest shadow-hard overflow-hidden bg-white">
            <div className="h-2 bg-forest" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-forest/10 border-2 border-forest">
                  <Globe className="w-6 h-6 text-forest" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter text-forest">
                  Buy a Haus Name
                </CardTitle>
              </div>
              <CardDescription className="font-bold uppercase text-forest/60">
                Claim a human-readable name on agenthaus.eth
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-4 border-dashed border-forest/20 bg-gypsum p-10 text-center">
                <Bot className="w-16 h-16 text-forest/20 mx-auto mb-4" />
                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">
                  You need an agent first
                </h3>
                <p className="text-sm font-bold text-forest/60 max-w-xs mx-auto mb-8">
                  A haus name is tied to an agent wallet. Create a new agent or import an existing one to continue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dashboard/agents/new">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Agent
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-8 text-base border-2 border-forest"
                    onClick={() => setView("import")}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Import Agent
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-forest bg-white">
                  <h4 className="font-black uppercase text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-forest" /> On-Chain Identity
                  </h4>
                  <p className="text-xs font-bold text-forest/60">
                    Resolves to your agent's wallet everywhere ENS is supported.
                  </p>
                </div>
                <div className="p-4 border-2 border-forest bg-white">
                  <h4 className="font-black uppercase text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-forest" /> Human Readable
                  </h4>
                  <p className="text-xs font-bold text-forest/60">
                    Replace long hex addresses with simple names.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Import agent form ────────────────────────────────────
  if (view === "import") {
    return (
      <div className="min-h-screen bg-gypsum p-4 sm:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button variant="ghost" className="mb-2" onClick={() => setView("buy")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="border-4 border-forest shadow-hard overflow-hidden bg-white">
            <div className="h-2 bg-forest" />
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-forest/10 border-2 border-forest">
                  <Download className="w-6 h-6 text-forest" />
                </div>
                <CardTitle className="text-2xl font-black uppercase tracking-tighter text-forest">
                  Import Agent
                </CardTitle>
              </div>
              <CardDescription className="font-bold uppercase text-forest/60">
                Add an existing agent so you can register a haus name for it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Identification */}
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-forest border-b-2 border-forest pb-1">
                  On-Chain Registry (ERC-8004)
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-forest/70">Source Chain</label>
                    <select
                      className="w-full h-11 px-3 border-2 border-forest/20 bg-white font-bold text-sm focus:border-forest outline-none"
                      value={importChain}
                      onChange={(e) => setImportChain(e.target.value)}
                    >
                      <option value="42220">Celo Mainnet</option>
                      <option value="1">Ethereum</option>
                      <option value="8453">Base</option>
                      <option value="137">Polygon</option>
                      <option value="42161">Arbitrum</option>
                      <option value="11142220">Celo Sepolia</option>
                      <option value="11155111">Sepolia</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-forest/70">Agent ID (TokenId)</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g. 15"
                        value={importId}
                        onChange={(e) => setImportId(e.target.value)}
                        className="h-11 font-mono text-sm border-2 border-forest/20"
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-11 border-2 border-forest"
                        disabled={!importId.trim() || fetchingMetadata}
                        onClick={fetchMetadata}
                      >
                        {fetchingMetadata ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fetch"}
                      </Button>
                    </div>
                  </div>
                </div>

                {discoveredAgents.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-forest/50">Discovered Agents</label>
                    <div className="grid grid-cols-1 gap-2">
                      {discoveredAgents.map((a, idx) => (
                        <button
                          key={`${a.id}-${a.chain}-${idx}`}
                          type="button"
                          onClick={() => {
                            setImportId(a.id);
                            setImportName(a.name || "");
                            // Auto-fetch details
                            setTimeout(() => fetchMetadata(), 100);
                          }}
                          className="flex items-center justify-between p-3 border-2 border-forest/10 bg-forest/5 hover:bg-forest/10 text-left transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Bot className="w-5 h-5 text-forest/40" />
                            <div>
                              <div className="text-sm font-black text-forest">{a.name}</div>
                              <div className="text-[10px] font-bold text-forest/60">ID: {a.id}</div>
                            </div>
                          </div>
                          <Plus className="w-4 h-4 text-forest/40" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {discovering && discoveredAgents.length === 0 && (
                  <div className="flex items-center justify-center py-4 text-[10px] font-black uppercase text-forest/30 animate-pulse">
                    Scanning for agents...
                  </div>
                )}

                {!discovering && discoveredAgents.length === 0 && (
                   <div className="py-4 px-3 border-2 border-forest/5 bg-forest/[0.02] text-center">
                     <p className="text-[10px] font-black uppercase text-forest/40">No agents discovered on this chain</p>
                     <p className="text-[8px] font-bold text-forest/20 mt-1 italic">Try entering an ID manually above</p>
                   </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-forest">Agent Name</label>
                  <Input
                    placeholder="e.g. My Trading Bot"
                    value={importName}
                    onChange={(e) => setImportName(e.target.value)}
                    className="h-12 text-base font-bold border-2 border-forest/30 focus:border-forest"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-forest">Agent Wallet Address</label>
                  <Input
                    placeholder="0x..."
                    value={importWallet}
                    onChange={(e) => setImportWallet(e.target.value)}
                    className="h-12 font-mono text-sm border-2 border-forest/30 focus:border-forest"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-forest/70">Public Key (Optional)</label>
                  <Input
                    placeholder="Agent public key"
                    value={importPubKey}
                    onChange={(e) => setImportPubKey(e.target.value)}
                    className="h-11 font-mono text-sm border-2 border-forest/20"
                  />
                </div>
              </div>

              <Button
                className="w-full h-14 text-lg"
                variant="glow"
                disabled={!importName.trim() || !importWallet.trim() || importing}
                onClick={handleImport}
              >
                {importing ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Importing...</>
                ) : (
                  <><Download className="w-5 h-5 mr-2" /> Import &amp; Continue</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isX402 = searchParams.get("method") === "x402";
  const uiPrice = paymentMethod === "onchain" ? (onChainFee ?? currentPrice) : currentPrice;
  const numericUiPrice = Number(uiPrice || "0");
  const ownedEnsAgents = agents.filter((a) => !!a.ensSubdomain);

  // ── Main buy page (overview + modal trigger) ─────────────
  return (
    <div className="min-h-screen bg-gypsum p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-4 border-forest shadow-hard overflow-hidden bg-white">
          <div className="h-2 bg-forest" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-forest/10 border-2 border-forest">
                <Globe className="w-6 h-6 text-forest" />
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-tighter text-forest">
                My Haus Names
              </CardTitle>
            </div>
            <CardDescription className="font-bold uppercase text-forest/60">
              Names currently linked to your agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ownedEnsAgents.length === 0 ? (
              <div className="p-4 border-2 border-dashed border-forest/20 bg-gypsum text-center text-sm font-bold text-forest/60">
                No ENS names yet. Claim your first one.
              </div>
            ) : (
              <div className="space-y-2">
                {ownedEnsAgents.map((agent) => (
                  <div key={agent.id} className="p-3 border-2 border-forest/20 bg-white flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-forest">{agent.ensSubdomain}.agenthaus.eth</div>
                      <div className="text-[10px] font-bold text-forest/60">Agent: {agent.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 px-2 border-2 border-forest/20 bg-white hover:bg-forest/5 text-forest text-[10px] font-black uppercase flex items-center gap-1"
                        onClick={() => {
                          navigator.clipboard.writeText(`${agent.ensSubdomain}.agenthaus.eth`);
                          toast.success("ENS name copied");
                        }}
                        title="Copy ENS name"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                      <Link
                        href={`/dashboard/agents/${agent.id}`}
                        className="h-8 px-2 border-2 border-forest/20 bg-white hover:bg-forest/5 text-forest text-[10px] font-black uppercase flex items-center gap-1"
                        title="Open agent"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open
                      </Link>
                      <button
                        type="button"
                        className="h-8 px-2 border-2 border-forest bg-forest text-white hover:bg-forest/90 text-[10px] font-black uppercase flex items-center gap-1"
                        onClick={() => {
                          setSelectedAgentId(agent.id);
                          setShowBuyModal(true);
                        }}
                        title="Re-tag this agent"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Re-tag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => { setView("buy"); setShowBuyModal(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Buy New Haus Name
              </Button>
              <Button variant="outline" className="border-2 border-forest" onClick={() => setView("import")}>
                <Download className="w-4 h-4 mr-2" />
                Import Agent
              </Button>
              <Link href="/dashboard/ens/debug" className="inline-flex">
                <Button variant="outline" className="border-2 border-forest">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Debug
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Modal open={showBuyModal} onClose={() => setShowBuyModal(false)} className="max-w-3xl">
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-forest">
                Buy Haus Name {isX402 && <span className="text-xs bg-forest text-white px-2 py-0.5 ml-2">x402 Gasless</span>}
              </h2>
              <p className="text-xs font-bold uppercase text-forest/60 mt-1">
                {isX402 ? "Secure a haus name without paying gas fees." : "Secure a human-readable ENS subdomain for your agent on Celo."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-forest">Select Agent</label>
                <button
                  onClick={() => { setShowBuyModal(false); setView("import"); }}
                  className="text-[10px] font-black uppercase text-accent underline underline-offset-2 hover:no-underline"
                >
                  + Import agent
                </button>
              </div>
              <select
                className="w-full p-3 h-12 rounded-none border-2 border-forest bg-white text-forest font-bold focus:outline-none focus:ring-2 focus:ring-forest/20"
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                    {agent.agentWalletAddress ? ` — ${agent.agentWalletAddress.slice(0, 8)}…` : ""}
                    {agent.ensSubdomain ? " (Re-tag)" : " (Unclaimed)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-forest">Choose Haus Name</label>
              <div className="flex items-center gap-0 border-2 border-forest overflow-hidden">
                <Input
                  placeholder="agent-name"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="h-12 text-lg font-mono border-0 rounded-none focus-visible:ring-0 flex-1"
                />
                <span className="text-sm font-black text-white bg-forest px-3 py-3 whitespace-nowrap">.agenthaus.eth</span>
              </div>
              <p className="text-[10px] font-bold uppercase text-forest/50">
                3-20 chars. Letters, numbers, hyphens only.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase text-forest border-b-2 border-forest pb-1 block">
                Payment Method & Pricing
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod("onchain")}
                  disabled={!isOnchainCeloSupported}
                  className={`p-4 border-2 flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "onchain"
                      ? "border-forest bg-forest text-white shadow-hard"
                      : "border-forest/20 bg-white text-forest/40 hover:border-forest/40"
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase">On-chain (Celo)</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("x402")}
                  className={`p-4 border-2 flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "x402"
                      ? "border-forest bg-forest text-white shadow-hard"
                      : "border-forest/20 bg-white text-forest/40 hover:border-forest/40"
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase">x402 Gasless</span>
                </button>
              </div>

              {paymentMethod === "onchain" && (
                <div className="space-y-3 pt-2">
                  {supportedTokens.length === 0 ? (
                    <div className="p-3 border-2 border-red-200 bg-red-50 text-[10px] font-bold text-red-700">
                      No payment tokens are configured in registrar yet. Admin should call addSupportedToken first.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {supportedTokens.map((token) => {
                        const isSelected = paymentToken?.address.toLowerCase() === token.address.toLowerCase();

                        return (
                          <button
                            key={token.symbol}
                            onClick={() => setPaymentToken(token)}
                            className={`flex flex-col items-center p-3 border-2 transition-all font-bold ${
                              isSelected
                                ? "bg-forest border-forest text-white shadow-hard"
                                : "bg-white border-forest/20 text-forest hover:border-forest"
                            }`}
                          >
                            <span className="text-sm">{token.symbol}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between p-4 border-2 border-forest bg-forest/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1">
                  <span className="text-[8px] font-black uppercase bg-forest text-white px-1.5 py-0.5">Permanent Ownership</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-forest/60">Estimated Registration Fee</div>
                  <div className="text-3xl font-black text-forest tracking-tighter">
                    {`${Number(uiPrice || "0").toFixed(2)} ${paymentMethod === "onchain" ? (paymentToken?.symbol || "TOKEN") : "USDC"}`}
                  </div>
                  {paymentMethod === "onchain" && (
                    <div className="text-[10px] font-bold text-forest/50">
                      {feeLoading ? "Fetching registrar fee..." : "Fee from on-chain registrar"}
                    </div>
                  )}
                  {paymentMethod === "onchain" && selectedTokenBalance && paymentToken && (
                    <div className="text-[10px] font-bold text-forest/70">
                      Balance: {Number(selectedTokenBalance.formatted).toFixed(4)} {paymentToken.symbol}
                    </div>
                  )}
                </div>
              </div>

              {paymentMethod === "onchain" && txError && (
                <div className="flex items-start gap-2 p-3 border-2 border-red-300 bg-red-50">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-red-800">
                    <span className="font-black">Transaction error:</span> {txError}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              {paymentMethod === "onchain" && paymentToken && selectedTokenBalance && Number(selectedTokenBalance.formatted) < numericUiPrice && (
                <div className="mb-3 p-2 bg-red-50 border-2 border-red-200 text-[10px] font-black uppercase text-red-500 text-center animate-pulse">
                  Insufficient {paymentToken.symbol} Balance
                </div>
              )}
              <Button
                onClick={handleBuy}
                disabled={
                  !subdomain ||
                  subdomain.length < 3 ||
                  subdomain.length > 20 ||
                  registering ||
                  !selectedAgentId ||
                  (paymentMethod === "onchain" && (!paymentToken || supportedTokens.length === 0)) ||
                  (paymentMethod === "onchain" && !!paymentToken && !!selectedTokenBalance && Number(selectedTokenBalance.formatted) < numericUiPrice)
                }
                className="w-full h-16 text-xl font-black uppercase tracking-widest"
              >
                {registering ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  `CLAIM ${subdomain || "NAME"}.AGENTHAUS.ETH`
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
