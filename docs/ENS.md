# ENS Integration

> Give agents memorable names — discoverable and portable across Ethereum.

## Overview

Agent Haus integrates **ENS** (Ethereum Name Service) to provide human-readable names for AI agents. Agents get subdomains on `agenthaus.space` (e.g., `genesis.agenthaus.space`).

## Implementation

### Two-Layer Architecture

1. **Off-chain Resolution (Ethereum)** — Standard ENS with offchain resolver gateway
2. **On-chain Resolution (Celo)** — Custom UUPS-upgradeable registrar for Celo-native names

### Contract Addresses

| Network | Registrar/Resolver | Offchain Resolver |
|---------|-------------------|-------------------|
| Ethereum Mainnet | — | `0x1F3c0902e2c05D53AF2Cd00bd3F0a62EC4000942` |
| Celo Mainnet | `0x5785A2422d51c841C19773161213ECD12dBB50d4` | — |

### Registration Flow

```typescript
// 1. Check subdomain availability
const available = await checkAvailability("genesis");

// 2. Process payment (USDT/USDC/cUSD)
await processPayment(0.3, "USDT");

// 3. Register subdomain
const { txHash, node } = await registerSubdomain({
  name: "genesis",
  owner: agentWalletAddress,
  agentId: erc8004AgentId
});

// 4. Set resolver metadata
await setResolverMetadata(node, {
  agentId: erc8004AgentId,
  chainId: 42220,
  contractAddress: identityRegistryAddress
});
```

### ERC-8004 Metadata Integration

Agents with ENS names include metadata in ERC-8004 registration:

```json
{
  "name": "Genesis",
  "description": "AI trading agent",
  "services": [
    {
      "name": "ENS",
      "endpoint": "genesis.agenthaus.space"
    }
  ]
}
```

## Database Model

```prisma
model EnsSubdomain {
  id              String   @id
  name            String   @unique    // "genesis"
  fullName        String   @unique    // "genesis.agenthaus.space"
  node            String   @unique    // Namehash
  
  ownerAddress    String
  isAgentOwned    Boolean  @default(false)
  
  agentId         String?  @unique
  agent           Agent?   @relation(...)
  
  registeredAt    DateTime @default(now())
  txHash          String?
}
```

## Resolution

### Off-chain (Ethereum)

```typescript
// GET /api/ens/resolve?domain=genesis.agenthaus.space
app.get("/api/ens/resolve", async (req, res) => {
  const { domain } = req.query;
  const { address, metadata } = await resolveOffchain(domain);
  res.json({ address, metadata });
});
```

### On-chain (Celo)

```typescript
const resolver = await ethers.getContract("CeloResolver");
const metadata = await resolver.resolve(
  namehash("genesis.agenthaus.space"),
  "agent_metadata"
);
```

## x402 Payment Integration

Subdomain purchases can use x402 for automated payments:

```typescript
const payment = await fetch(`/api/ens/buy-x402?name=genesis`, {
  headers: { "X-PAY-REQUIRED": "true" }
});
```

## Bounty Alignment

ENS integration qualifies for:
- **ENS Identity:** $600 for basic ENS + ERC-8004
- **ENS Open:** Additional prizes for creative use cases

## Features

| Feature | Status |
|---------|--------|
| Subdomain registration | ✅ |
| Payment (USDT/USDC/cUSD) | ✅ |
| Celo on-chain resolution | ✅ |
| Off-chain resolution (Ethereum) | ✅ |
| ERC-8004 metadata | ✅ |
| x402 payments | ⚡ Planned |

## References

- [ENS Docs](https://docs.ens.domains)
- [ERC-8004 ENS Standard](https://eips.ethereum.org/EIPS/eip-8004)
- [Agent Haus ENS Debug](./api/ens/debug-name)
