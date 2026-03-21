import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { saveSessionPermission } from "@/lib/blockchain/session-keys";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const ownerAddress = searchParams.get("ownerAddress") || req.headers.get("x-owner-address");

  if (!ownerAddress) {
    return NextResponse.json({ error: "Owner address required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { walletAddress: ownerAddress } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const agent = await prisma.agent.findUnique({ where: { id } });
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
  if (agent.ownerId !== user.id) {
    return NextResponse.json({ error: "Not your agent" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { setupToken, context }: { setupToken?: string; context?: string } = body;

  if (!context) {
    return NextResponse.json({ error: "ERC-7715 context is required" }, { status: 400 });
  }

  let sessionData: {
    agentId?: string;
    sessionKeyAddress: string;
    sessionKeyPrivateKeyHex: string;
    permissions: unknown[];
    expiresAt: Date;
  };

  if (setupToken) {
    try {
      sessionData = JSON.parse(Buffer.from(setupToken, "base64").toString("utf8"));
      if (sessionData.agentId && sessionData.agentId !== id) {
        return NextResponse.json({ error: "Setup token mismatch" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid setup token" }, { status: 400 });
    }
  } else {
    const existing = await prisma.agent.findUnique({
      where: { id },
      select: { sessionKeyAddress: true, sessionPermissions: true, sessionExpiresAt: true },
    });
    if (!existing?.sessionKeyAddress) {
      return NextResponse.json(
        { error: "No pending session. Call /session/request first." },
        { status: 400 }
      );
    }
    sessionData = {
      sessionKeyAddress: existing.sessionKeyAddress,
      sessionKeyPrivateKeyHex: "",
      permissions: existing.sessionPermissions ? JSON.parse(existing.sessionPermissions) : [],
      expiresAt: existing.sessionExpiresAt || new Date(),
    };
  }

  await saveSessionPermission(id, {
    sessionKeyAddress: sessionData.sessionKeyAddress,
    sessionKeyPrivateKeyHex: sessionData.sessionKeyPrivateKeyHex,
    permissions: sessionData.permissions as never,
    expiresAt: sessionData.expiresAt,
  }, context);

  return NextResponse.json({
    success: true,
    sessionKeyAddress: sessionData.sessionKeyAddress,
    expiresAt: sessionData.expiresAt,
    message: "Session permission saved. Agent can now operate autonomously within granted limits.",
  });
}
