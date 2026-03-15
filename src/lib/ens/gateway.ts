import { decodeFunctionData, encodeFunctionResult, type Address, type Hex } from "viem";
import { prisma } from "@/lib/db";

/**
 * Minimal ENS ABIs for decoding CCIP-Read requests and encoding responses.
 */
const ENS_RESOLVER_ABI = [
  {
    name: "addr",
    type: "function",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "a", type: "address" }],
  },
  {
    name: "text",
    type: "function",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "key", type: "string" },
    ],
    outputs: [{ name: "value", type: "string" }],
  },
  {
    name: "contenthash",
    type: "function",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "value", type: "bytes" }],
  },
] as const;

/**
 * Resolve an ENS query off-chain.
 * Handles addr(node), text(node, key), and contenthash(node).
 * 
 * @param sender The resolver contract address that triggered the CCIP-Read.
 * @param data The calldata passed from the resolver (the inner query).
 */
export async function resolveEnsQuery(sender: Address, data: Hex): Promise<{ data: Hex }> {
  try {
    const decoded = decodeFunctionData({
      abi: ENS_RESOLVER_ABI,
      data: data,
    });

    const node = (decoded.args as any)[0] as Hex;

    // Find the agent with the matching namehash
    const agent = await prisma.agent.findUnique({
      where: { ensNode: node },
      select: { agentWalletAddress: true, name: true, description: true },
    });

    if (!agent) {
      throw new Error("Node not found");
    }

    let result: any;

    if (decoded.functionName === "addr") {
      // Return the agent's Celo wallet address
      // ENS addr() expects an address
      result = agent.agentWalletAddress || "0x0000000000000000000000000000000000000000";
    } else if (decoded.functionName === "text") {
      const key = (decoded.args as any)[1] as string;
      if (key === "name") result = agent.name;
      else if (key === "description") result = agent.description || "";
      else if (key === "url") result = `https://agenthaus.space/dashboard/agents/${agent.name}`;
      else result = "";
    } else if (decoded.functionName === "contenthash") {
      // Contenthash is usually IPFS or similar, return empty for now
      result = "0x";
    } else {
      throw new Error(`Unsupported function: ${decoded.functionName}`);
    }

    const encodedResult = encodeFunctionResult({
      abi: ENS_RESOLVER_ABI,
      functionName: decoded.functionName as any,
      result: result,
    });

    return { data: encodedResult };
  } catch (err) {
    console.error("[ENS Gateway] Error resolving query:", err);
    // Return empty results for common queries on failure/not-found
    return { data: "0x" as Hex };
  }
}
