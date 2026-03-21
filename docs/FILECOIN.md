# Filecoin Storage

> Decentralized, censorship-resistant storage for AI agents via Storacha (Filecoin) + Pinata IPFS.

## Overview

Agent Haus integrates **Filecoin via Storacha** and **Pinata IPFS** for persistent, verifiable storage of agent data:
- Conversation history
- Agent memory / context
- Task state
- Agent metadata

## Implementation

Two storage backends are available:

| Backend | Status | Use Case |
|---------|--------|----------|
| **Storacha** (`@storacha/client`) | ✅ Infrastructure ready | Hot storage, CDN-speed retrieval, Filecoin persistence |
| **Pinata IPFS** | ✅ Production | ERC-8004 metadata, agent JSON, file uploads |

### Storage Files

| File | Purpose |
|------|---------|
| `src/lib/storage/storacha.ts` | Storacha client — upload, directory, CAR |
| `src/lib/storage/ipfs-storage.ts` | Pinata IPFS — storeJSON, storeData, retrieve |
| `src/lib/storage/ipfs-car.ts` | CAR packaging + extraction for Filecoin |

### Prerequisites

```bash
pnpm add @storacha/client
```

## Core APIs

### Storacha (Filecoin)

```typescript
import { uploadToStoracha, uploadJSON, uploadDirectory } from "@/lib/storage/storacha";

// Upload any file
const result = await uploadToStoracha(content, "report.txt");
// { cid: "bafy...", url: "https://bafy...ipfs.storacha.link", size: 1024 }

// Upload JSON
const json = await uploadJSON({ agentId: "123", memory: [...] }, "memory.json");

// Upload directory
await uploadDirectory([
  { name: "state.json", content: JSON.stringify(state) },
  { name: "history.json", content: JSON.stringify(history) },
]);
```

### Pinata IPFS

```typescript
import { storeJSON, storeData, retrieveJSON, storeAgentUserData } from "@/lib/storage/ipfs-storage";

// Store JSON to IPFS via Pinata
const result = await storeJSON({ name: "Genesis", trades: [...] }, "agent-data.json");
// { cid: "Qm...", url: "https://ipfs.io/ipfs/Qm...", size: 2048 }

// Retrieve from any IPFS gateway
const data = await retrieveJSON(cid);

// Store agent data with metadata
const pkg = await storeAgentUserData(agentId, ownerAddress, userData, "conversation");
```

### CAR (Content Addressable aRchives)

```typescript
import { packDataToCar, uploadCarToStoracha, extractCar } from "@/lib/storage/ipfs-car";

// Pack conversation history into CAR and upload to Storacha/Filecoin
const { carBlob, rootCid } = await packDataToCar(conversationHistory, "history.json");
const uploaded = await uploadCarToStoracha(carBlob, "conversation.car");

// Retrieve and extract
const { files } = await extractCar(uploaded.carBlob);
```

## Storage Skills

Agents can use storage via these skills:

| Skill | Description |
|-------|-------------|
| `SAVE_MEMORY` | Save agent memory/conversation to Filecoin via Storacha |
| `LOAD_MEMORY` | Load agent memory from IPFS/Storacha |
| `SAVE_DATA` | Store arbitrary JSON data to IPFS |
| `LOAD_DATA` | Retrieve data from IPFS by CID |

## Use Cases

| Use Case | Implementation |
|----------|---------------|
| **Conversation Persistence** | Pinata IPFS via `storeAgentUserData` |
| **Agent Memory** | Storacha CAR upload |
| **ERC-8004 Metadata** | Pinata IPFS via `uploadJSON` |
| **Cross-Agent Sharing** | Content-addressed CIDs via Storacha |

## Bounty Alignment

- **Filecoin Bounty:** $1K / $700 / $500 for decentralized agent storage
- **Storacha Integration:** Cross-chain storage for agent memory

## Comparison: Pinata vs Storacha

| Feature | Pinata | Storacha |
|---------|--------|----------|
| IPFS Pinning | ✅ | ✅ |
| Filecoin Persistence | ❌ | ✅ |
| CDN-Speed Retrieval | Partial | ✅ |
| Free Tier | 1GB | 5GB |
| CAR Support | ❌ | ✅ |
| UCAN Auth | ❌ | ✅ |
| ERC-8004 Metadata | ✅ | ✅ |

## References

- [Storacha Docs](https://docs.storacha.network)
- [Filecoin Onchain Cloud](https://filecoin.io/blog/posts/the-2026-filecoin-network-strategy/)
- [Pinata API](https://docs.pinata.cloud)
- [MCP-IPFS](https://github.com/web3-storage/mcp-ipfs)
- [LangChain Storacha Tool](https://github.com/web3-storage/langchain-storacha)
- [Awesome Storacha](https://github.com/storacha/awesome-storacha)
