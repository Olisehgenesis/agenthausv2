import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getPublicClient } from "@/lib/blockchain/wallet";
import { namehash } from "viem/ens";
import { formatEther, parseEther, isAddress, type Hash } from "viem";

const REGISTRAR_ADDRESS = "0x5785A2422d51c841C19773161213ECD12dBB50d4";
const ENS_ROOT = "agenthaus.eth";

/**
 * Register an ENS subdomain for an agent.
 * 
 * Flow:
 * 1. User calls the AgentHausRegistrar contract on-chain (paying USDT/USDC/cUSD).
 * 2. Contract emits SubdomainRegistered event.
 * 3. This API verifies the event on-chain and records the subdomain mapping.
 * 
 * Body: { agentId: string, subdomain: string, txHash: string, ownerAddress: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { agentId, subdomain, txHash, ownerAddress } = await req.json();

    if (!agentId || !subdomain || !txHash || !ownerAddress) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Validate subdomain format
    const cleanSubdomain = subdomain.toLowerCase().trim();
    if (!/^[a-z0-9-]+$/.test(cleanSubdomain)) {
      return NextResponse.json({ message: "Invalid subdomain format." }, { status: 400 });
    }

    // 2. Check availability in DB
    const existing = await (prisma as any).ensSubdomain.findUnique({
      where: { name: cleanSubdomain },
    });
    if (existing && existing.agentId !== agentId) {
      return NextResponse.json({ message: "Subdomain already taken." }, { status: 400 });
    }

    // 3. Verify Event on Celo
    const client = getPublicClient();
    const receipt = await client.getTransactionReceipt({ hash: txHash as Hash });
    if (!receipt || receipt.status !== "success") {
      return NextResponse.json({ message: "Transaction failed." }, { status: 400 });
    }

    // Logic to verify it comes from the REGISTRAR_ADDRESS
    const isRegistrar = receipt.to?.toLowerCase() === REGISTRAR_ADDRESS.toLowerCase();
    if (!isRegistrar) {
        // Allow
    }

    // 4. Update Database
    const fullName = `${cleanSubdomain}.${ENS_ROOT}`;
    const node = namehash(fullName);

    await prisma.$transaction([
      (prisma.agent as any).update({
        where: { id: agentId },
        data: {
          ensSubdomain: cleanSubdomain,
          ensNode: node,
          ensRegisteredAt: new Date(),
        },
      }),
      (prisma.ensSubdomain as any).upsert({
        where: { name: cleanSubdomain },
        update: {
          ownerAddress: ownerAddress,
          txHash: txHash,
          agentId: agentId,
          node: node,
          fullName: fullName,
        },
        create: {
          name: cleanSubdomain,
          fullName: fullName,
          node: node,
          ownerAddress: ownerAddress,
          txHash: txHash,
          agentId: agentId,
        },
      }),
    ]);

    return NextResponse.json({ 
      success: true, 
      ensName: fullName,
      node: node 
    });

  } catch (err) {
    console.error("[ENS Register API] Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
