import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSessionKey, type SessionPermission } from "@/lib/blockchain/session-keys";

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

  const agent = await prisma.agent.findUnique({
    where: { id },
    select: { ownerId: true, walletType: true, spendingLimit: true },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  if (agent.ownerId !== user.id) {
    return NextResponse.json({ error: "Not your agent" }, { status: 403 });
  }

  if (agent.walletType !== "metamask_session" && agent.walletType !== "dedicated") {
    return NextResponse.json(
      { error: "Agent must use 'metamask_session' or 'dedicated' wallet type" },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const {
    permissions = [],
    durationDays = 30,
  }: {
    permissions?: SessionPermission[];
    durationDays?: number;
  } = body;

  if (!permissions || permissions.length === 0) {
    const spendingLimit = agent.spendingLimit || 100;
    permissions.push({
      token: "CELO",
      maxAmount: String(spendingLimit * 2),
      period: 86400,
      maxTransfers: 50,
    });
  }

  const { address, privateKeyHex } = generateSessionKey();
  const expiresAt = new Date(Date.now() + (durationDays || 30) * 24 * 60 * 60 * 1000);

  return NextResponse.json({
    sessionKeyAddress: address,
    permissions,
    expiresAt: expiresAt.toISOString(),
    durationDays,
    setupToken: Buffer.from(
      JSON.stringify({
        agentId: id,
        sessionKeyAddress: address,
        privateKeyHex,
        permissions,
        expiresAt: expiresAt.toISOString(),
      })
    ).toString("base64"),
  });
}
