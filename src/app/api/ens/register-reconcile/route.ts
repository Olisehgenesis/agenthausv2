import { NextRequest, NextResponse } from "next/server";
import { withPrismaRetry } from "@/lib/db";
import { getPublicClient } from "@/lib/blockchain/wallet";
import { namehash } from "viem/ens";
import { isAddress, parseAbiItem, type Address, type Hash } from "viem";

const REGISTRAR_ADDRESS = "0xcf5D3d90DB4129D1063d8ad0942B375691ef6a2a";
const ENS_ROOT = "agenthaus.eth";
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,18}[a-z0-9])?$/;
const ENS_SUFFIX = ".agenthaus.eth";

function normalizeInputName(raw: string): string {
  const value = raw.toLowerCase().trim();
  if (!value) return "";
  return value.endsWith(ENS_SUFFIX) ? value.slice(0, -ENS_SUFFIX.length) : value;
}

const SUBDOMAIN_REGISTERED_EVENT = parseAbiItem(
  "event SubdomainRegistered(string name, address indexed owner, address indexed token, uint256 fee, address indexed registrant)"
);

const registrarReadAbi = [
  {
    name: "getNameRecord",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "name", type: "string" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "owner", type: "address" },
          { name: "token", type: "address" },
          { name: "paidAmount", type: "uint256" },
          { name: "registeredAt", type: "uint64" },
          { name: "active", type: "bool" },
        ],
      },
    ],
  },
] as const;

/**
 * POST /api/ens/register-reconcile
 *
 * Recovers ENS registration state from on-chain registrar when client-side
 * flow fails after payment/transaction confirmation.
 *
 * Body: { agentId: string, subdomain: string, ownerAddress: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { agentId, subdomain, ownerAddress } = await req.json();

    if (!agentId || !subdomain || !ownerAddress) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!isAddress(ownerAddress)) {
      return NextResponse.json({ message: "Invalid owner address." }, { status: 400 });
    }

    const normalizedOwnerAddress = ownerAddress.toLowerCase();
    const cleanSubdomain = normalizeInputName(subdomain);

    if (!SUBDOMAIN_PATTERN.test(cleanSubdomain)) {
      return NextResponse.json({ message: "Invalid subdomain format." }, { status: 400 });
    }

    const agent = await withPrismaRetry((db) =>
      db.agent.findUnique({
        where: { id: agentId },
        select: {
          id: true,
          agentWalletAddress: true,
          owner: { select: { walletAddress: true } },
        },
      })
    );

    if (!agent) {
      return NextResponse.json({ message: "Agent not found." }, { status: 404 });
    }

    const ownerWallet = agent.owner?.walletAddress?.toLowerCase();
    if (!ownerWallet || ownerWallet !== normalizedOwnerAddress) {
      return NextResponse.json({ message: "Owner address does not match agent owner." }, { status: 403 });
    }

    if (!agent.agentWalletAddress || !isAddress(agent.agentWalletAddress)) {
      return NextResponse.json({ message: "Agent wallet is missing or invalid." }, { status: 400 });
    }

    const client = getPublicClient();
    const chainRecord = (await client.readContract({
      address: REGISTRAR_ADDRESS as Address,
      abi: registrarReadAbi,
      functionName: "getNameRecord",
      args: [cleanSubdomain],
    })) as {
      owner: Address;
      token: Address;
      paidAmount: bigint;
      registeredAt: bigint;
      active: boolean;
    };

    if (!chainRecord?.active) {
      return NextResponse.json({ message: "Name is not active on-chain yet." }, { status: 409 });
    }

    if (chainRecord.owner.toLowerCase() !== agent.agentWalletAddress.toLowerCase()) {
      return NextResponse.json(
        { message: "Name is active on-chain but owned by a different wallet." },
        { status: 409 }
      );
    }

    const latestBlock = await client.getBlockNumber();
    const lookback = BigInt(500_000);
    const fromBlock = latestBlock > lookback ? latestBlock - lookback : BigInt(0);

    const logs = await client.getLogs({
      address: REGISTRAR_ADDRESS as Address,
      event: SUBDOMAIN_REGISTERED_EVENT,
      args: {
        owner: agent.agentWalletAddress as Address,
        registrant: normalizedOwnerAddress as Address,
      },
      fromBlock,
      toBlock: "latest",
    });

    const matchingLog = [...logs].reverse().find((log) => {
      return (log.args?.name || "").toLowerCase() === cleanSubdomain;
    });

    const fullName = `${cleanSubdomain}.${ENS_ROOT}`;
    const node = namehash(fullName);
    const recoveredTxHash = (matchingLog?.transactionHash as Hash | undefined) || null;

    await withPrismaRetry((db) =>
      db.$transaction([
        db.ensSubdomain.deleteMany({
          where: {
            agentId,
            name: { not: cleanSubdomain },
          },
        }),
        (db.agent as any).update({
          where: { id: agentId },
          data: {
            ensSubdomain: cleanSubdomain,
            ensNode: node,
            ensRegisteredAt: new Date(),
          },
        }),
        (db.ensSubdomain as any).upsert({
          where: { name: cleanSubdomain },
          update: {
            ownerAddress: normalizedOwnerAddress,
            txHash: recoveredTxHash,
            agentId,
            node,
            fullName,
          },
          create: {
            name: cleanSubdomain,
            fullName,
            node,
            ownerAddress: normalizedOwnerAddress,
            txHash: recoveredTxHash,
            agentId,
          },
        }),
      ])
    );

    return NextResponse.json({
      success: true,
      ensName: fullName,
      node,
      txHash: recoveredTxHash,
      reconciled: true,
    });
  } catch (err) {
    console.error("[ENS Reconcile API] Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}