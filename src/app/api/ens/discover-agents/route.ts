import { NextResponse } from "next/server";
import { type Address, parseAbiItem } from "viem";
import { getChainPublicClient, getERC8004IdentityAddress } from "@/lib/blockchain/chains";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chainId = parseInt(searchParams.get("chainId") || "42220");
    const ownerAddress = searchParams.get("address");

    if (!ownerAddress) {
      return NextResponse.json({ error: "owner address is required" }, { status: 400 });
    }

    const client = getChainPublicClient(chainId);
    const registryAddress = getERC8004IdentityAddress(chainId) as Address;

    let agents: any[] = [];

    // Strategy 1: Try 8004scan API (highest reliability for historical data)
    try {
      const apiKey = process.env.SCAN_8004_API_KEY;
      const scanRes = await fetch(`https://www.8004scan.io/api/v1/public/accounts/${ownerAddress}/agents?chainId=${chainId}`, {
        headers: apiKey ? { "X-API-Key": apiKey } : {},
        next: { revalidate: 300 }
      });
      if (scanRes.ok) {
        const json = await scanRes.json();
        const data = json.data; // Official API returns { success: true, data: [...] }
        if (Array.isArray(data)) {
          // Filter by chainId if provided, otherwise return all
          const filtered = data.filter((a: any) => !chainId || a.chain_id === chainId);
          agents = filtered.map((a: any) => ({
            id: a.token_id || a.agent_id?.split(':').pop(),
            name: a.name || `Agent ${a.token_id}`,
            uri: a.image_url || "", // Using image as a placeholder or URI if available
            chain: a.chain_id
          }));
        }
      }
    } catch (err) {
      console.warn("8004scan discovery failed, falling back to event scanning", err);
    }

    // Strategy 2: Event Scanning (recent blocks)
    if (agents.length === 0) {
      try {
        const latestBlock = await client.getBlockNumber();
        const fromBlock = latestBlock - BigInt(50000); // Scan last ~50k blocks

        const logs = await client.getLogs({
          address: registryAddress,
          event: parseAbiItem('event Registered(uint256 indexed agentId, string agentURI, address indexed owner)'),
          args: {
            owner: ownerAddress as Address
          },
          fromBlock
        });

        agents = logs.map(log => ({
          id: log.args.agentId?.toString(),
          uri: log.args.agentURI,
          name: `Agent ${log.args.agentId}`,
          chain: chainId,
          source: "event"
        }));
      } catch (err) {
        console.error("Event scanning failed", err);
      }
    }

    // If still empty, check balance
    if (agents.length === 0) {
      try {
        const balance = await client.readContract({
          address: registryAddress,
          abi: [{ name: "balanceOf", type: "function", inputs: [{ name: "owner", type: "address" }], outputs: [{ name: "", type: "uint256" }] }],
          functionName: "balanceOf",
          args: [ownerAddress as Address]
        }) as bigint;
        
        if (balance > BigInt(0)) {
          // User has agents, but we couldn't find them via events in recent blocks
          // We return the count so the UI can show a hint
          return NextResponse.json({ 
            agents: [], 
            totalOwned: Number(balance),
            hint: "Agents found in registry but outside recent history. Please enter ID manually."
          });
        }
      } catch (err) {
        // ignore
      }
    }

    return NextResponse.json({ agents });
  } catch (error: any) {
    console.error("Agent discovery failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to discover agents" },
      { status: 500 }
    );
  }
}
