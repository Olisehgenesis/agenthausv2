# Wallet & Spending Controls

> Reown AppKit for connection · HD wallets for agents · ERC-7715 session keys.

## Wallet Options

At agent creation, choose how the agent handles transactions:

| Option | Private Key in DB? | Approval per TX? | Best For |
|--------|-------------------|-----------------|----------|
| **Dedicated** | ✅ Yes (HD, encrypted) | No | Autonomous agents |
| **MetaMask Session** | ❌ No (ERC-7715 session key) | ❌ No (owner approves once) | Controlled autonomy |
| **Owner Proxy** | ❌ No (uses owner address) | ✅ Yes (owner in MetaMask) | Read-only agents |
| **Deferred** | ❌ | ❌ | Staging |

## Wallet Connection (Reown AppKit)

**Status:** ✅ Production

```typescript
import { createAppKit } from "@reown/appkit-adapter-react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { celo, celoSepolia } from "@reown/appkit/networks";

export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  networks: [celo, celoSepolia],
});
```

## HD Wallets for Agents

**Status:** ✅ Production

Agents get HD-derived wallets from a master mnemonic:

```typescript
import { mnemonicToAccount, HDAccount } from "viem/accounts";

// Path: m/44'/60'/0'/0/{index}
const account = mnemonicToAccount(mnemonic, { addressIndex: 0 });
const agentWallet = account.address;
```

| Wallet Option | Description |
|---------------|-------------|
| **Dedicated** | Derive unique HD wallet per agent (recommended) |
| **Owner Proxy** | Agent uses owner's address (read-only by default) |
| **Deferred** | Deploy without wallet, bind later |

## Spending Limits

**Status:** ✅ Production

Spending limits are enforced server-side in USD equivalent:

```typescript
// src/lib/blockchain/spending.ts
const STABLE_USD_APPROX = {
  CUSD: 1,
  CEUR: 1.08,
  CREAL: 0.2,
};
```

Agents can also **request more spending** via the Session UI in the dashboard.

## ERC-7715 Session Keys (MetaMask Session)

**Status:** ✅ UI + API implemented

Agents with "MetaMask Session" wallet type can set up ERC-7715 session keys — owner approves once via MetaMask popup, agent operates autonomously within granted limits. **No private key stored in the database.**

### How It Works

```
Owner opens WalletCard → clicks "Set Up ERC-7715 Session"
     │
     ▼
Configures: duration (7/14/30/90 days), tokens, max amounts
     │
     ▼
Owner clicks "Authorize in MetaMask" → MetaMask popup appears
     │
     ▼
Owner approves → session saved in DB (encrypted)
     │
     ▼
Agent operates autonomously within granted limits
     │
     ▼
Owner revokes anytime from WalletCard dashboard
```

### Session Modal UI

`src/app/dashboard/agents/[id]/_components/SessionModal.tsx`:

- **Info step** — explains what ERC-7715 session keys are
- **Config step** — set duration + per-token spending limits
- **Done step** — shows active session key address + revoke button

Available from WalletCard on every agent detail page.

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/agents/{id}/session/request` | POST | Create session key, returns `setupToken` |
| `/api/agents/{id}/session/confirm` | POST | Save permission after MetaMask approval |
| `/api/agents/{id}/session/revoke` | POST/GET | Revoke or query session status |

### Session Storage

```prisma
model Agent {
  sessionKeyAddress      String?   // Session key address
  sessionKeyPrivateKey   String?   // Encrypted private key (AES-256-GCM)
  sessionContext         String?   // ERC-7715 permission context
  sessionExpiresAt       DateTime? // Permission expiry
  sessionPermissions     String?   // JSON: { token, maxAmount, period, maxTransfers }
}
```

### Implementation

```typescript
// src/lib/blockchain/session-keys.ts
import { privateKeyToAccount } from "viem/accounts";
import { createCipheriv, randomBytes, scryptSync } from "crypto";

// AES-256-GCM encryption for session private keys
export function generateSessionKey(): { address: string; privateKeyHex: string } {
  const privateKey = randomBytes(32);
  const account = privateKeyToAccount(`0x${privateKey.toString("hex")}`);
  return { address: account.address, privateKeyHex: privateKey.toString("hex") };
}

// Decrypt only when agent needs to sign; encrypted at rest in DB
```

### MetaMask Popup Integration

The "Authorize in MetaMask" button triggers the ERC-7715 `wallet_grantPermissions` flow. This requires MetaMask Flask extension and the `@metamask/delegation-toolkit` package (installed).

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";
import { celo } from "viem/chains";

// Extend with ERC-7715 actions
const walletClient = createWalletClient({
  account: ownerConnectedAccount,
  chain: celo,
  transport: custom(window.ethereum!),
}).extend(erc7715ProviderActions());

// User approves in MetaMask popup → returns permission context
const granted = await walletClient.grantPermissions({
  chainId: 42220,
  expiry: Math.floor(Date.now() / 1000) + 30 * 86400,
  permissions: [{
    type: "erc20-token-periodic",
    data: { tokenAddress: "0x765DE...289B8", maxAmount: "50000000000000000000", period: 86400 },
  }],
});
```

### Revocable

Owner can revoke the session at any time from the WalletCard → "Revoke Session" button. On revoke:
- Session fields cleared in DB
- `walletType` reverts to `"dedicated"`
- Agent falls back to HD wallet

## Architecture

```
┌──────────────┐    AppKit Modal    ┌─────────────────┐
│  User       │ ──────────────────▶ │  Reown AppKit    │
│  (Browser)  │   Connect/Approve   │  (Wagmi + Viem) │
└──────────────┘                    └────────┬────────┘
                                             │ Read
┌──────────────┐    HD Derivation   ┌────────▼────────┐
│  Agent      │ ──────────────────▶ │  Agent Wallet    │
│  (Server)   │   m/44'/60'/0'/0/n  │  (Viem Client)  │
└──────────────┘                    └────────┬────────┘
                                             │
                              ┌──────────────┴──────────────┐
                              │                            │
                       Dedicated HD               ERC-7715 Session Key
                       (in memory)               (encrypted in DB)
```

## References

- [Reown AppKit](https://reown.com/appkit)
- [MetaMask Delegation Toolkit](https://docs.metamask.io/delegation-toolkit/)
- [ERC-7715 Spec](https://eips.ethereum.org/EIPS/eip-7715)
- [Celo Fee Abstraction](https://docs.celo.org/protocol/transaction/erc20-transaction-fees)
