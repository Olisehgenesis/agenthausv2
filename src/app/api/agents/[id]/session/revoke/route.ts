import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revokeSessionPermission } from "@/lib/blockchain/session-keys";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(_req.url);
  const ownerAddress = searchParams.get("ownerAddress") || _req.headers.get("x-owner-address");

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

  const existing = await prisma.agent.findUnique({
    where: { id },
    select: { sessionKeyAddress: true, sessionContext: true },
  });

  if (!existing?.sessionKeyAddress) {
    return NextResponse.json({ error: "No active session to revoke" }, { status: 400 });
  }

  await revokeSessionPermission(id);

  return NextResponse.json({
    success: true,
    message: "Session revoked. Agent wallet reverted to dedicated HD wallet.",
  });
}

export async function GET(
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

  const agent = await prisma.agent.findUnique({
    where: { id },
    select: {
      ownerId: true,
      sessionKeyAddress: true,
      sessionContext: true,
      sessionExpiresAt: true,
      sessionPermissions: true,
    },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
  if (agent.ownerId !== user.id) {
    return NextResponse.json({ error: "Not your agent" }, { status: 403 });
  }

  if (!agent.sessionKeyAddress || !agent.sessionContext) {
    return NextResponse.json({ active: false, sessionKeyAddress: null, expiresAt: null });
  }

  const isExpired = agent.sessionExpiresAt ? new Date(agent.sessionExpiresAt) < new Date() : true;

  return NextResponse.json({
    active: !isExpired,
    sessionKeyAddress: agent.sessionKeyAddress,
    expiresAt: agent.sessionExpiresAt,
    permissions: agent.sessionPermissions ? JSON.parse(agent.sessionPermissions) : null,
    context: agent.sessionContext,
  });
}
