/**
 * IPFS Storage Utility for Agent Haus
 * 
 * Uses Pinata API for IPFS uploads
 * Provides agents with ability to:
 * - Store data (files, JSON) to IPFS
 * - Retrieve data from IPFS gateways
 */

export interface StorageResult {
  cid: string;
  url: string;
  size: number;
}

export interface AgentDataPackage {
  agentId: string;
  ownerAddress: string;
  timestamp: number;
  data: Record<string, any>;
  metadata: {
    platform: string;
    version: string;
    type: string;
  };
}

const PINATA_API_URL = "https://api.pinata.cloud";

async function pinataUpload(
  data: Blob,
  filename: string,
  keyvalues: Record<string, string> = {}
): Promise<{ IpfsHash: string; PinSize: number }> {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) {
    throw new Error("PINATA_JWT not configured");
  }

  const formData = new FormData();
  formData.append("file", data, filename);
  formData.append(
    "pinataMetadata",
    JSON.stringify({ name: filename, keyvalues })
  );
  formData.append(
    "pinataOptions",
    JSON.stringify({ cidVersion: 1 })
  );

  const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinata upload failed: ${error}`);
  }

  return response.json();
}

export async function storeJSON(
  data: Record<string, any>,
  filename: string = "data.json",
  keyvalues: Record<string, string> = {}
): Promise<StorageResult> {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  const result = await pinataUpload(blob, filename, { type: "json", ...keyvalues });

  return {
    cid: result.IpfsHash,
    url: `https://ipfs.io/ipfs/${result.IpfsHash}`,
    size: result.PinSize,
  };
}

export async function storeData(
  content: string,
  filename: string,
  keyvalues: Record<string, string> = {}
): Promise<StorageResult> {
  const blob = new Blob([content]);
  const result = await pinataUpload(blob, filename, keyvalues);

  return {
    cid: result.IpfsHash,
    url: `https://ipfs.io/ipfs/${result.IpfsHash}`,
    size: result.PinSize,
  };
}

export async function storeAgentUserData(
  agentId: string,
  ownerAddress: string,
  userData: Record<string, any>,
  dataType: string = "user_data"
): Promise<StorageResult & { package: AgentDataPackage }> {
  const pkg: AgentDataPackage = {
    agentId,
    ownerAddress,
    timestamp: Date.now(),
    data: userData,
    metadata: {
      platform: "Agent Haus",
      version: "1.0.0",
      type: dataType,
    },
  };

  const filename = `${agentId}_${dataType}_${Date.now()}.json`;
  const result = await storeJSON(pkg, filename, {
    agentId,
    dataType,
    ownerAddress,
  });

  return { ...result, package: pkg };
}

export async function retrieveJSON<T = any>(cid: string): Promise<T> {
  const urls = getIPFSGatewayUrls(cid);

  for (const url of urls) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
    }
  }

  throw new Error(`Failed to retrieve ${cid} from all gateways`);
}

export async function retrieveData(cid: string): Promise<string> {
  const urls = getIPFSGatewayUrls(cid);

  for (const url of urls) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (response.ok) {
        return response.text();
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
    }
  }

  throw new Error(`Failed to retrieve ${cid} from all gateways`);
}

export async function retrieveAgentData(cid: string): Promise<AgentDataPackage> {
  return retrieveJSON<AgentDataPackage>(cid);
}

export function getIPFSGatewayUrl(cid: string): string {
  return `https://ipfs.io/ipfs/${cid}`;
}

export function getIPFSGatewayUrls(cid: string): string[] {
  return [
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://gateway.pinata.cloud/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
  ];
}

export async function listPins(
  filters: { agentId?: string; dataType?: string } = {}
): Promise<any[]> {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) {
    throw new Error("PINATA_JWT not configured");
  }

  const params = new URLSearchParams();
  if (filters.agentId) {
    params.append("metadata[keyvalues][agentId][value]", filters.agentId);
    params.append("metadata[keyvalues][agentId][op]", "eq");
  }
  if (filters.dataType) {
    params.append("metadata[keyvalues][dataType][value]", filters.dataType);
    params.append("metadata[keyvalues][dataType][op]", "eq");
  }

  const response = await fetch(`${PINATA_API_URL}/pinning/pinList?${params}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!response.ok) {
    throw new Error(`Pinata list failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result.rows || [];
}

export async function unpinData(ipfsHash: string): Promise<boolean> {
  const jwt = process.env.PINATA_JWT;
  if (!jwt) {
    throw new Error("PINATA_JWT not configured");
  }

  const response = await fetch(`${PINATA_API_URL}/pinning/unpin/${ipfsHash}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  return response.ok;
}
