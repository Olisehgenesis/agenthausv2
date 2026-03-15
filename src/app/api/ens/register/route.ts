import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getPublicClient } from "@/lib/blockchain/wallet";
import { namehash } from "viem/ens";
import { formatEther, parseEther, isAddress, type Hash } from "viem";

const ENS_ROOT = "agenthaus.space";
// Placeholder for the treasury address that receives 2 CELO.
// User can set this in their .env
const TREASURY_ADDRESS = process.env.ENS_TREASURY_ADDRESS || "0x0000000000000000000000000000000000000000";
const REGISTRATION_FEE_CELO = "2";

/**
 * Register an ENS subdomain for an agent.
 * 
 * Flow:
 * 1. User pays 2 CELO on-chain to the treasury.
 * 2. This API verifies the payment and records the subdomain mapping.
 * 
 * Body: { agentId: string, subdomain: string, txHash: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { agentId, subdomain, txHash } = await req.json();

    if (!agentId || !subdomain || !txHash) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Validate subdomain format
    const cleanSubdomain = subdomain.toLowerCase().trim();
    if (!/^[a-z0-9-]+$/.test(cleanSubdomain)) {
      return NextResponse.json({ message: "Invalid subdomain format. Use letters, numbers, and hyphens only." }, { status: 400 });
    }
    if (cleanSubdomain.length < 3) {
      return NextResponse.json({ message: "Subdomain must be at least 3 characters." }, { status: 400 });
    }

    // 2. Check availability
    const existing = await prisma.agent.findUnique({
      where: { ensSubdomain: cleanSubdomain },
    });
    if (existing && existing.id !== agentId) {
      return NextResponse.json({ message: "Subdomain already taken." }, { status: 400 });
    }

    // 3. Verify Payment on Celo
    const client = getPublicClient();
    const receipt = await client.getTransactionReceipt({ hash: txHash as Hash });
    if (!receipt || receipt.status !== "success") {
      return NextResponse.json({ message: "Transaction not found or failed." }, { status: 400 });
    }

    const tx = await client.getTransaction({ hash: txHash as Hash });
    
    // Verify recipient and amount
    const isCorrectRecipient = tx.to?.toLowerCase() === TREASURY_ADDRESS.toLowerCase();
    const isCorrectAmount = tx.value >= parseEther(REGISTRATION_FEE_CELO);

    if (!isCorrectRecipient || !isCorrectAmount) {
      return NextResponse.json({ 
        message: `Invalid payment. Ensure you sent ${REGISTRATION_FEE_CELO} CELO to ${TREASURY_ADDRESS}.` 
      }, { status: 400 });
    }

    // 4. Update Agent Record
    const fullName = `${cleanSubdomain}.${ENS_ROOT}`;
    const node = namehash(fullName);

    await prisma.agent.update({
      where: { id: agentId },
      data: {
        ensSubdomain: cleanSubdomain,
        ensNode: node,
        ensRegisteredAt: new Date(),
      },
    });

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
