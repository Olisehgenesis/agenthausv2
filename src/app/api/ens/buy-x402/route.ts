import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { FacilitatorClient, buildPaymentRequirements, parsePaymentHeader } from "uvd-x402-sdk/backend";
import { namehash } from "viem";

import { getHausNamePrice } from "@/lib/pricing";

// The platform wallet that receives x402 payments
const PLATFORM_PAYMENT_WALLET = "0x9b6A52A88a1Ee029Bd14170fFb8fB15839Bd18cB";
const ROOT_DOMAIN = "agenthaus.eth";
const NETWORK = "celo"; // or eip155:42220

export const dynamic = "force-dynamic";

/**
 * GET /api/ens/buy-x402
 * 
 * Returns x402 payment requirements (Faremeter).
 * Agents call this to know what they need to pay.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "example";
  const price = getHausNamePrice(name);

  const requirements = buildPaymentRequirements({
    amount: price,
    recipient: PLATFORM_PAYMENT_WALLET,
    resource: "https://agenthaus.space/api/ens/buy-x402",
    chainName: NETWORK,
    description: `Haus Name Registration (${name}.${ROOT_DOMAIN})`,
    mimeType: "application/json",
  });

  return NextResponse.json({
    x402Version: 1,
    ...requirements,
    message: `To register ${name}.${ROOT_DOMAIN}, pay ${price} USDC/cUSD to ${PLATFORM_PAYMENT_WALLET} and send the x402 signature in the X-Payment header.`
  }, {
    headers: {
      "PAYMENT-REQUIRED": "true",
      "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, X-PAYMENT-RESPONSE"
    }
  });
}

/**
 * POST /api/ens/buy-x402
 * 
 * Body: { agentId: string, name: string }
 * Header: X-Payment (x402 payment payload)
 */
export async function POST(req: Request) {
  try {
    const xPaymentHeader = req.headers.get("X-Payment") || req.headers.get("Payment-Signature");
    const paymentPayload = parsePaymentHeader(xPaymentHeader);

    if (!paymentPayload) {
      return NextResponse.json({ error: "X-Payment header required" }, { status: 402 });
    }

    const { agentId, name } = await req.json();

    if (!agentId || !name) {
      return NextResponse.json({ error: "agentId and name are required" }, { status: 400 });
    }

    const price = getHausNamePrice(name);

    // 1. Prepare requirements for verification
    const requirements = buildPaymentRequirements({
      amount: price,
      recipient: PLATFORM_PAYMENT_WALLET,
      resource: "https://agenthaus.space/api/ens/buy-x402",
      chainName: NETWORK,
    });

    // 2. Verify with facilitator
    const client = new FacilitatorClient();
    const verification = await client.verify(paymentPayload, requirements);

    if (!verification.isValid) {
      return NextResponse.json({ error: "Invalid x402 payment: " + verification.invalidReason }, { status: 402 });
    }

    // 3. Settle payment (On-chain transfer)
    const settlement = await client.settle(paymentPayload, requirements);
    if (!settlement.success) {
      return NextResponse.json({ error: "Payment settlement failed: " + settlement.error }, { status: 500 });
    }

    // 4. Business Logic: Check if name is taken
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanName.length < 3) {
      return NextResponse.json({ error: "Name too short" }, { status: 400 });
    }

    const existingName = await prisma.agent.findUnique({
      where: { ensSubdomain: cleanName }
    });

    if (existingName) {
      return NextResponse.json({ error: "Name already registered" }, { status: 409 });
    }

    // 5. Update database (The Database is the Resolver)
    const fullName = `${cleanName}.${ROOT_DOMAIN}`;
    const node = namehash(fullName);

    const updatedAgent = await prisma.agent.update({
      where: { id: agentId },
      data: {
        ensSubdomain: cleanName,
        ensNode: node,
        ensRegisteredAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      agentId: updatedAgent.id,
      ensSubdomain: updatedAgent.ensSubdomain,
      fullName,
      txHash: settlement.transactionHash,
      message: `Haus Name ${fullName} successfully registered via x402`
    });

  } catch (error: any) {
    console.error("x402 registration error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
