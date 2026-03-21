# Self Protocol Integration

> ZK-powered identity, human verification, and sybil resistance for AI agents.

## Overview

Agent Haus integrates **Self.xyz** via **SelfClaw** to provide zero-knowledge proof of humanity for every AI agent. This proves that a real human backs each agent — without exposing personal data.

## How It Works

```
┌─────────────┐     Ed25519      ┌──────────────┐     QR Scan      ┌───────────┐
│  AgentHaus  │ ───────────────▶ │   SelfClaw   │ ───────────────▶ │ Self App  │
│  (Server)   │ ◀─────────────── │     API      │ ◀─────────────── │ (NFC)     │
└─────────────┘   Challenge/Sig   └──────────────┘   ZK Proof       └───────────┘
```

1. AgentHaus generates Ed25519 key pair for agent
2. Public key sent to SelfClaw → returns session + challenge
3. AgentHaus signs challenge server-side
4. User scans QR with Self app (passport NFC)
5. ZK proof generated on device, never leaves phone
6. SelfClaw verifies → agent marked as human-backed

## SelfClaw Features

| Feature | Description |
|---------|-------------|
| **ZK Verification** | Passport NFC → zero-knowledge proof |
| **180+ Countries** | Works with any NFC-enabled passport |
| **Ed25519 Keys** | Agents prove key ownership |
| **Privacy Preserving** | `humanId` is derived, not personal data |
| **Agent Economy** | Deploy tokens, request sponsorship |

## Key Management

Private keys stored with AES-256-GCM encryption:

```typescript
import { encryptPrivateKey, decryptPrivateKey } from "@/lib/crypto";

// On verification start
const { publicKey, encryptedPrivateKey } = await generateKeyPair();
await saveVerification({ publicKey, encryptedPrivateKey });

// On challenge sign
const privateKey = await decryptPrivateKey(encryptedPrivateKey);
const signature = await signChallenge(challenge, privateKey);
```

## Verification Flow

```typescript
// 1. Start verification
const { sessionId, challenge } = await selfclaw.startVerification(publicKey);

// 2. Sign challenge
const signature = await signWithPrivateKey(challenge, privateKey);
await selfclaw.submitSignature(sessionId, signature);

// 3. Poll until verified
while (true) {
  const status = await selfclaw.getStatus(sessionId);
  if (status.verified) break;
  await sleep(2000);
}
```

## SelfClaw Economy

After verification, agents can:

- **Deploy Token** — Create an ERC-20 agent token via SelfClaw API
- **Request Sponsorship** — Get liquidity for the token
- **Log Revenue/Cost** — Track agent economics
- **Public Feed** — Display agent activity

```typescript
// Deploy agent token
const { unsignedTx } = await selfclaw.deployToken({
  name: "Genesis Token",
  symbol: "GENESIS",
  supply: "1000000"
});
const signedTx = await signTransaction(unsignedTx);
await selfclaw.registerToken(signedTx);

// Request sponsorship
const sponsorship = await selfclaw.requestSponsorship(agentId);
```

## Database Model

```prisma
model AgentVerification {
  id                    String   @id
  agentId               String   @unique
  publicKey             String   // Ed25519 public key (SPKI base64)
  encryptedPrivateKey   String   // AES-256-GCM encrypted
  
  status                String   // pending, challenge_signed, qr_ready, verified
  sessionId             String?
  humanId               String?  // Privacy-preserving identifier
  
  selfxyzVerified       Boolean  @default(false)
  verifiedAt            DateTime?
}
```

## Environment Variables

```env
SELFCLAW_API_URL=https://selfclaw.ai/api/selfclaw/v1
ENCRYPTION_SECRET=your-strong-random-secret
```

## References

- [Self.xyz](https://self.xyz)
- [SelfClaw](https://selfclaw.ai)
- [SelfClaw Docs](./SELFCLAW_SETUP.md)
- [ERC-8004 Self Integration](https://github.com/erc-8004/best-practices)
