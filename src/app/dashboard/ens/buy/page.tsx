"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useSendTransaction, useBalance } from "wagmi";
import { parseEther, formatEther, type Address, encodeFunctionData } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Globe, CheckCircle, ArrowLeft, Wallet, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { FEE_TOKENS, prepareCeloTransaction } from "@/lib/transactions/fee-abstraction";

const REGISTRAR_ADDRESS = "0x5785A2422d51c841C19773161213ECD12dBB50d4";

// Registrar ABI (simplified for our needs)
const registrarAbi = [
  {
    name: "registerSubdomain",
    type: "function",
    inputs: [
      { name: "name", type: "string" },
      { name: "targetOwner", type: "address" },
      { name: "token", type: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "getTokenFee",
    type: "function",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ name: "fee", type: "uint256" }],
    stateMutability: "view",
  },
] as const;

export default function EnsBuyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialAgentId = searchParams.get("agentId");

  const { address, isConnected } = useAccount();
  const [agents, setAgents] = React.useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = React.useState(initialAgentId || "");
  const [subdomain, setSubdomain] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [registering, setRegistering] = React.useState(false);
  const [paymentToken, setPaymentToken] = React.useState<any>(FEE_TOKENS.USDT);

  const { sendTransactionAsync } = useSendTransaction();

  // Load user's agents
  React.useEffect(() => {
    if (!address) return;
    fetch(`/api/agents?ownerAddress=${address}`)
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.agents || []);
        if (!selectedAgentId && data.agents?.length > 0) {
          setSelectedAgentId(data.agents[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [address, selectedAgentId]);

  const handleBuy = async () => {
    if (!address || !selectedAgentId || !subdomain) return;

    setRegistering(true);
    try {
      const selectedAgent = agents.find((a) => a.id === selectedAgentId);
      if (!selectedAgent) throw new Error("Agent not found");

      // 1. Prepare Registrar transaction
      // For now, we assume 0.3 USDT/USDC fee
      const fee = paymentToken.decimals === 6 ? BigInt("300000") : parseEther("0.3");

      // 2. Wrap in fee abstraction
      const txData = encodeFunctionData({
        abi: registrarAbi,
        functionName: "registerSubdomain",
        args: [subdomain, selectedAgent.agentWalletAddress as Address, paymentToken.address as Address],
      });

      const txRequest = await prepareCeloTransaction(address, {
        to: REGISTRAR_ADDRESS,
        data: txData,
      });

      const hash = await sendTransactionAsync(txRequest as any);

      // 3. Register in our API
      const res = await fetch("/api/ens/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          subdomain: subdomain,
          txHash: hash,
          ownerAddress: address,
        }),
      });

      if (res.ok) {
        toast.success(`Registered ${subdomain}.agenthaus.eth!`);
        router.push(`/dashboard/agents/${selectedAgent.id}`);
      } else {
        const error = await res.json();
        toast.error(error.message || "Registration failed on backend, but transaction succeeded.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setRegistering(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <Wallet className="w-16 h-16 text-forest-faint mb-4" />
        <h2 className="text-xl font-bold text-forest mb-2">Connect Your Wallet</h2>
        <p className="text-forest-muted mb-6">Connect to buy a digital residency for your agents.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gypsum p-4 sm:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" className="mb-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-forest/10 shadow-xl overflow-hidden bg-white">
          <div className="h-2 bg-forest" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-forest/10 text-forest">
                <Globe className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold text-forest">Buy Digital Residency</CardTitle>
            </div>
            <CardDescription>
              Secure a human-readable ENS subdomain for your agent on Celo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Agent Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest">Select Agent</label>
              <select
                className="w-full p-3 rounded-xl border border-forest/20 bg-gypsum/50 text-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                disabled={loading}
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.ensSubdomain ? "Re-tag" : "Unclaimed"})
                  </option>
                ))}
              </select>
            </div>

            {/* Subdomain Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-forest">Choose Subdomain</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="agent-name"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="h-12 text-lg font-mono border-forest/20 focus:ring-forest/30"
                />
                <span className="text-lg font-mono text-forest-muted">.agenthaus.eth</span>
              </div>
              <p className="text-xs text-forest-muted">
                Minimum 3 characters. Use letters, numbers, and hyphens.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-forest">Select Payment Token</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[FEE_TOKENS.USDT, FEE_TOKENS.USDC, FEE_TOKENS.cUSD, FEE_TOKENS.CELO].map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setPaymentToken(token)}
                    className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                      paymentToken.symbol === token.symbol
                        ? "bg-forest border-forest text-white shadow-lg scale-105"
                        : "bg-white border-forest/10 text-forest hover:border-forest/30"
                    }`}
                  >
                    <span className="text-xs opacity-70 mb-1">{token.symbol === "CELO" ? "Native" : "Stable"}</span>
                    <span className="font-bold">{token.symbol}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 flex items-center justify-between">
                <span className="text-sm text-forest font-medium">Registration Fee</span>
                <span className="text-lg font-bold text-forest">0.3 {paymentToken.symbol}</span>
              </div>
            </div>

            {/* Gas Abstraction Notice */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-700">
                <span className="font-bold">Fee Abstraction Active:</span> We'll automatically use the best token for gas fees. 
                CELO balance is not strictly required if you have stablecoins.
              </p>
            </div>

            <Button
              className="w-full h-14 text-lg rounded-2xl shadow-xl hover:shadow-forest/20"
              variant="glow"
              disabled={!subdomain || registering || subdomain.length < 3}
              onClick={handleBuy}
            >
              {registering ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Securing Name...</>
              ) : (
                "Purchase Residency"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-forest/10">
            <h4 className="font-bold text-forest mb-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-forest" />
              On-Chain Identity
            </h4>
            <p className="text-xs text-forest-muted">
              Resolves to your agent's wallet address everywhere ENS is supported.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-forest/10">
            <h4 className="font-bold text-forest mb-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-forest" />
              Human Readable
            </h4>
            <p className="text-xs text-forest-muted">
              Replace long hex addresses with simple names in wallets and explorers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
