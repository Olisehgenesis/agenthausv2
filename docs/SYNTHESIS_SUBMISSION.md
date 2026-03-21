# The Synthesis — Project Submission

> Hackathon submission guide for Agent Haus.

## Project Info

| Field | Value |
|-------|-------|
| **Name** | Agent Haus |
| **Repo** | https://github.com/Olisehgenesis/agenthausv2 |
| **Live** | https://agenthaus.space |
| **Tracks** | Best Agent on Celo, Self Protocol, ENS, ERC-8004, Filecoin |
| **Harness** | opencode (this agent) |
| **Framework** | other (custom Next.js + Viem + SelfClaw) |

## Track UUIDs (from synthesis.devfolio.co/catalog)

| Prize | Track | UUID |
|-------|-------|------|
| Best Agent on Celo | Celo | `f8fd563011e7456fa6f980a158dc7ee1` |
| Best Self Protocol Integration | Self | `01a54f28f7be4a53813a30160230d3f1` |
| ERC-8004 (Agents With Receipts) | Protocol Labs | `2aa04e34ca7842d6bfba26235d550293` |
| Let the Agent Cook | Protocol Labs | `78f1416489d34fc1b80d87081d6d809c` |
| ENS Identity | ENS | `7fc6b435698f4395b71c4f77467e3149` |
| ENS Communication | ENS | `8893de956d2a4f5994a6ff8fe3b877d6` |
| ENS Open Integration | ENS | `8856de0e8ccf4b64ac1cc7f852875313` |
| Agentic Storage (Filecoin) | Filecoin | `7c18c11d9361415bb2874a0fdb59d648` |
| Best Use of Delegations | MetaMask | `e189977c731c4be0890a34c704daa69f` |

## Submission Checklist

### Pre-Submission

- [x] All team members self-custody transferred
- [x] Repo public: `github.com/Olisehgenesis/agenthausv2`
- [x] Live demo: `agenthaus.space`
- [x] ERC-8004 agents registered on Celo (11 agents, IDs #18, #19, #22, #23, #24, #122, #128, #1823, #1826, #2113)
- [x] SelfClaw ZK verification live
- [x] ENS subdomains deployed (genesis.agenthaus.space, etc.)
- [x] Filecoin/Storacha storage integrated

### Submission Fields

```json
{
  "name": "Agent Haus",
  "description": "No-code AI agent platform on Celo. Deploy ERC-8004 agents with built-in wallets, chat interfaces, and Self.xyz verification.",
  "problemStatement": "Deploying and managing AI agents with real on-chain identity, wallets, and trading capabilities requires significant technical expertise. Agent Haus makes this accessible to anyone — no code required.",
  "repoURL": "https://github.com/Olisehgenesis/agenthausv2",
  "deployedURL": "https://agenthaus.space",
  "trackUUIDs": [
    "f8fd563011e7456fa6f980a158dc7ee1",
    "01a54f28f7be4a53813a30160230d3f1",
    "2aa04e34ca7842d6bfba26235d550293",
    "8856de0e8ccf4b64ac1cc7f852875313",
    "7fc6b435698f4395b71c4f77467e3149",
    "7c18c11d9361415bb2874a0fdb59d648"
  ],
  "conversationLog": "See this document and the repo's commit history for full build process.",
  "submissionMetadata": {
    "agentFramework": "other",
    "agentFrameworkOther": "custom: Next.js + Prisma + Viem + SelfClaw SDK",
    "agentHarness": "opencode",
    "model": "claude-sonnet-4-20250514",
    "skills": [
      "web-search",
      "solidity-best-practices",
      "typescript-best-practices",
      "react-best-practices",
      "celo-developer",
      "defi-developer"
    ],
    "tools": [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Viem",
      "Wagmi",
      "Reown AppKit",
      "SelfClaw SDK",
      "Pinata IPFS",
      "Storacha",
      "Mento Protocol",
      "ERC-8004",
      "ERC-4337",
      "ENS",
      "Vercel"
    ],
    "helpfulResources": [
      "https://docs.celo.org",
      "https://eips.ethereum.org/EIPS/eip-8004",
      "https://docs.storacha.network",
      "https://docs.metamask.io/delegation-toolkit/",
      "https://docs.mento.org"
    ],
    "intention": "continuing",
    "intentionNotes": "Agent Haus will continue development post-hackathon with ERC-7715 permissions, ACP integration, and cross-chain support."
  }
}
```

## Key On-Chain Artifacts

| Artifact | Chain | Explorer |
|----------|-------|----------|
| ERC-8004 Agents | Celo Mainnet | 8004scan.io/agents/celo |
| ENS Registrar | Celo Mainnet | `0x5785A2422...` |
| Identity Registry | Celo Mainnet | `0x8004A169FB...` |
| Reputation Registry | Celo Mainnet | `0x8004BAa17C...` |

## Agents Deployed

| Agent | ERC-8004 ID | Score |
|-------|-------------|-------|
| Genesis | #2113 | 79 |
| Haus | #1823 | 78 |
| Haus Child | #1826 | 78 |
| fire agent | #18 | 79 |
| genesis | #19 | 78 |
| TradingMento | #22 | 78 |
| Gnes | #23 | 78 |
| Mento Trader | #24 | 78 |
| Mini Send | #128 | 78 |
| Parrot | #122 | 78 |
| Sam Agents | #15 | 78 |

## Submission Command

```bash
# Create project
curl -X POST https://synthesis.devfolio.co/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-synth-c151fd39f5dc7281c83904adad48e44d6c2e02836e296ca1" \
  -d @submission_payload.json

# Publish (after all team members are self-custody)
curl -X POST https://synthesis.devfolio.co/projects/<uuid>/publish \
  -H "Authorization: Bearer sk-synth-c151fd39f5dc7281c83904adad48e44d6c2e02836e296ca1"
```
