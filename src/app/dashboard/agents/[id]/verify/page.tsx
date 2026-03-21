"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount, useSwitchChain } from "wagmi";
import { type Address } from "viem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StableSelfQR, SessionCountdown } from "../_components/SelfQR";
import type { SelfApp } from "@selfxyz/qrcode";
import type { AgentData, VerificationStatus } from "../_types";
import {
  ArrowLeft,
  BadgeCheck,
  ExternalLink,
  Loader2,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Copy,
  Wallet,
  XCircle,
} from "lucide-react";

const CELO_MAINNET_CHAIN_ID = 42220;

export default function AgentVerifyPage() {
  const params = useParams();
  const agentId = params.id as string | undefined;
  const { address: userAddress, chainId: connectedChainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const [agent, setAgent] = React.useState<AgentData | null>(null);
  const [agentLoading, setAgentLoading] = React.useState(true);

  const [verificationStatus, setVerificationStatus] = React.useState<VerificationStatus | null>(null);
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [verifyPolling, setVerifyPolling] = React.useState(false);
  const [qrSessionExpired, setQrSessionExpired] = React.useState(false);
  const [proofError, setProofError] = React.useState<string | null>(null);
  const [copyToast, setCopyToast] = React.useState<string | null>(null);

  const isCeloMainnet = connectedChainId === CELO_MAINNET_CHAIN_ID;

  const isSessionActive = React.useMemo(() => {
    if (!verificationStatus?.challengeExpiresAt) return false;
    return Date.now() < verificationStatus.challengeExpiresAt;
  }, [verificationStatus?.challengeExpiresAt]);

  React.useEffect(() => {
    if (!copyToast) return;
    const id = setTimeout(() => setCopyToast(null), 1200);
    return () => clearTimeout(id);
  }, [copyToast]);

  React.useEffect(() => {
    if (!agentId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/agents/${agentId}`);
        if (res.ok && !cancelled) {
          setAgent(await res.json());
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setAgentLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [agentId]);

  const fetchVerification = React.useCallback(async () => {
    if (!agentId) return;
    try {
      const res = await fetch(`/api/agents/${agentId}/verify`);
      if (res.ok) {
        const data = await res.json();
        setVerificationStatus((prev) => {
          if (prev?.selfAppConfig && prev?.sessionId && !data.verified) {
            return { ...prev, status: data.status, verified: data.verified, humanId: data.humanId };
          }
          return data;
        });
      }
    } catch {
      // ignore
    }
  }, [agentId]);

  React.useEffect(() => {
    fetchVerification();
  }, [fetchVerification]);

  React.useEffect(() => {
    if (!verifyPolling || !agentId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/agents/${agentId}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "check" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.verified) {
            setVerificationStatus((prev) => ({
              ...prev,
              ...data,
              selfAppConfig: prev?.selfAppConfig || data.selfAppConfig,
            }));
            setVerifyPolling(false);
          }
        }
      } catch {
        // ignore
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [verifyPolling, agentId]);

  const handleStartVerification = React.useCallback(async () => {
    if (!agentId) return;
    setVerifyLoading(true);
    setQrSessionExpired(false);
    setProofError(null);

    try {
      const startRes = await fetch(`/api/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          agentWalletAddress: agent?.agentWalletAddress || undefined,
          connectedWalletAddress: userAddress || undefined,
        }),
      });
      const startData = await startRes.json();
      if (!startRes.ok) throw new Error(startData.error || "Failed to start verification");

      const signRes = await fetch(`/api/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sign" }),
      });
      const signData = await signRes.json();
      if (!signRes.ok) throw new Error(signData.error || "Failed to sign verification challenge");

      setVerificationStatus({
        ...startData,
        ...signData,
        selfAppConfig: signData.selfAppConfig || startData.selfAppConfig,
        sessionId: signData.sessionId || startData.sessionId,
        challengeExpiresAt: signData.challengeExpiresAt || startData.challengeExpiresAt,
      });
      setVerifyPolling(true);
    } catch (err) {
      setVerificationStatus({
        status: "failed",
        verified: false,
        message: err instanceof Error ? err.message : "Verification failed",
      });
    } finally {
      setVerifyLoading(false);
    }
  }, [agentId, agent?.agentWalletAddress, userAddress]);

  const handleRestartVerification = React.useCallback(async () => {
    if (!agentId) return;
    setVerifyLoading(true);
    setVerifyPolling(false);
    setQrSessionExpired(false);
    setProofError(null);

    try {
      const res = await fetch(`/api/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restart",
          agentWalletAddress: agent?.agentWalletAddress || undefined,
          connectedWalletAddress: userAddress || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to restart verification");

      const signRes = await fetch(`/api/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sign" }),
      });
      const signData = await signRes.json();

      setVerificationStatus({
        ...data,
        ...signData,
        selfAppConfig: signData.selfAppConfig || data.selfAppConfig,
        sessionId: signData.sessionId || data.sessionId,
        challengeExpiresAt: signData.challengeExpiresAt || data.challengeExpiresAt,
      });
      setVerifyPolling(true);
    } catch (err) {
      setVerificationStatus({
        status: "failed",
        verified: false,
        message: err instanceof Error ? err.message : "Failed to restart verification",
      });
    } finally {
      setVerifyLoading(false);
    }
  }, [agentId, agent?.agentWalletAddress, userAddress]);

  const handleSyncVerification = React.useCallback(async () => {
    if (!agentId) return;
    try {
      const res = await fetch(`/api/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.verified) {
          setVerificationStatus((prev) => (prev ? { ...prev, ...data, verified: true } : data));
        }
        await fetchVerification();
      }
    } catch {
      // ignore
    }
  }, [agentId, fetchVerification]);

  const handleQrSuccess = React.useCallback(async () => {
    setVerificationStatus((prev) => (prev ? { ...prev, status: "verified", verified: true } : null));
    setVerifyPolling(false);

    const maxRetries = 12;
    for (let i = 0; i < maxRetries; i++) {
      await new Promise((r) => setTimeout(r, i < 3 ? 2000 : 5000));
      try {
        const res = await fetch(`/api/agents/${agentId}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "check" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.verified) {
            setVerificationStatus((prev) => ({
              ...prev,
              ...data,
              selfAppConfig: prev?.selfAppConfig || data.selfAppConfig,
            }));
            return;
          }
        }
      } catch {
        // ignore
      }
    }
  }, [agentId]);

  const handleQrError = React.useCallback((err: unknown) => {
    const errObj = err as Record<string, unknown> | null;
    const status = errObj?.status as string | undefined;
    const reason = errObj?.reason as string | undefined;

    if (status === "proof_generation_failed") {
      setProofError(
        reason && reason !== "error"
          ? `Proof generation failed: ${reason}`
          : "Proof generation failed on your device. Hold your passport flat against the phone's NFC reader for 5+ seconds and retry."
      );
      return;
    }

    setQrSessionExpired(true);
    setVerifyPolling(false);
  }, []);

  const copyToClipboard = React.useCallback(async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyToast(`${label} copied`);
    } catch {
      setCopyToast("Copy failed");
    }
  }, []);

  if (agentLoading) {
    return (
      <div className="min-h-screen bg-gypsum flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-forest" />
      </div>
    );
  }

  if (!agent || !agentId) {
    return (
      <div className="min-h-screen bg-gypsum flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-forest/10 rounded-2xl p-6 text-center space-y-3">
          <h1 className="text-xl font-bold text-forest">Agent not found</h1>
          <p className="text-sm text-forest-muted">The verify page could not load this agent.</p>
          <Link href="/dashboard/agents">
            <Button variant="outline">Back to Agents</Button>
          </Link>
        </div>
      </div>
    );
  }

  const canShowQr =
    verificationStatus != null &&
    !verificationStatus.verified &&
    ["qr_ready", "challenge_signed", "pending"].includes(verificationStatus.status) &&
    !!verificationStatus.selfAppConfig;

  const rawCfg = verificationStatus?.selfAppConfig as Record<string, unknown> | undefined;
  const qrDataCfg =
    rawCfg?.qrData && typeof rawCfg.qrData === "object"
      ? (rawCfg.qrData as Record<string, unknown>)
      : null;
  const qrUrl = typeof rawCfg?.qrUrl === "string" ? rawCfg.qrUrl : null;
  const deepLink = typeof rawCfg?.deepLink === "string" ? rawCfg.deepLink : null;
  const selfAppForQr = (qrDataCfg || rawCfg) as unknown as SelfApp;
  const canUseSdkQr = !!selfAppForQr && (qrDataCfg != null || !qrUrl);

  return (
    <div className="min-h-screen bg-gypsum">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/dashboard/agents/${agent.id}`}>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back to Agent
            </Button>
          </Link>
          <Badge className="bg-forest/10 text-forest border-forest/20">Self Verification</Badge>
        </div>

        <div className="bg-white border border-forest/10 rounded-2xl p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-forest">Verify {agent.name}</h1>
              <p className="text-sm text-forest-muted">Use Self.xyz + Self Agent ID on Celo to prove this agent is backed by a real human.</p>
            </div>
            {verificationStatus?.verified ? (
              <Badge className="bg-forest/20 text-forest-light border-forest/30 gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5" /> Verified
              </Badge>
            ) : isCeloMainnet ? (
              <Badge className="bg-forest/10 text-forest-light/80 border-forest/20">Celo Mainnet ✓</Badge>
            ) : (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Wrong network</Badge>
            )}
          </div>

          {!verificationStatus?.verified && (!isConnected || !isCeloMainnet) && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-300">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">Celo Mainnet is required for verification.</p>
              </div>
              <p className="text-xs text-forest-muted">
                {!isConnected
                  ? "Connect your wallet first."
                  : `You are currently on chain ${connectedChainId}. Switch to chain ${CELO_MAINNET_CHAIN_ID}.`}
              </p>
              {!isConnected ? (
                <div className="text-xs text-forest-muted inline-flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />
                  Use the wallet button in the app header.
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => switchChain({ chainId: CELO_MAINNET_CHAIN_ID })}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Switch to Celo
                </Button>
              )}
            </div>
          )}

          {verificationStatus?.verified && (
            <div className="rounded-xl border border-forest/20 bg-forest/5 p-4 space-y-3">
              <p className="text-sm text-forest">Verification complete. This agent is now linked to a real human identity.</p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                {verificationStatus.humanId && <InfoRow label="Human ID" value={`${verificationStatus.humanId.slice(0, 18)}...`} />}
                {verificationStatus.verifiedAt && <InfoRow label="Verified At" value={new Date(verificationStatus.verifiedAt).toLocaleString()} />}
              </div>
              {verificationStatus.publicKey && (
                <CopyRow
                  label="Public Key"
                  value={verificationStatus.publicKey}
                  onCopy={() => copyToClipboard(verificationStatus.publicKey as string, "Public key")}
                />
              )}
              {verificationStatus.swarmUrl && (
                <a href={verificationStatus.swarmUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent-light inline-flex items-center gap-1.5">
                  View linked agents <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {!verificationStatus?.verified && isConnected && isCeloMainnet && (!verificationStatus || verificationStatus.status === "not_started") && (
            <div className="rounded-xl border border-forest/15 bg-gypsum/50 p-4 text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-accent mx-auto" />
              <p className="text-sm text-forest">Start verification to generate your Self QR challenge.</p>
              <Button variant="glow" onClick={handleStartVerification} disabled={verifyLoading}>
                {verifyLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                {verifyLoading ? "Starting..." : "Start Verification"}
              </Button>
            </div>
          )}

          {!verificationStatus?.verified && verificationStatus?.status === "failed" && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center space-y-2">
              <XCircle className="w-7 h-7 text-red-400 mx-auto" />
              <p className="text-sm text-red-300">{verificationStatus.message || "Verification failed"}</p>
              <Button variant="outline" size="sm" onClick={handleRestartVerification} disabled={verifyLoading}>
                {verifyLoading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5 mr-1.5" />}
                Try Again
              </Button>
            </div>
          )}

          {!verificationStatus?.verified && canShowQr && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h2 className="text-base font-semibold text-forest">Scan with Self App</h2>
                <p className="text-xs text-forest-muted">Open Self app, scan this QR, then tap your NFC passport.</p>
              </div>

              <div className="flex justify-center">
                {canUseSdkQr ? (
                  <div className="rounded-2xl overflow-hidden bg-white border border-forest/10 p-1">
                    <StableSelfQR
                      key={verificationStatus.sessionId || "qr"}
                      sessionId={verificationStatus.sessionId || "qr"}
                      selfApp={selfAppForQr}
                      onSuccess={handleQrSuccess}
                      onError={handleQrError}
                    />
                  </div>
                ) : qrUrl ? (
                  <img src={qrUrl} alt="Self verification QR" className="w-[280px] h-[280px] rounded-xl border border-forest/10 bg-white p-1" />
                ) : (
                  <div className="w-[280px] h-[280px] rounded-xl border border-forest/10 bg-white flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                  </div>
                )}
              </div>

              {deepLink && (
                <div className="text-center">
                  <a href={deepLink} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent-light">
                    Open Self app on mobile
                  </a>
                </div>
              )}

              {(verificationStatus.challengeExpiresAt || qrSessionExpired) && (
                <div className="text-center space-y-1">
                  {verificationStatus.challengeExpiresAt && (
                    <SessionCountdown expiresAt={verificationStatus.challengeExpiresAt} onExpired={() => setQrSessionExpired(true)} />
                  )}
                  {qrSessionExpired && (
                    <p className="text-xs text-amber-300">Session expired. Generate a new QR challenge.</p>
                  )}
                </div>
              )}

              {proofError && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-300 text-center">
                  {proofError}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRestartVerification} disabled={verifyLoading}>
                  {verifyLoading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5 mr-1.5" />}
                  New QR
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSyncVerification}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Re-check from Self
                </Button>
              </div>

              <div className="rounded-xl border border-forest/10 bg-gypsum/40 p-3 space-y-2">
                <p className="text-[11px] text-forest-muted">Fallback: verify on SelfClaw website</p>
                {verificationStatus.publicKey && (
                  <CopyRow
                    label="Agent Public Key"
                    value={verificationStatus.publicKey}
                    onCopy={() => copyToClipboard(verificationStatus.publicKey as string, "Public key")}
                  />
                )}
                <CopyRow
                  label="Agent Name"
                  value={agent.name}
                  onCopy={() => copyToClipboard(agent.name, "Agent name")}
                />
                {agent.erc8004AgentId && (
                  <CopyRow
                    label="Agent ID"
                    value={agent.erc8004AgentId}
                    onCopy={() => copyToClipboard(agent.erc8004AgentId as string, "Agent ID")}
                  />
                )}
                <a
                  href="https://selfclaw.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-light"
                >
                  Verify on SelfClaw website <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {copyToast && (
          <div className="fixed bottom-4 right-4 rounded-md bg-forest text-white text-xs px-3 py-2 shadow-lg">
            {copyToast}
          </div>
        )}

        <div className="text-center text-xs text-forest-muted">
          Prefer the modal flow? Open <Link href={`/dashboard/agents/${agent.id}`} className="text-accent hover:text-accent-light">agent admin</Link> and tap Verify.
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-forest/10 bg-white p-2">
      <div className="text-[10px] text-forest-muted/70 uppercase tracking-wide">{label}</div>
      <div className="text-xs text-forest break-all">{value}</div>
    </div>
  );
}

function CopyRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="rounded-lg border border-forest/10 bg-white p-2 flex items-center gap-2">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-forest-muted/70 uppercase tracking-wide">{label}</div>
        <div className="text-xs text-forest break-all font-mono">{value}</div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="h-7 w-7 rounded-md hover:bg-gypsum flex items-center justify-center text-forest-muted hover:text-forest"
        title={`Copy ${label.toLowerCase()}`}
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
