"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCw, Wrench } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Agent = {
  id: string;
  name: string;
  agentWalletAddress: string;
  ensSubdomain?: string | null;
};

type DebugResponse = {
  name: string;
  chain: {
    active: boolean;
    owner: string;
    token: string;
    paidAmount: string;
    registeredAt: string;
  };
  latestEvent: {
    txHash: string | null;
    blockNumber: string | null;
    owner: string | null;
    registrant: string | null;
    token: string | null;
    fee: string | null;
  } | null;
  ownerIsBuyer: boolean;
  connectedWalletRecentNames: string[];
  db: {
    fullName: string;
    txHash: string | null;
    ownerAddress: string;
    agentId: string | null;
    agentWalletAddress: string | null;
    agentOwnerAddress: string | null;
  } | null;
  selectedAgent: {
    id: string;
    walletAddress: string;
    ownerAddress: string | null;
  } | null;
  canSyncForSelectedAgent: boolean;
};

const ENS_SUFFIX = ".agenthaus.eth";

function normalizeInputName(raw: string): string {
  const value = raw.toLowerCase().trim();
  if (!value) return "";
  return value.endsWith(ENS_SUFFIX) ? value.slice(0, -ENS_SUFFIX.length) : value;
}

export default function EnsDebugPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loadingAgents, setLoadingAgents] = React.useState(false);
  const [selectedAgentId, setSelectedAgentId] = React.useState("");
  const [name, setName] = React.useState("");

  const [loadingDebug, setLoadingDebug] = React.useState(false);
  const [syncing, setSyncing] = React.useState(false);
  const [debugData, setDebugData] = React.useState<DebugResponse | null>(null);

  React.useEffect(() => {
    if (!address) return;

    setLoadingAgents(true);
    fetch(`/api/agents?ownerAddress=${address}`)
      .then((res) => res.json())
      .then((data) => {
        const list = (data.agents || []) as Agent[];
        setAgents(list);
        if (list.length > 0) {
          setSelectedAgentId((prev) => prev || list[0].id);
        }
      })
      .finally(() => setLoadingAgents(false));
  }, [address]);

  const fetchDebugData = async () => {
    if (!address || !selectedAgentId || !name.trim()) {
      toast.error("Select an agent and name first");
      return;
    }

    setLoadingDebug(true);
    setDebugData(null);

    try {
      const cleanName = normalizeInputName(name);
      const res = await fetch(
        `/api/ens/debug-name?name=${encodeURIComponent(cleanName)}&ownerAddress=${encodeURIComponent(address)}&agentId=${encodeURIComponent(selectedAgentId)}`
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Debug query failed");
      }

      setDebugData(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch debug data");
    } finally {
      setLoadingDebug(false);
    }
  };

  const syncName = async () => {
    if (!address || !selectedAgentId || !name.trim()) {
      toast.error("Select an agent and name first");
      return;
    }

    setSyncing(true);

    try {
      const cleanName = normalizeInputName(name);
      const res = await fetch("/api/ens/register-reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          subdomain: cleanName,
          ownerAddress: address,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Sync failed");
      }

      toast.success(`Synced ${cleanName}.agenthaus.eth`);
      await fetchDebugData();
    } catch (error: any) {
      toast.error(error.message || "Failed to sync ENS name");
    } finally {
      setSyncing(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <Card className="w-full max-w-xl border-4 border-forest shadow-hard">
          <CardHeader>
            <CardTitle className="text-2xl font-black uppercase tracking-tighter">Connect Wallet</CardTitle>
            <CardDescription className="font-bold uppercase text-forest/60">
              Connect your wallet to inspect ENS buy state.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gypsum p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" className="mb-2" onClick={() => router.push("/dashboard/ens/buy")}> 
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to ENS Buy
        </Button>

        <Card className="border-4 border-forest shadow-hard bg-white overflow-hidden">
          <div className="h-2 bg-forest" />
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 bg-forest/10 border-2 border-forest">
                <Wrench className="w-5 h-5 text-forest" />
              </div>
              <CardTitle className="text-2xl font-black uppercase tracking-tighter text-forest">ENS Buy Debug</CardTitle>
            </div>
            <CardDescription className="font-bold uppercase text-forest/60">
              Check chain state, verify buyer, and sync DB to contract state.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-forest">Select Agent</label>
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                disabled={loadingAgents}
                className="mt-1 w-full h-11 px-3 border-2 border-forest bg-white font-bold"
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.agentWalletAddress.slice(0, 8)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-forest">Haus Name</label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="hauschild"
                  className="font-bold uppercase"
                />
                <span className="text-sm font-black text-white bg-forest px-3 py-2 whitespace-nowrap">.agenthaus.eth</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={fetchDebugData} disabled={loadingDebug || syncing} className="font-black uppercase tracking-tight">
                {loadingDebug ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Query State
              </Button>
              <Button
                variant="secondary"
                onClick={syncName}
                disabled={syncing || loadingDebug}
                className="font-black uppercase tracking-tight"
              >
                {syncing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Sync From Chain
              </Button>
            </div>
          </CardContent>
        </Card>

        {debugData && (
          <Card className="border-4 border-forest shadow-hard bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-black uppercase tracking-tighter text-forest">Debug Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm font-semibold text-forest">
              <div>Chain active: {debugData.chain.active ? "YES" : "NO"}</div>
              <div>Chain owner: {debugData.chain.owner}</div>
              <div>Latest buyer (registrant): {debugData.latestEvent?.registrant || "-"}</div>
              <div>Connected wallet is buyer: {debugData.ownerIsBuyer ? "YES" : "NO"}</div>
              <div>
                Connected wallet names on-chain: {debugData.connectedWalletRecentNames.length > 0 ? "" : "NONE FOUND"}
                {debugData.connectedWalletRecentNames.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {debugData.connectedWalletRecentNames.map((n) => (
                      <span key={n} className="text-[10px] font-black uppercase px-2 py-1 border-2 border-forest/30 bg-gypsum">
                        {n}.agenthaus.eth
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>DB has record: {debugData.db ? "YES" : "NO"}</div>
              <div>Can sync for selected agent: {debugData.canSyncForSelectedAgent ? "YES" : "NO"}</div>
              <div>Latest tx: {debugData.latestEvent?.txHash || debugData.db?.txHash || "-"}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}