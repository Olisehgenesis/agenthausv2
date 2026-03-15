import { NextResponse } from "next/server";
import { type Address } from "viem";
import { getChainPublicClient, getERC8004IdentityAddress } from "@/lib/blockchain/chains";
import { IDENTITY_REGISTRY_ABI } from "@/lib/blockchain/erc8004-abis";
import { ipfsToPublicGatewayUrl } from "@/lib/ipfs-url";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chainId = parseInt(searchParams.get("chainId") || "42220");
    const agentId = searchParams.get("agentId");

    if (!agentId) {
      return NextResponse.json({ error: "agentId is required" }, { status: 400 });
    }

    const client = getChainPublicClient(chainId);
    const registryAddress = getERC8004IdentityAddress(chainId) as Address;

    // 1. Fetch Core details + On-chain Metadata
    const onChainKeys = ["publicKey", "pubKey", "public_key", "PK", "signingKey"];
    
    const [agentURI, agentWallet, ...onChainValues] = await Promise.all([
      client.readContract({
        address: registryAddress,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "tokenURI",
        args: [BigInt(agentId)],
      }) as Promise<string>,
      client.readContract({
        address: registryAddress,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "getAgentWallet",
        args: [BigInt(agentId)],
      }).catch(() => null) as Promise<string | null>,
      // Parallel fetch for common PK keys
      ...onChainKeys.map(key => 
        client.readContract({
          address: registryAddress,
          abi: IDENTITY_REGISTRY_ABI,
          functionName: "getMetadata",
          args: [BigInt(agentId), key],
        }).catch(() => null) as Promise<Address | null>
      ),
      client.readContract({
        address: registryAddress,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "getMetadata",
        args: [BigInt(agentId), "name"],
      }).catch(() => null) as Promise<Address | null>,
      client.readContract({
        address: registryAddress,
        abi: IDENTITY_REGISTRY_ABI,
        functionName: "getMetadata",
        args: [BigInt(agentId), "description"],
      }).catch(() => null) as Promise<Address | null>,
    ]);

    const onChainPubKeyRaw = onChainValues.slice(0, onChainKeys.length);
    const onChainName = onChainValues[onChainKeys.length];
    const onChainDesc = onChainValues[onChainKeys.length + 1];

    const { hexToString } = await import("viem");
    const decodeMetadata = (hex: string | null) => {
      if (!hex || hex === "0x") return "";
      try {
        // Handle both hex-encoded strings and literal hex strings
        const str = hexToString(hex as Address);
        return str.trim();
      } catch {
        return hex; // Return raw hex if not a string
      }
    };

    const onChainPubKey = onChainPubKeyRaw.map(decodeMetadata).find(pw => !!pw) || "";
    const nameFromContract = decodeMetadata(onChainName);
    const descriptionFromContract = decodeMetadata(onChainDesc);

    const publicKeyFromContract = onChainPubKey;

    // 2. Try 8004scan API for indexed metadata (optional but fast)
    let scanMetadata: any = null;
    try {
      const apiKey = process.env.SCAN_8004_API_KEY;
      const scanRes = await fetch(`https://www.8004scan.io/api/v1/public/agents/${chainId}/${agentId}`, {
        headers: apiKey ? { "X-API-Key": apiKey } : {},
        next: { revalidate: 3600 }
      });
      if (scanRes.ok) {
        const json = await scanRes.json();
        scanMetadata = json.data;
      }
    } catch (err) {
      console.warn("8004scan metadata lookup failed", err);
    }

    if (!agentURI) {
      return NextResponse.json({ error: "Agent not found or has no URI" }, { status: 404 });
    }

    // 3. Fetch Metadata JSON from IPFS if URI is a URL
    let ipfsMetadata: any = {};
    try {
      const url = ipfsToPublicGatewayUrl(agentURI);
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) {
        ipfsMetadata = await res.json();
      }
    } catch (err) {
      console.warn(`Failed to fetch metadata from URI: ${agentURI}`, err);
    }

    // 4. Return combined data (Prioritize Scan -> IPFS -> Contract)
    const combinedName = scanMetadata?.name || ipfsMetadata?.name || nameFromContract || "";
    const combinedDescription = scanMetadata?.description || ipfsMetadata?.description || descriptionFromContract || "";
    const combinedPubKey = scanMetadata?.publicKey || scanMetadata?.pubKey || scanMetadata?.pubkey || ipfsMetadata?.publicKey || ipfsMetadata?.pubKey || ipfsMetadata?.public_key || publicKeyFromContract || "";
    const combinedWallet = agentWallet || scanMetadata?.agent_wallet || scanMetadata?.wallet || ipfsMetadata?.wallet || ipfsMetadata?.agentWallet || "";
    const combinedImage = scanMetadata?.image_url || scanMetadata?.imageUrl || scanMetadata?.image || ipfsMetadata?.image || ipfsMetadata?.imageUrl || null;

    return NextResponse.json({
      name: combinedName,
      description: combinedDescription,
      imageUrl: combinedImage,
      publicKey: combinedPubKey,
      wallet: combinedWallet,
      erc8004AgentId: agentId,
      erc8004ChainId: chainId,
      erc8004URI: agentURI,
    });
  } catch (error: any) {
    console.error("ERC-8004 metadata fetch failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch agent metadata" },
      { status: 500 }
    );
  }
}
