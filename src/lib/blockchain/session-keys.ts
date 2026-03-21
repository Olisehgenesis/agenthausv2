import { privateKeyToAccount } from "viem/accounts";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";
import { prisma } from "@/lib/db";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT = "agenthaus-session-key-salt";

function getEncryptionKey(): Buffer {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) {
    const fallback = process.env.DATABASE_URL || "agenthaus-dev-fallback";
    return scryptSync(fallback, SALT, 32);
  }
  return scryptSync(secret, SALT, 32);
}

export interface SessionPermission {
  token: string;
  maxAmount: string;
  period: number;
  maxTransfers: number;
  maxPerTx?: string;
}

export interface SessionConfig {
  sessionKeyAddress: string;
  sessionKeyPrivateKeyHex: string;
  permissions: SessionPermission[];
  expiresAt: Date;
}

export function generateSessionKey(): { address: string; privateKeyHex: string } {
  const privateKey = randomBytes(32);
  const account = privateKeyToAccount(`0x${privateKey.toString("hex")}` as `0x${string}`);
  return {
    address: account.address,
    privateKeyHex: privateKey.toString("hex"),
  };
}

function encryptSessionKey(privateKeyHex: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(privateKeyHex, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptSessionKey(encrypted: string): string {
  const key = getEncryptionKey();
  const [ivHex, authTagHex, encryptedHex] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(encryptedText) + decipher.final("utf8");
}

export async function saveSessionPermission(
  agentId: string,
  config: SessionConfig,
  context: string
): Promise<void> {
  const encryptedKey = encryptSessionKey(config.sessionKeyPrivateKeyHex);

  await prisma.agent.update({
    where: { id: agentId },
    data: {
      walletType: "metamask_session",
      sessionKeyAddress: config.sessionKeyAddress,
      sessionKeyPrivateKey: encryptedKey,
      sessionContext: context,
      sessionExpiresAt: config.expiresAt,
      sessionPermissions: JSON.stringify(config.permissions),
    },
  });
}

export async function getSessionPermission(agentId: string) {
  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    select: {
      sessionKeyAddress: true,
      sessionKeyPrivateKey: true,
      sessionContext: true,
      sessionExpiresAt: true,
      sessionPermissions: true,
    },
  });

  if (!agent?.sessionKeyAddress || !agent.sessionContext || !agent.sessionExpiresAt) {
    return null;
  }

  if (new Date(agent.sessionExpiresAt) < new Date()) {
    return null;
  }

  const privateKeyHex = decryptSessionKey(agent.sessionKeyPrivateKey!);

  return {
    sessionKeyAddress: agent.sessionKeyAddress,
    sessionPrivateKey: privateKeyHex,
    context: agent.sessionContext,
    expiresAt: agent.sessionExpiresAt,
    permissions: agent.sessionPermissions ? JSON.parse(agent.sessionPermissions) : [],
  };
}

export async function revokeSessionPermission(agentId: string): Promise<void> {
  await prisma.agent.update({
    where: { id: agentId },
    data: {
      sessionKeyAddress: null,
      sessionKeyPrivateKey: null,
      sessionContext: null,
      sessionExpiresAt: null,
      sessionPermissions: null,
    },
  });
}
