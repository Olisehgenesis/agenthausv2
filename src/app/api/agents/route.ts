import { NextResponse } from "next/server";
import { prisma, withPrismaRetry } from "@/lib/db";
import { getNextDerivationIndex, deriveAddress } from "@/lib/blockchain/wallet";

// GET /api/agents - List all agents for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerAddress = searchParams.get("ownerAddress");

    if (!ownerAddress) {
      return NextResponse.json({ error: "Owner address required" }, { status: 400 });
    }

    // Find user
    const user = await withPrismaRetry((db) =>
      db.user.findUnique({
        where: { walletAddress: ownerAddress },
      })
    );

    if (!user) {
      return NextResponse.json({ agents: [] });
    }

    const agents = await withPrismaRetry((db) =>
      db.agent.findMany({
        where: { ownerId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
          transactions: {
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          activityLogs: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
          verification: {
            select: {
              selfxyzVerified: true,
              humanId: true,
              verifiedAt: true,
              publicKey: true,
            },
          },
        },
      })
    );

    return NextResponse.json({ agents });
  } catch (error) {
    console.error("Failed to fetch agents:", error);
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}

// POST /api/agents - Create a new agent
// Agent is immediately usable (active). ERC-8004 on-chain registration is a separate step.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      templateType,
      systemPrompt,
      llmProvider,
      llmModel,
      spendingLimit,
      configuration,
      ownerAddress,
      walletOption,
      erc8004AgentId,
      externalAgentId,
      erc8004ChainId,
      erc8004URI,
      publicKey,
      source,
    } = body;

    if (!name || !templateType || !ownerAddress) {
      return NextResponse.json(
        { error: "Name, template type, and owner address are required" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await withPrismaRetry((db) =>
      db.user.findUnique({
        where: { walletAddress: ownerAddress },
      })
    );

    if (!user) {
      user = await withPrismaRetry((db) =>
        db.user.create({
          data: {
            walletAddress: ownerAddress,
          },
        })
      );
    }

    // Wallet assignment based on walletOption
    let agentWalletAddress: string | null = body.agentWalletAddress || null;
    let walletDerivationIndex: number | null = null;

    const effectiveWalletOption = walletOption || (source === "import" ? "later" : "dedicated");
    if (effectiveWalletOption === "dedicated" || effectiveWalletOption === "metamask_session") {
      // metamask_session: derive a wallet now, ERC-7715 session key flow happens post-creation
      try {
        walletDerivationIndex = await getNextDerivationIndex();
        agentWalletAddress = deriveAddress(walletDerivationIndex);
      } catch (walletErr) {
        console.warn("Could not derive agent wallet (AGENT_MNEMONIC not set?):", walletErr);
      }
    } else if (effectiveWalletOption === "owner") {
      agentWalletAddress = ownerAddress;
      walletDerivationIndex = null;
    }
    // walletOption === "later" or source === "import" → both remain as provided or null

    // Create agent in database with status "deploying".
    // The client will trigger ERC-8004 on-chain registration (wallet signature),
    // then call /api/agents/{id}/deploy to activate once the tx confirms.
    const agent = await withPrismaRetry((db) =>
      db.agent.create({
        data: {
          name,
          description,
          templateType,
          systemPrompt,
          llmProvider: llmProvider || "groq",
          llmModel: llmModel || "llama-3.3-70b-versatile",
          spendingLimit: spendingLimit || 100,
          configuration: configuration ? JSON.stringify(configuration) : null,
          ownerId: user.id,
          agentWalletAddress,
          walletDerivationIndex,
          walletType: effectiveWalletOption,
          status: source === "import" ? "active" : "deploying",
          deployedAt: source === "import" ? new Date() : null,
          erc8004AgentId: erc8004AgentId || externalAgentId,
          erc8004ChainId: erc8004ChainId ? parseInt(erc8004ChainId) : undefined,
          erc8004URI,
          verification: publicKey ? {
            create: {
              publicKey,
              encryptedPrivateKey: "", // No private key for imported agents
              status: "verified",
            }
          } : undefined,
        },
      })
    );
    
    const activityMessage = source === "import" 
      ? `Agent "${name}" imported from ${erc8004ChainId ? `chain ${erc8004ChainId}` : "external source"}`
      : `Agent "${name}" created with ${llmProvider || "groq"}/${llmModel || "default"}`;

    if (agentWalletAddress) {
      await withPrismaRetry((db) =>
        db.activityLog.create({
          data: {
            agentId: agent.id,
            type: "info",
            message:
              effectiveWalletOption === "owner"
                ? `Using owner wallet: ${agentWalletAddress}`
                : `HD wallet derived: ${agentWalletAddress}`,
          },
        })
      );
    }

    await withPrismaRetry((db) =>
      db.activityLog.create({
        data: {
          agentId: agent.id,
          type: "info",
          message: "Agent created — awaiting on-chain ERC-8004 registration to activate.",
        },
      })
    );

    // Return the created agent
    const createdAgent = await withPrismaRetry((db) =>
      db.agent.findUnique({
        where: { id: agent.id },
        include: {
          activityLogs: { orderBy: { createdAt: "desc" }, take: 5 },
        },
      })
    );

    return NextResponse.json(createdAgent, { status: 201 });
  } catch (error) {
    console.error("Failed to create agent:", error);
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 });
  }
}
