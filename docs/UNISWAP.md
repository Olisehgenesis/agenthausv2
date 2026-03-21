# Mento DEX & Trading

> Celo-native DEX for CELO ↔ stablecoin swaps with full trading stack.

## Overview

Agent Haus integrates **Mento Protocol** (Celo's native DEX) for on-chain trading, and **Ubeswap** for token swaps. The platform ships a complete trading/forex stack including:
- Mento swap quotes and execution
- Price tracking, trends, predictions, alerts
- Stop-loss and take-profit via price triggers
- Portfolio tracking
- ERC-8004 reputation for trading agents

**Note:** Uniswap Trading API integration is planned for cross-chain trading. Currently, Mento DEX handles all swap operations on Celo.

## What Exists Today

### Mento Protocol (Production)

Mento is Celo's native AMM for CELO ↔ stablecoin exchanges.

**Contract Addresses (Celo Mainnet):**

| Contract | Address |
|----------|---------|
| SortedOracles | `0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33` |
| Mento cUSD Exchange | `0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275` |
| Mento cEUR Exchange | `0xE383394B913d7F22ceC5C811fa6822E6eF445F4A` |
| Mento cREAL Exchange | `0x8f2cf9855C919AFAC8a4aC0a21A186bE5a1270ca` |

### Trading Skills (30+ skills across categories)

| Category | Skills |
|----------|--------|
| **Transfer** | `SEND_CELO`, `SEND_TOKEN` |
| **Oracle** | `QUERY_RATE`, `QUERY_ALL_RATES`, `CHECK_PRICE` |
| **Mento** | `MENTO_QUOTE`, `MENTO_SWAP` |
| **Forex** | `FOREX_ANALYSIS`, `PRICE_TRACK`, `PRICE_TREND`, `PRICE_PREDICT`, `PRICE_ALERTS`, `PORTFOLIO_STATUS` |
| **Trading** | `CREATE_PRICE_TRIGGER`, `CREATE_TIME_TRIGGER` |
| **Data** | `CHECK_BALANCE`, `GAS_PRICE`, network status, blocks, txs, token info |

### Price Tracker (`src/lib/blockchain/price-tracker.ts`)

Records Mento oracle prices and computes trends/predictions:

```typescript
// Record current prices
const snapshots = await recordAllPriceSnapshots();

// Analyze trends
const trend = analyzeTrend("CELO/cUSD", 60);

// Momentum prediction
const prediction = predictPrice("CELO/cUSD");

// Check for big moves
const alerts = checkAlerts(2); // >2% change
```

### Template: Forex Trader

The Forex Trader template ships with everything needed for FX hedging:

```
- Live Mento exchange rate monitoring
- SortedOracles price feeds (on-chain)
- CELO ↔ cUSD/cEUR/cREAL swaps via Mento
- Periodic price tracking & trend analysis
- Momentum-based price predictions
- Portfolio valuation & tracking
- Forex analysis & trading signals
- Price alerts on significant moves
- Fee abstraction — pay gas in cUSD/cEUR
```

## Planned: Uniswap Trading API

Cross-chain trading via Uniswap API is planned for:
- Token ↔ Token swaps beyond Celo stablecoins
- Cross-chain swaps via UniswapX (Celo ↔ Base, etc.)
- Arbitrage detection across DEXes

```typescript
// Planned integration
import { UniswapAPI } from "@uniswap/sdk";
const quote = await uniswap.quote({
  inputToken: "CELO",
  outputToken: "USDC",
  inputAmount: "10",
  chainId: 42220
});
```

## Bounty Alignment

- **Uniswap Bounty:** Stablecoin Arbitrage Agent, FX Hedging Agent (suggested by Celo)
- **Celo Track:** Trading agents qualify for main track

## References

- [Mento Protocol](https://www.mento.org)
- [Mento Docs](https://docs.mento.org)
- [Celo DeFi](https://docs.celo.org/defi)
- [Ubeswap](https://ubeswap.org)
- [Uniswap Trading API](https://docs.uniswap.org/api) (planned)
