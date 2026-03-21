/**
 * Storacha (formerly web3.storage) Client for Agent Haus
 * 
 * Provides decentralized storage using Storacha Network
 * @see https://docs.storacha.network/
 */

import { create, type Client } from "@storacha/client";

export interface StorachaConfig {
  email?: string;
  spaceName?: string;
}

export interface UploadResult {
  cid: string;
  url: string;
  size: number;
}

let clientInstance: Client | null = null;

export async function getStorachaClient(): Promise<Client> {
  if (clientInstance) {
    return clientInstance;
  }
  
  clientInstance = await create();
  return clientInstance;
}

export async function loginToStoracha(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const client = await getStorachaClient();
    // @ts-expect-error: storacha client currently requires a template literal email type, but runtime is fine.
    await client.login(email);
    return { success: true, message: "Login email sent! Check your inbox and click the confirmation link." };
  } catch (error) {
    return { success: false, message: `Login failed: ${error}` };
  }
}

export async function createSpace(spaceName: string): Promise<{ success: boolean; did?: string; message: string }> {
  try {
    const client = await getStorachaClient();
    const space = await client.createSpace(spaceName);
    return { success: true, did: space.did().toString(), message: `Space "${spaceName}" created!` };
  } catch (error) {
    return { success: false, message: `Space creation failed: ${error}` };
  }
}

export async function uploadToStoracha(
  content: string | Blob | File,
  filename: string
): Promise<UploadResult> {
  const client = await getStorachaClient();
  
  let file: File;
  if (content instanceof Blob) {
    file = new File([content], filename);
  } else {
    file = new File([content], filename);
  }
  
  const cid = await client.uploadFile(file);
  
  return {
    cid: cid.toString(),
    url: `https://${cid}.ipfs.storacha.link`,
    size: file.size,
  };
}

export async function uploadJSON(
  data: Record<string, any>,
  filename: string = "data.json"
): Promise<UploadResult> {
  const jsonString = JSON.stringify(data, null, 2);
  return uploadToStoracha(jsonString, filename);
}

export async function uploadDirectory(
  files: { name: string; content: string }[]
): Promise<{ cid: string; url: string; count: number }> {
  const client = await getStorachaClient();
  
  const fileObjects = files.map(
    (f) => new File([f.content], f.name)
  );
  
  const cid = await client.uploadDirectory(fileObjects);
  
  return {
    cid: cid.toString(),
    url: `https://${cid}.ipfs.storacha.link`,
    count: files.length,
  };
}

export async function getAccountInfo(): Promise<any> {
  const client = await getStorachaClient();
  try {
    const accounts = client.accounts();
    const firstAccount = Object.values(accounts)[0];
    if (!firstAccount) {
      return null;
    }
    return {
      email: firstAccount.toEmail ? firstAccount.toEmail() : undefined,
      did: firstAccount.did ? (typeof firstAccount.did === "function" ? firstAccount.did() : firstAccount.did) : undefined,
    };
  } catch {
    return null;
  }
}

export function getIPFSUrl(cid: string, gateway: string = "storacha"): string {
  const gateways: Record<string, string> = {
    storacha: `https://${cid}.ipfs.storacha.link`,
    ipfs: `https://ipfs.io/ipfs/${cid}`,
    cloudflare: `https://cloudflare-ipfs.com/ipfs/${cid}`,
    dweb: `https://dweb.link/ipfs/${cid}`,
  };
  return gateways[gateway] || gateways.storacha;
}

export function getAllGateways(cid: string): string[] {
  return [
    `https://${cid}.ipfs.storacha.link`,
    `https://ipfs.io/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
  ];
}
