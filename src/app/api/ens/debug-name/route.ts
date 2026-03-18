import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getPublicClient } from "@/lib/blockchain/wallet";
import { isAddress, parseAbiItem, type Address } from "viem";

const REGISTRAR_ADDRESS = "0xcf5D3d90DB4129D1063d8ad0942B375691ef6a2a";
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,18}[a-z0-9])?$/;
const ENS_SUFFIX = ".agenthaus.eth";

function normalizeInputName(raw: string): string {
  const value = raw.toLowerCase().trim();
  if (!value) return "";
  return value.endsWith(ENS_SUFFIX) ? value.slice(0, -ENS_SUFFIX.length) : value;
}

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

const SUBDOMAIN_REGISTERED_EVENT = parseAbiItem(
  "event SubdomainRegistered(string name, address indexed owner, address indexed token, uint256 fee, address indexed registrant)"
);

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const name = normalizeInputName(url.searchParams.get("name") || "");
    const ownerAddress = (url.searchParams.get("ownerAddress") || "").toLowerCase().trim();
    const agentId = (url.searchParams.get("agentId") || "").trim();

    if (!name) {
      return NextResponse.json({ message: "Missing name." }, { status: 400 });
    }

    if (!SUBDOMAIN_PATTERN.test(name)) {
      return NextResponse.json({ message: "Invalid name format." }, { status: 400 });
    }

    if (ownerAddress && !isAddress(ownerAddress)) {
      return NextResponse.json({ message: "Invalid ownerAddress." }, { status: 400 });
    }

    const client = getPublicClient();
    const [chainRecord, dbRecord, agent] = await Promise.all([
      client.readContract({
        address: REGISTRAR_ADDRESS as Address,
        abi: registrarReadAbi,
        functionName: "getNameRecord",
        args: [name],
      }) as Promise<{
        owner: Address;
        token: Address;
        paidAmount: bigint;
        registeredAt: bigint;
        active: boolean;
      }>,
      prisma.ensSubdomain.findUnique({
        where: { name },
        include: {
          agent: {
            select: {
              id: true,
              agentWalletAddress: true,
              owner: { select: { walletAddress: true } },
            },
          },
        },
      }),
      agentId
        ? prisma.agent.findUnique({
            where: { id: agentId },
            select: {
              id: true,
              agentWalletAddress: true,
              owner: { select: { walletAddress: true } },
            },
          })
        : Promise.resolve(null),
    ]);

    const chainOwner = chainRecord.owner;
    const chainToken = chainRecord.token;
    const chainPaidAmount = chainRecord.paidAmount;
    const chainRegisteredAt = chainRecord.registeredAt;
    const chainActive = chainRecord.active;

    const latestBlock = await client.getBlockNumber();
    const lookback = BigInt(500_000);
    const fromBlock = latestBlock > lookback ? latestBlock - lookback : BigInt(0);

    const logs = await client.getLogs({
      address: REGISTRAR_ADDRESS as Address,
      event: SUBDOMAIN_REGISTERED_EVENT,
      fromBlock,
      toBlock: "latest",
    });

    const connectedWalletEvents = ownerAddress
      ? await client.getLogs({
          address: REGISTRAR_ADDRESS as Address,
          event: SUBDOMAIN_REGISTERED_EVENT,
          args: {
            registrant: ownerAddress as Address,
          },
          fromBlock,
          toBlock: "latest",
        })
      : [];

    const matchingEvents = logs
      .filter((log) => (log.args?.name || "").toLowerCase() === name)
      .slice(-5)
      .map((log) => ({
        txHash: log.transactionHash,
        blockNumber: log.blockNumber?.toString() || null,
        owner: log.args?.owner || null,
        registrant: log.args?.registrant || null,
        token: log.args?.token || null,
        fee: log.args?.fee?.toString() || null,
      }));

    const latestEvent = matchingEvents.length > 0 ? matchingEvents[matchingEvents.length - 1] : null;

    const connectedWalletRecentNames = [...connectedWalletEvents]
      .reverse()
      .map((log) => String(log.args?.name || "").toLowerCase())
      .filter((n) => !!n)
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .slice(0, 20);

    const selectedAgentWallet = agent?.agentWalletAddress?.toLowerCase() || null;
    const chainOwnerLower = chainOwner.toLowerCase();
    const ownerIsBuyer = !!ownerAddress && !!latestEvent?.registrant && latestEvent.registrant.toLowerCase() === ownerAddress;

    const canSyncForSelectedAgent =
      !!agent &&
      !!selectedAgentWallet &&
      chainActive &&
      chainOwnerLower === selectedAgentWallet &&
      (!ownerAddress || (agent.owner?.walletAddress || "").toLowerCase() === ownerAddress);

    return NextResponse.json({
      name,
      chain: {
        active: chainActive,
        owner: chainOwner,
        token: chainToken,
        paidAmount: chainPaidAmount.toString(),
        registeredAt: chainRegisteredAt.toString(),
      },
      events: matchingEvents,
      latestEvent,
      ownerIsBuyer,
      connectedWalletRecentNames,
      db: dbRecord
        ? {
            id: dbRecord.id,
            fullName: dbRecord.fullName,
            txHash: dbRecord.txHash,
            ownerAddress: dbRecord.ownerAddress,
            agentId: dbRecord.agentId,
            agentWalletAddress: dbRecord.agent?.agentWalletAddress || null,
            agentOwnerAddress: dbRecord.agent?.owner?.walletAddress || null,
            updatedAt: dbRecord.updatedAt,
          }
        : null,
      selectedAgent: agent
        ? {
            id: agent.id,
            walletAddress: agent.agentWalletAddress,
            ownerAddress: agent.owner?.walletAddress || null,
          }
        : null,
      canSyncForSelectedAgent,
    });
  } catch (error) {
    console.error("[ENS Debug Name API] Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}