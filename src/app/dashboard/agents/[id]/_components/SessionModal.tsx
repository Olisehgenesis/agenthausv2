"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, AlertCircle, Check, ExternalLink, Loader2 } from "lucide-react";
import { formatAddress } from "@/lib/utils";
import { getBlockExplorer } from "@/lib/constants";

interface SessionModalProps {
  open: boolean;
  onClose: () => void;
  agentId: string;
  agentName: string;
  ownerAddress: string;
  chainId: number;
  existingSession?: {
    active: boolean;
    sessionKeyAddress: string | null;
    expiresAt: string | null;
    permissions: unknown[] | null;
  } | null;
  onRevokeSuccess?: () => void;
}

export function SessionModal({
  open,
  onClose,
  agentId,
  agentName,
  ownerAddress,
  chainId,
  existingSession,
  onRevokeSuccess,
}: SessionModalProps) {
  const [step, setStep] = useState<"info" | "config" | "waiting" | "done">(
    existingSession?.active ? "done" : "info"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupToken, setSetupToken] = useState<string | null>(null);
  const [sessionKeyAddress, setSessionKeyAddress] = useState<string | null>(
    existingSession?.sessionKeyAddress || null
  );
  const [permissions, setPermissions] = useState([
    { token: "CELO", maxAmount: "200", period: 86400, maxTransfers: 50 },
  ]);
  const [durationDays, setDurationDays] = useState(30);

  const explorer = getBlockExplorer(chainId);

  async function handleRequestSession() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/agents/${agentId}/session/request?ownerAddress=${ownerAddress}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ permissions, durationDays }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create session");
      setSetupToken(data.setupToken);
      setSessionKeyAddress(data.sessionKeyAddress);
      setStep("config");
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/agents/${agentId}/session/confirm?ownerAddress=${ownerAddress}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ setupToken }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to confirm session");
      setStep("done");
      onRevokeSuccess?.();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleRevoke() {
    if (!confirm("Revoke this session? The agent will revert to its dedicated HD wallet."))
      return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/agents/${agentId}/session/revoke?ownerAddress=${ownerAddress}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to revoke");
      setStep("info");
      setSetupToken(null);
      setSessionKeyAddress(null);
      onRevokeSuccess?.();
      onClose();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          ERC-7715 Session Key
        </h2>
      </div>

      {error && (
        <div className="mx-6 mb-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {step === "info" && (
        <div className="px-6 pb-6 space-y-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h3 className="text-sm font-black uppercase text-blue-900 mb-2">What is this?</h3>
            <p className="text-xs text-blue-800 leading-relaxed">
              An ERC-7715 session key lets <strong>{agentName}</strong> operate autonomously using your
              MetaMask wallet — without storing private keys in the database. Approve once, agent executes
              within your set limits.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-forest/60">How it works</h3>
            {[
              ["1", "Configure spending limits and duration"],
              ["2", "Approve once in MetaMask popup"],
              ["3", "Agent operates autonomously within limits"],
              ["4", "Revoke anytime from this panel"],
            ].map(([n, text]) => (
              <div key={n} className="flex items-center gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center text-xs font-black flex-shrink-0">
                  {n}
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <Button onClick={handleRequestSession} disabled={loading} className="w-full gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? "Creating session..." : "Set Up Session Key"}
          </Button>
        </div>
      )}

      {step === "config" && (
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black uppercase text-forest/60 block mb-1">Duration</label>
              <div className="flex gap-2">
                {[7, 14, 30, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDurationDays(d)}
                    className={`flex-1 py-2 text-xs font-black border-2 transition-colors ${
                      durationDays === d
                        ? "border-forest bg-forest text-white"
                        : "border-forest/30 hover:border-forest"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-forest/60 block mb-1">Permissions</label>
              <div className="space-y-2 border border-forest/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs font-black text-forest/40">
                  <span className="w-16">Token</span>
                  <span className="flex-1">Max Amount</span>
                  <span className="w-12 text-center">Per Day</span>
                </div>
                {permissions.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-16 font-mono bg-forest/10 px-2 py-1 rounded text-[10px]">
                      {p.token}
                    </span>
                    <input
                      type="text"
                      value={p.maxAmount}
                      onChange={(e) => {
                        const n = [...permissions];
                        n[i] = { ...n[i], maxAmount: e.target.value };
                        setPermissions(n);
                      }}
                      className="flex-1 border border-forest/30 rounded px-2 py-1 font-mono text-xs"
                    />
                    <span className="w-12 text-center text-forest/50 text-[10px]">daily</span>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setPermissions([...permissions, { token: "cUSD", maxAmount: "100", period: 86400, maxTransfers: 20 }])
                  }
                  className="text-xs text-forest underline"
                >
                  + Add token
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-800">
              Next: Click "Authorize in MetaMask" — a MetaMask popup will appear asking you to approve the
              session key.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep("info")} className="flex-1">
              Back
            </Button>
            <Button onClick={handleConfirm} disabled={loading} className="flex-1 gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Authorize in MetaMask
            </Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-black text-green-900">Session Active</p>
              <p className="text-xs text-green-700">
                {agentName} can now operate autonomously within your granted limits.
              </p>
            </div>
          </div>

          {sessionKeyAddress && (
            <div className="space-y-2">
              <div>
                <label className="text-xs font-black uppercase text-forest/60 block mb-1">
                  Session Key
                </label>
                <div className="flex items-center gap-2 p-2 border border-forest/20 rounded-lg">
                  <code className="text-xs font-mono flex-1">{formatAddress(sessionKeyAddress)}</code>
                  <a
                    href={`${explorer}/address/${sessionKeyAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {existingSession?.expiresAt && (
                <div className="flex items-center gap-2 text-xs text-forest/50">
                  <Clock className="w-3 h-3" />
                  Expires {new Date(existingSession.expiresAt).toLocaleDateString()}
                </div>
              )}
            </div>
          )}

          <Button
            variant="outline"
            onClick={handleRevoke}
            disabled={loading}
            className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Revoke Session
          </Button>
        </div>
      )}
    </Modal>
  );
}
