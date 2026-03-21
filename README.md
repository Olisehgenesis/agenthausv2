# Agent Haus

> **Deploy AI agents on Celo in minutes. Give them wallets. Watch them work.**

Agent Haus is a no-code platform for deploying, managing, and using ERC-8004 AI agents on Celo — with built-in wallets, chat interfaces, Self.xyz verification, and a full trading stack.

**App URL: [https://agenthaus.space](https://agenthaus.space)**

**Live at [agenthaus.space](https://agenthaus.space) | Source: [github.com/Olisehgenesis/agentforge](https://github.com/Olisehgenesis/agentforge)**

## Current repository status

- Updated to use updated webhook and task processing logic (`/api/webhooks/price-update`)
- Agent dashboard links now correctly resolve to `/dashboard/agents/{agentId}`
- Price triggers and cron tasks now have robust status handling and failure logging
- UI marquee cards now open HAUS profile URLs instead of `/chat` pages

---

## What You Can Build

| Use Case | Agent Type | Example |
|----------|-----------|---------|
| Send stablecoins on request | Payment Agent | "send 10 cUSD to 0x..." |
| Swap CELO ↔ stablecoins | Trading Agent | "buy 50 cUSD if CELO drops 5%" |
| Track FX rates, hedge exposure | Forex Agent | "alert me when cEUR deviates 2%" |
| Community engagement + tips | Social Agent | "tip @user 0.5 CELO" |
| Custom on-chain automation | Custom Agent | Any combination |

---

## Features

### Deploy in Minutes
Pick a template → Configure LLM + prompt → Sign to register on-chain. That's it. Your agent gets a unique ERC-8004 `agentId` on Celo and is discoverable at [8004scan.io](https://www.8004scan.io).

### Built-In Wallet
Every agent gets an HD wallet (`m/44'/60'/0'/0/{n}`) derived from a master mnemonic. No seed phrases to manage. Gas can be paid in CELO or stablecoins (Celo fee abstraction).

### Prove Humanity
Agents verify via [Self.xyz](https://self.xyz) — ZK passport proofs. Users scan a QR with the Self app; agents prove they're backed by a real human without exposing personal data. SelfClaw integration handles the full flow.

### Chat with Your Agent
Natural language → transactions. Agents parse intent, show confirmation, execute on-chain. Available via web dashboard, Telegram, Discord. No code required on either side.

### Full Trading Stack
Built on Mento Protocol (Celo's native DEX):
- Live CELO ↔ cUSD/cEUR/cREAL swap quotes and execution
- Price tracking, trend analysis, momentum predictions
- Stop-loss / take-profit via price triggers
- Portfolio tracking in USD
- Time-based triggers (cron scheduling)
- On-chain oracle data via SortedOracles

### Decentralized Storage
Agents can save conversation history, memory, and state to Filecoin via Storacha and Pinata IPFS. Content-addressed CIDs ensure tamper-proof retrieval.

### ERC-8004 Identity
On-chain identity standard gives every agent:
- Unique `agentId` (NFT token ID)
- Public metadata (name, description, services, wallet)
- Registration on Celo Identity Registry
- Reputation via on-chain feedback
- MCP + A2A discovery endpoints

### ENS Names
Give your agent a memorable name: `genesis.agenthaus.space`. Subdomains are registered on-chain via Agent Haus ENS registrar. Portable across the Ethereum ecosystem.

### Agent Economy
Verified agents can:
- Deploy their own ERC-20 token
- Log revenue and costs
- Request liquidity sponsorship
- Build a public activity feed

---

## User Journey

### Step 1 — Connect Wallet
Open [agenthaus.space](https://agenthaus.space), click **Connect Wallet**. Choose MetaMask, WalletConnect, Coinbase, or any Celo-compatible wallet via Reown AppKit.

### Step 2 — Create Your Agent
1. Click **Create Agent**
2. Pick a template (Payment, Trading, Forex, Social, Custom)
3. Name your agent and write a description
4. Pick an LLM (Claude, GPT-4o, Gemini, Groq, DeepSeek, or free OpenRouter models)
5. Set a daily spending limit ($10–$10K USD)
6. Choose wallet: **Dedicated HD** (recommended), **Owner Proxy** (read-only), or **Deferred** (bind later)

### Step 3 — Configure
- Edit the system prompt to define your agent's personality and capabilities
- Connect Telegram or Discord for channel-based chat
- Set cron jobs for automated tasks

### Step 4 — Register On-Chain
Sign with your wallet to register on the ERC-8004 Identity Registry. Your agent gets an `agentId` and appears on 8004scan. This costs gas in CELO.

### Step 5 — Verify (Optional)
Start Self.xyz verification in the agent dashboard. The agent generates an Ed25519 key, you scan a QR, and the agent is marked as human-backed. Opens the SelfClaw economy.

### Step 6 — Chat & Use
Open the agent's chat tab. Ask it to send payments, execute swaps, check prices, set triggers, save data to IPFS. Everything is on-chain and verifiable.

---

## Prize Tracks (The Synthesis Hackathon)

| Prize | Amount | Status |
|-------|--------|--------|
| [Best Agent on Celo](https://synthesis.devfolio.co/catalog/prizes.md?track=celo) | $3K / $2K | ✅ 11 agents live |
| [Best Self Protocol Integration](https://synthesis.devfolio.co/catalog/prizes.md?track=self) | $1K | ✅ SelfClaw ZK verification |
| [ENS Identity](https://synthesis.devfolio.co/catalog/prizes.md?track=ens) | $600 / $400 | ✅ Subdomains live |
| [ERC-8004 Agents With Receipts](https://synthesis.devfolio.co/catalog/prizes.md?track=protocol%20labs) | $2K / $1.5K | ✅ ERC-8004 registered |
| [Agentic Storage (Filecoin)](https://synthesis.devfolio.co/catalog/prizes.md?track=filecoin) | $1K / $700 | ✅ Storacha + IPFS |
| [Let the Agent Cook](https://synthesis.devfolio.co/catalog/prizes.md?track=protocol%20labs) | $2K / $1.5K | ⚡ Automation in progress |
| [Best Use of Delegations](https://synthesis.devfolio.co/catalog/prizes.md?track=metamask) | $3K / $1.5K / $500 | ⚡ ERC-7715 planned |
| [Agentic Finance](https://synthesis.devfolio.co/catalog/prizes.md?track=uniswap) | $2.5K / $1.5K / $1K | ✅ Mento, Uniswap planned |
| [Build an Agent for Pearl](https://synthesis.devfolio.co/catalog/prizes.md?track=olas) | $1K | ⚡ Planned |
| [ERC-8183 Open Build](https://synthesis.devfolio.co/catalog/prizes.md?track=virtuals) | $2K | ⚡ Planned |

**Stack multiple bounties:** One build qualifies for Celo + Self + ENS + Filecoin + ERC-8004 tracks simultaneously.

---

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| **Blockchain** | Celo L2 (Superchain) | ✅ |
| **Agent Identity** | ERC-8004 (Identity + Reputation Registry) | ✅ |
| **Humanity Proof** | Self.xyz / SelfClaw (ZK passport) | ✅ |
| **Trading Engine** | Mento Protocol (DEX) | ✅ |
| **Wallet Connection** | Reown AppKit (MetaMask, WalletConnect) | ✅ |
| **Agent Wallets** | HD derivation (m/44'/60'/0'/0/n) | ✅ |
| **Spending Limits** | USD-denominated, enforced server-side | ✅ |
| **Permissions** | ERC-7715 (MetaMask Delegation Toolkit) | ⚡ Soon |
| **Session Keys** | Owner approves once via MetaMask, agent operates autonomously | ⚡ Soon |
| **Storage** | Filecoin (Storacha) + Pinata IPFS | ✅ |
| **Messaging** | Telegram, Discord, Web | ✅ |
| **Agent Discovery** | MCP + A2A protocols | ✅ |
| **Domains** | ENS (agenthaus.space subdomains) | ✅ |
| **Payments** | x402 protocol (partial) | ⚡ |

---

## Wallet Options

Choose how your agent handles wallets at creation:

| Option | How It Works | Best For |
|--------|-------------|----------|
| **Dedicated Vault** | Agent gets its own HD wallet, key encrypted in DB | Autonomous agents that operate 24/7 |
| **MetaMask Session** *(coming soon)* | No keys in DB. Owner approves once via MetaMask popup (ERC-7715). Agent uses a session key to operate autonomously. Revocable anytime. | Agents where owner wants control but minimal approval friction |
| **Owner Proxy** | Agent uses owner's address. All sends require owner approval in MetaMask. | Read-only agents, agents needing manual sign-off |
| **Deferred** | Deploy without wallet, bind later via dashboard | Staging or multi-phase deployments |

### ERC-7715 Session Keys

When "MetaMask Session" is selected:
1. Owner connects MetaMask at agent creation
2. Agent requests permission: "Spend up to 50 cUSD/day for 30 days"
3. MetaMask popup — owner approves once
4. Session key created — agent operates autonomously within limits
5. Owner revokes anytime from the dashboard

No private key stored in the database. All permissions are on-chain and verifiable.

---

## Architecture

```
User ──▶ Dashboard (Next.js) ──▶ Skills Engine ──▶ Chat API
         │                              │
         ├── Reown AppKit ──▶ Celo Wallet
         │
         ├── SelfClaw API ──▶ Self.xyz (ZK)
         │
         ├── Mento DEX ──▶ Celo L2
         │
         ├── Pinata/Storacha ──▶ IPFS/Filecoin
         │
         └── ERC-8004 ──▶ Celo Identity Registry
```

---

## Quick Start

```bash
git clone https://github.com/Olisehgenesis/agenthausv2.git
cd agenthausv2
npm install
cp .env.example .env
# Set: DATABASE_URL, ENCRYPTION_SECRET, PINATA_JWT, WALLETCONNECT_PROJECT_ID
npm run db:push
npm run dev
```

Open [http://localhost:3005](http://localhost:3005)

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/agents` | List agents |
| `POST /api/agents` | Create agent |
| `POST /api/chat` | Chat with agent |
| `GET /api/mcp/{id}` | MCP server (tools discovery) |
| `GET /api/a2a/{id}/agent.json` | A2A agent card |
| `GET /api/skills` | List all skills |
| `GET /api/public/agents/{id}` | Public agent info |
| `GET /.well-known/agent-registration.json` | Platform identity |

---

## Contract Addresses (Celo Mainnet)

| Contract | Address |
|----------|---------|
| Identity Registry | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| Reputation Registry | `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` |
| ENS Registrar | `0x5785A2422d51c841C19773161213ECD12dBB50d4` |
| SortedOracles | `0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33` |
| Mento cUSD Exchange | `0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275` |

---

## License

MIT License. Built on Celo. Open source contribution welcome.
