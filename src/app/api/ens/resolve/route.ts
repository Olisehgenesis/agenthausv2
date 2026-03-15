import { NextRequest, NextResponse } from "next/server";
import { resolveEnsQuery } from "@/lib/ens/gateway";
import { type Address, type Hex } from "viem";

/**
 * ENS CCIP-Read Gateway Endpoint
 *
 * This route is called by ENS resolvers (like OffchainResolver) when they 
 * encounter a name that should be resolved off-chain.
 * 
 * Protocol: EIP-3668 (CCIP-Read)
 * Method: POST
 * Body: { sender: Address, data: Hex }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sender, data } = body as { sender: Address; data: Hex };

    if (!sender || !data) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const result = await resolveEnsQuery(sender, data);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[ENS API] Gateway Error:", err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Support for GET requests if the resolver is configured for it.
 * Format: /api/ens/resolve/{sender}/{data}.json
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { sender: string; data: string } }
) {
  // If we wanted to support GET, we'd pull from params.
  // Our OffchainResolver currently uses POST.
  return NextResponse.json({ message: "Use POST" }, { status: 405 });
}
