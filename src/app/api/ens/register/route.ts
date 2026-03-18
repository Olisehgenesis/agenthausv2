import { NextRequest, NextResponse } from "next/server";
import { prisma, withPrismaRetry } from "@/lib/db";
import { getPublicClient } from "@/lib/blockchain/wallet";
import { namehash } from "viem/ens";
import { decodeEventLog, isAddress, parseAbiItem, type Hash } from "viem";

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

    if (!isAddress(ownerAddress)) {
      return NextResponse.json({ message: "Invalid owner address." }, { status: 400 });
    }

    const normalizedOwnerAddress = ownerAddress.toLowerCase();

    // 1. Validate subdomain format
    const cleanSubdomain = normalizeInputName(subdomain);
    if (!SUBDOMAIN_PATTERN.test(cleanSubdomain)) {
      return NextResponse.json({ message: "Invalid subdomain format." }, { status: 400 });
    }

    // Ensure the agent exists and belongs to the caller wallet.
    const agent = await withPrismaRetry((db) =>
      db.agent.findUnique({
        where: { id: agentId },
        select: {
          id: true,
          agentWalletAddress: true,
          owner: {
            select: {
              walletAddress: true,
            },
          },
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

    // 2. Check availability in DB
    const existing = await withPrismaRetry((db) =>
      db.ensSubdomain.findUnique({
        where: { name: cleanSubdomain },
        select: { agentId: true },
      })
    );
    if (existing && existing.agentId !== agentId) {
      return NextResponse.json({ message: "Subdomain already taken." }, { status: 400 });
    }

    // 3. Verify Event on Celo
    const client = getPublicClient();
    const receipt = await client.getTransactionReceipt({ hash: txHash as Hash });
    if (!receipt || receipt.status !== "success") {
      return NextResponse.json({ message: "Transaction failed." }, { status: 400 });
    }

    // Enforce registrar target.
    const isRegistrar = receipt.to?.toLowerCase() === REGISTRAR_ADDRESS.toLowerCase();
    if (!isRegistrar) {
      return NextResponse.json({ message: "Transaction was not sent to AgentHausRegistrar." }, { status: 400 });
    }

    // Enforce expected SubdomainRegistered event details.
    const matchingEvent = receipt.logs.find((log) => {
      if (log.address.toLowerCase() !== REGISTRAR_ADDRESS.toLowerCase()) {
        return false;
      }

      try {
        const decoded = decodeEventLog({
          abi: [SUBDOMAIN_REGISTERED_EVENT],
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== "SubdomainRegistered") {
          return false;
        }

        const [eventName] = decoded.args as unknown as [string];
        const eventOwner = (decoded.args as any).owner as string;
        const eventRegistrant = (decoded.args as any).registrant as string;

        return (
          eventName?.toLowerCase() === cleanSubdomain &&
          eventOwner?.toLowerCase() === agent.agentWalletAddress!.toLowerCase() &&
          eventRegistrant?.toLowerCase() === normalizedOwnerAddress
        );
      } catch {
        return false;
      }
    });

    if (!matchingEvent) {
      return NextResponse.json({ message: "No matching SubdomainRegistered event found in transaction." }, { status: 400 });
    }

    // 4. Update Database
    const fullName = `${cleanSubdomain}.${ENS_ROOT}`;
    const node = namehash(fullName);

    await withPrismaRetry((db) =>
      db.$transaction([
        // Re-tag flow: one ENS record per agent, remove previous mapping first.
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
            txHash: txHash,
            agentId: agentId,
            node: node,
            fullName: fullName,
          },
          create: {
            name: cleanSubdomain,
            fullName: fullName,
            node: node,
            ownerAddress: normalizedOwnerAddress,
            txHash: txHash,
            agentId: agentId,
          },
        }),
      ])
    );

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
