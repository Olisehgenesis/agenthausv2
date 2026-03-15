# ENS Subdomain Deployment Data

This file contains important addresses and details for the Agent Haus ENS implementation.

## Ethereum Mainnet (Off-chain Resolution)
- **OffchainResolver Contract:** `0x1F3c0902e2c05D53Af2Cd00bd3F0a62EC4000942`
- **Gateway URL:** `https://agenthaus.space/api/ens/resolve`
- **Parent Domain:** `agenthaus.space`

## Celo Mainnet (On-chain Registrar & Resolver)
- **AgentHausRegistrar:** `0x5785A2422d51c841C19773161213ECD12dBB50d4`
- **Celo Resolver:** `0x5785A2422d51c841C19773161213ECD12dBB50d4`
- **USDT Address:** `0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e`
- **USDC Address:** `0xcebA9300f2b948710d2653dD7B07f33A8B32118C`
- **cUSD Address:** `0x765DE816845861e75A25fCA122bb6898B8B1282a`

## Implementation Details
- **Fee:** 0.3 stablecoin units (USDT/USDC/cUSD)
- **Pattern:** UUPS Upgradeable Proxy
- **Database Model:** `EnsSubdomain` (Tracks ownerAddress, agentId, txHash)
