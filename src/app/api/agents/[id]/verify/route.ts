import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { encryptPrivateKey, generateKeyPair, signMessage, spkiToRawHex } from "@/lib/selfclaw/keys";

const DEFAULT_SELF_AGENT_API_BASE = "https://self-agent-id.vercel.app";

function resolveSelfAgentApiBase(raw: string | undefined): string {
  if (!raw) return DEFAULT_SELF_AGENT_API_BASE;

  // Be tolerant of malformed env lines where another key is accidentally
  // concatenated onto the URL (e.g. "...vercel.appSCAN_...").
  const match = raw.match(/https?:\/\/[^\s]+/i);
  if (!match) return DEFAULT_SELF_AGENT_API_BASE;

  let candidate = match[0].trim();
  const leakIdx = candidate.indexOf("SCAN_");
  if (leakIdx > 0) {
    candidate = candidate.slice(0, leakIdx);
  }
  candidate = candidate.replace(/\/+$/, "");

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return DEFAULT_SELF_AGENT_API_BASE;
    }
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(/\/+$/, "");
  } catch {
    return DEFAULT_SELF_AGENT_API_BASE;
  }
}

const SELF_AGENT_API_BASE = resolveSelfAgentApiBase(process.env.SELF_AGENT_API_BASE);
const DEFAULT_NETWORK =
  process.env.SELF_NETWORK === "testnet" ? "testnet" : "mainnet";

function resolveSelfAgentMode(raw: string | undefined): string {
  // Current upstream valid modes:
  // linked, wallet-free, ed25519, ed25519-linked, privy, smartwallet
  const mode = (raw || "").trim().toLowerCase();
  if (!mode) return "ed25519-linked";

  // Backward compatibility for old local env values.
  if (mode === "agent-identity") return "ed25519-linked";
  if (mode === "agent_identity") return "ed25519-linked";
  if (mode === "walletfree") return "wallet-free";

  const allowed = new Set([
    "linked",
    "wallet-free",
    "ed25519",
    "ed25519-linked",
    "privy",
    "smartwallet",
  ]);
  return allowed.has(mode) ? mode : "ed25519-linked";
}

const DEFAULT_MODE = resolveSelfAgentMode(process.env.SELF_AGENT_MODE);

type SelfStartResponse = {
  sessionId: string;
  sessionToken?: string;
  agentAddress?: string;
  qrUrl?: string;
  deepLink?: string;
  privateKeyHex?: string;
  expiresAt?: string;
  qrData?: Record<string, unknown>;
};

type SelfStatusResponse = {
  status: "pending" | "verified" | "expired";
  stage?: "qr-ready" | "proof-received" | "pending" | "completed" | "failed";
  agentId?: number;
  error?: string;
  message?: string;
};

function normalizeSelfStatus(raw: Record<string, unknown>): SelfStatusResponse {
  const status = typeof raw.status === "string" ? raw.status : undefined;
  const stage = typeof raw.stage === "string" ? raw.stage : undefined;
  const agentId = typeof raw.agentId === "number" ? raw.agentId : undefined;

  if (status === "verified") return { status: "verified", stage: "completed", agentId };
  if (status === "expired") return { status: "expired", stage: "failed", agentId };
  if (stage === "completed") return { status: "verified", stage, agentId };
  if (stage === "failed") {
    return {
      status: "expired",
      stage,
      agentId,
      error: typeof raw.error === "string" ? raw.error : undefined,
      message: typeof raw.message === "string" ? raw.message : undefined,
    };
  }

  return {
    status: "pending",
    stage: (stage as SelfStatusResponse["stage"]) || "pending",
    agentId,
  };
}

async function parseJson(res: Response, label: string): Promise<Record<string, unknown>> {
  const text = await res.text();
  try {
    return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    throw new Error(`${label} returned non-JSON response (status ${res.status})`);
  }
}

async function startSelfRegistration(
  agentName: string,
  mode: string,
  ed25519Pubkey?: string,
  ed25519Signature?: string,
  humanAddress?: string
): Promise<SelfStartResponse> {
  const payload: Record<string, unknown> = {
    mode,
    network: DEFAULT_NETWORK,
    disclosures: {
      minimumAge: 18,
      ofac: true,
    },
    agentName,
  };
  if (ed25519Pubkey) payload.ed25519Pubkey = ed25519Pubkey;
  if (ed25519Signature) payload.ed25519Signature = ed25519Signature;
  if (humanAddress) payload.humanAddress = humanAddress;

  const res = await fetch(`${SELF_AGENT_API_BASE}/api/agent/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await parseJson(res, "Self Agent ID register")) as Record<string, unknown> & {
    error?: string;
    message?: string;
  };

  if (!res.ok) {
    throw new Error(data.error || data.message || `Self Agent ID register failed (${res.status})`);
  }

  const sessionToken =
    typeof data.sessionToken === "string"
      ? data.sessionToken.replace(/\s+/g, "")
      : undefined;
  const qrData =
    data.qrData && typeof data.qrData === "object"
      ? (data.qrData as Record<string, unknown>)
      : undefined;
  const sessionIdFromQr =
    qrData && typeof qrData.sessionId === "string" ? qrData.sessionId : undefined;
  const sessionId =
    typeof data.sessionId === "string"
      ? data.sessionId
      : sessionIdFromQr;

  if (!sessionId && !sessionToken) {
    throw new Error("Self Agent ID register response is missing session identifiers");
  }

  return {
    sessionId: sessionId || sessionToken!,
    sessionToken,
    agentAddress: typeof data.agentAddress === "string" ? data.agentAddress : undefined,
    deepLink: typeof data.deepLink === "string" ? data.deepLink : undefined,
    expiresAt: typeof data.expiresAt === "string" ? data.expiresAt : undefined,
    qrData,
    qrUrl: sessionToken
      ? `${SELF_AGENT_API_BASE}/api/agent/register/qr?token=${encodeURIComponent(sessionToken)}`
      : undefined,
  };
}

async function checkSelfStatus(sessionTokenOrSessionId: string): Promise<SelfStatusResponse> {
  const token = sessionTokenOrSessionId.replace(/\s+/g, "");

  const primaryRes = await fetch(`${SELF_AGENT_API_BASE}/api/agent/register/status`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const primaryRaw = (await parseJson(primaryRes, "Self Agent ID status")) as Record<string, unknown> & {
    error?: string;
    message?: string;
  };
  const primaryData = normalizeSelfStatus(primaryRaw);

  if (primaryRes.ok) {
    return primaryData;
  }

  const fallbackUrl = `${SELF_AGENT_API_BASE}/api/agent/register/status?token=${encodeURIComponent(token)}`;
  const fallbackRes = await fetch(fallbackUrl, { method: "GET" });
  const fallbackRaw = (await parseJson(fallbackRes, "Self Agent ID status")) as Record<string, unknown> & {
    error?: string;
    message?: string;
  };
  const fallbackData = normalizeSelfStatus(fallbackRaw);

  if (!fallbackRes.ok) {
    throw new Error(
      fallbackData.error ||
      fallbackData.message ||
      (typeof primaryRaw.error === "string" ? primaryRaw.error : undefined) ||
      (typeof primaryRaw.message === "string" ? primaryRaw.message : undefined) ||
      `Self Agent ID status failed (${fallbackRes.status})`
    );
  }

  return fallbackData;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  try {
    const verification = await prisma.agentVerification.findUnique({
      where: { agentId },
      select: {
        status: true,
        publicKey: true,
        humanId: true,
        agentKeyHash: true,
        swarmUrl: true,
        selfxyzVerified: true,
        verifiedAt: true,
        createdAt: true,
        sessionId: true,
        challenge: true,
        selfAppConfig: true,
      },
    });

    if (!verification) {
      return NextResponse.json({ status: "not_started", verified: false });
    }

    let challengeExpiresAt: number | null = null;
    if (verification.challenge) {
      try {
        const parsed = JSON.parse(verification.challenge) as { expiresAt?: string | number };
        if (typeof parsed.expiresAt === "number") challengeExpiresAt = parsed.expiresAt;
        if (typeof parsed.expiresAt === "string") {
          const ms = Date.parse(parsed.expiresAt);
          challengeExpiresAt = Number.isNaN(ms) ? null : ms;
        }
      } catch {
        challengeExpiresAt = null;
      }
    }

    return NextResponse.json({
      status: verification.status,
      verified: verification.selfxyzVerified,
      publicKey: verification.publicKey,
      humanId: verification.humanId,
      agentKeyHash: verification.agentKeyHash,
      swarmUrl: verification.swarmUrl,
      verifiedAt: verification.verifiedAt,
      selfAppConfig: verification.selfAppConfig
        ? JSON.parse(verification.selfAppConfig)
        : null,
      hasSession: !!verification.sessionId,
      sessionId: verification.sessionId,
      challengeExpiresAt,
      createdAt: verification.createdAt,
    });
  } catch (error) {
    console.error("Failed to get verification status:", error);
    return NextResponse.json(
      { error: "Failed to get verification status" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  try {
    const body = await request.json();
    const action = String(body?.action || "");
    const connectedWalletAddress =
      typeof body?.connectedWalletAddress === "string"
        ? body.connectedWalletAddress.trim()
        : undefined;
    const requestedMode =
      typeof body?.mode === "string" ? body.mode.trim() : undefined;
    const agentWalletAddressFromClient =
      typeof body?.agentWalletAddress === "string"
        ? body.agentWalletAddress.trim()
        : undefined;

    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      select: {
        id: true,
        name: true,
        agentWalletAddress: true,
        owner: { select: { walletAddress: true } },
      },
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    switch (action) {
      case "start":
        return handleStart(
          agent,
          connectedWalletAddress,
          agentWalletAddressFromClient,
          requestedMode
        );
      case "sign":
        return handleSign(agent.id);
      case "check":
        return handleCheck(agent.id);
      case "restart":
        return handleRestart(
          agent,
          connectedWalletAddress,
          agentWalletAddressFromClient,
          requestedMode
        );
      case "sync":
        return handleSync(agent.id);
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "start", "sign", "check", "restart", or "sync".' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 }
    );
  }
}

async function handleStart(
  agent: {
    id: string;
    name: string;
    agentWalletAddress: string | null;
    owner: { walletAddress: string };
  },
  connectedWalletAddress?: string,
  agentWalletAddressFromClient?: string,
  requestedMode?: string
) {
  const existing = await prisma.agentVerification.findUnique({ where: { agentId: agent.id } });

  if (existing?.selfxyzVerified) {
    return NextResponse.json({
      status: "already_verified",
      verified: true,
      humanId: existing.humanId,
      verifiedAt: existing.verifiedAt,
    });
  }

  try {
    const isEvmAddress = (value?: string | null) => !!value && /^0x[a-fA-F0-9]{40}$/.test(value);
    const humanAddress = isEvmAddress(agent.agentWalletAddress)
      ? agent.agentWalletAddress!
      : isEvmAddress(agentWalletAddressFromClient)
        ? agentWalletAddressFromClient
        : isEvmAddress(connectedWalletAddress)
          ? connectedWalletAddress
          : isEvmAddress(agent.owner.walletAddress)
            ? agent.owner.walletAddress
            : undefined;

    const requested = resolveSelfAgentMode(requestedMode);
    const isRequestedExplicit = !!requestedMode?.trim();

    // Temporary policy: use linked mode for stability.
    // If explicitly requested, allow that mode; otherwise default to linked.
    const modeCandidates = isRequestedExplicit ? [requested] : ["linked"];

    let start: SelfStartResponse | null = null;
    let mode = modeCandidates[0];
    let generated: { publicKey: string; privateKeyHex: string } | null = null;
    let lastError: unknown = null;

    for (const candidate of modeCandidates) {
      mode = candidate;
      try {
        const requiresEd25519 = candidate === "ed25519" || candidate === "ed25519-linked";
        generated = requiresEd25519 ? await generateKeyPair() : null;
        const ed25519Pubkey = generated ? spkiToRawHex(generated.publicKey) : undefined;

        // Upstream now expects a 64-byte hex signature for ed25519 modes.
        // Sign a deterministic payload tied to this request; if upstream expects
        // a different canonical payload it will fail and we fall back to linked.
        const ed25519Signature =
          generated && humanAddress
            ? await signMessage(`link:${humanAddress.toLowerCase()}:${agent.name}`, generated.privateKeyHex)
            : undefined;

        start = await startSelfRegistration(
          agent.name,
          candidate,
          ed25519Pubkey,
          ed25519Signature,
          humanAddress
        );
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!start) {
      throw (lastError instanceof Error
        ? lastError
        : new Error("Failed to start verification with available modes"));
    }

    const expiresAtMs = start.expiresAt ? Date.parse(start.expiresAt) : null;

    const selfAppConfig = {
      provider: "self-agent-id",
      qrUrl: start.qrUrl || null,
      deepLink: start.deepLink || null,
      qrData: start.qrData || null,
      expiresAt: start.expiresAt || null,
    };

    await prisma.agentVerification.upsert({
      where: { agentId: agent.id },
      create: {
        agentId: agent.id,
        publicKey: generated?.publicKey || start.agentAddress || `self-agent:${agent.id}`,
        encryptedPrivateKey: encryptPrivateKey(generated?.privateKeyHex || start.privateKeyHex || "0".repeat(64)),
        status: "pending",
        sessionId: start.sessionId,
        challenge: JSON.stringify({
          expiresAt: start.expiresAt || null,
          sessionToken: start.sessionToken || null,
        }),
        agentName: agent.name,
        selfAppConfig: JSON.stringify(selfAppConfig),
        selfxyzVerified: false,
      },
      update: {
        publicKey: generated?.publicKey || start.agentAddress || existing?.publicKey || `self-agent:${agent.id}`,
        encryptedPrivateKey: generated?.privateKeyHex
          ? encryptPrivateKey(generated.privateKeyHex)
          : start.privateKeyHex
            ? encryptPrivateKey(start.privateKeyHex)
            : existing?.encryptedPrivateKey || encryptPrivateKey("0".repeat(64)),
        status: "pending",
        sessionId: start.sessionId,
        challenge: JSON.stringify({
          expiresAt: start.expiresAt || null,
          sessionToken: start.sessionToken || null,
        }),
        agentName: agent.name,
        selfAppConfig: JSON.stringify(selfAppConfig),
        selfxyzVerified: false,
        humanId: null,
        verifiedAt: null,
      },
    });

    return NextResponse.json({
      status: "pending",
      verified: false,
      sessionId: start.sessionId,
      signatureRequired: false,
      selfAppConfig,
      challengeExpiresAt: expiresAtMs,
      message: "Verification started. Next step: call with action 'sign'.",
      modeUsed: mode,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to start verification";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

async function handleSign(agentId: string) {
  const verification = await prisma.agentVerification.findUnique({ where: { agentId } });

  if (!verification) {
    return NextResponse.json(
      { error: "No verification session. Start verification first." },
      { status: 400 }
    );
  }

  if (verification.selfxyzVerified) {
    return NextResponse.json({ status: "already_verified", verified: true });
  }

  await prisma.agentVerification.update({
    where: { agentId },
    data: { status: "qr_ready" },
  });

  return NextResponse.json({
    status: "qr_ready",
    verified: false,
    sessionId: verification.sessionId,
    selfAppConfig: verification.selfAppConfig
      ? JSON.parse(verification.selfAppConfig)
      : null,
    message: "QR ready. Scan with the Self app to complete verification.",
  });
}

async function handleCheck(agentId: string) {
  const verification = await prisma.agentVerification.findUnique({ where: { agentId } });

  if (!verification) {
    return NextResponse.json({ status: "not_started", verified: false });
  }

  if (verification.selfxyzVerified) {
    return NextResponse.json({
      status: "verified",
      verified: true,
      humanId: verification.humanId,
      verifiedAt: verification.verifiedAt,
    });
  }

  if (!verification.sessionId) {
    return NextResponse.json({
      status: verification.status,
      verified: false,
      message: "No active verification session. Restart verification.",
    });
  }

  try {
    let sessionToken: string | undefined;
    if (verification.challenge) {
      try {
        const parsed = JSON.parse(verification.challenge) as { sessionToken?: string };
        sessionToken = typeof parsed.sessionToken === "string" ? parsed.sessionToken : undefined;
      } catch {
        sessionToken = undefined;
      }
    }

    const status = await checkSelfStatus(sessionToken || verification.sessionId);

    if (status.status === "verified") {
      await prisma.agentVerification.update({
        where: { agentId },
        data: {
          status: "verified",
          selfxyzVerified: true,
          humanId: status.agentId ? String(status.agentId) : null,
          verifiedAt: new Date(),
        },
      });

      await prisma.activityLog.create({
        data: {
          agentId,
          type: "action",
          message: `✅ Agent verified via Self Agent ID (agentId: ${status.agentId ?? "unknown"})`,
          metadata: JSON.stringify({ agentId: status.agentId ?? null }),
        },
      });

      return NextResponse.json({
        status: "verified",
        verified: true,
        humanId: status.agentId ? String(status.agentId) : null,
        verifiedAt: new Date().toISOString(),
      });
    }

    if (status.status === "expired") {
      await prisma.agentVerification.update({
        where: { agentId },
        data: { status: "expired" },
      });
      return NextResponse.json({
        status: "expired",
        verified: false,
        message: "Verification session expired. Please restart.",
      });
    }

    return NextResponse.json({
      status: verification.status === "pending" ? "qr_ready" : verification.status,
      verified: false,
      selfAppConfig: verification.selfAppConfig
        ? JSON.parse(verification.selfAppConfig)
        : null,
      sessionId: verification.sessionId,
      message: "Waiting for verification to complete...",
    });
  } catch (err) {
    console.warn("[Self Agent ID] status check failed:", err);
    return NextResponse.json({
      status: verification.status,
      verified: false,
      selfAppConfig: verification.selfAppConfig
        ? JSON.parse(verification.selfAppConfig)
        : null,
      sessionId: verification.sessionId,
      message: "Could not reach Self Agent ID. Please try again.",
    });
  }
}

async function handleRestart(
  agent: {
    id: string;
    name: string;
    agentWalletAddress: string | null;
    owner: { walletAddress: string };
  },
  connectedWalletAddress?: string,
  agentWalletAddressFromClient?: string,
  requestedMode?: string
) {
  await prisma.agentVerification.deleteMany({ where: { agentId: agent.id } });
  return handleStart(
    agent,
    connectedWalletAddress,
    agentWalletAddressFromClient,
    requestedMode
  );
}

async function handleSync(agentId: string) {
  return handleCheck(agentId);
}
