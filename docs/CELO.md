# Celo L2 Integration

> Celo is now a Layer 2. Secured by Ethereum. Built on the Superchain, built different.

## Overview

Agent Haus is built natively on **Celo** — a Layer 2 on Ethereum's Superchain that combines EVM compatibility with mobile-first UX, stablecoin-first design, and carbon-neutral proof-of-stake.

## Why Celo?

| Feature | Benefit |
|---------|---------|
| **Fee Abstraction** | Pay gas in cUSD/cEUR instead of CELO |
| **Stablecoin Native** | cUSD, cEUR, cREAL built-in, no bridges needed |
| **Mobile First** | Phone-number addresses, SMS recovery |
| **Superchain** | Ethereum security + OP Stack tooling |
| **Carbon Negative** | Proof-of-stake with carbon offsets |

## Chain Configuration

```typescript
// Celo Mainnet
export const CELO_CHAIN_ID = 42220;

// Celo Sepolia (Testnet)
export const CELO_SEPOLIA_CHAIN_ID = 11142220;
```

## Supported Tokens

| Token | Mainnet Address | Testnet Address |
|-------|----------------|-----------------|
| CELO | `0x0000...0000` | `0x0000...0000` |
| cUSD | `0x765DE...289B8` | `0x874069...69bC1` |
| cEUR | `0xD8763...6Ca73` | `0x10c892...b78C0F` |
| cREAL | `0xe8537...d4787` | `0xE4D517...745545` |
| USDC | `0xcebA93...118C` | `0x4822e5...dC0` |

## Fee Abstraction

Celo's fee abstraction lets agents pay gas in stablecoins:

```typescript
export const FEE_CURRENCIES = {
  42220: {
    cUSD: { feeCurrency: "0x765DE...289B8", symbol: "cUSD", decimals: 18 },
    cEUR: { feeCurrency: "0xD8763...6Ca73", symbol: "cEUR", decimals: 18 },
  }
};
```

**Benefit:** Agents with no CELO can still operate if they hold stablecoins.

## Wallet Integration

Agent Haus uses **Reown AppKit** (formerly WalletConnect v2) for wallet connection:

```typescript
import { createConfig } from "@reown/appkit-adapter-wagmi";
import { celo, celoAlfajores } from "@reown/appkit-adapter-wagmi/chains";

export const config = createConfig({
  adapters: [new AppKitAdapter({ networks: [celo, celoAlfajores] })],
  metadata: { name: "Agent Haus", url: "https://agenthaus.space" }
});
```

## ERC-8004 on Celo

Agent Haus registers agents on Celo's ERC-8004 Identity Registry:

| Registry | Address |
|----------|---------|
| Identity Registry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation Registry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |

## Mento DEX

Mento is Celo's native DEX for CELO ↔ stablecoin swaps:

```typescript
// Skills: MENTO_QUOTE, MENTO_SWAP
const quote = await mentoQuote("CELO", "cUSD", "10");
```

## Block Explorers

| Explorer | URL |
|----------|-----|
| CeloScan | `https://celoscan.io` |
| Celo Sepolia (Blockscout) | `https://celo-sepolia.blockscout.com` |
| 8004scan | `https://www.8004scan.io` |

## References

- [Celo Docs](https://docs.celo.org)
- [Celo as L2](https://celo.org/blog/celo-is-now-a-layer-2)
- [Superchain](https://docs.optimism.io/superchain)
- [Fee Abstraction](https://docs.celo.org/protocol/transaction/erc20-transaction-fees)
