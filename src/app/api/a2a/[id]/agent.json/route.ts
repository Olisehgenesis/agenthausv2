/**
 * A2A (Agent-to-Agent) Protocol - Agent Card endpoint
 * 
 * Implements the Agent Card specification for agent discoverability.
 * @see https://a2a.proto.dev/
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: agentId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space";

    const agentCard = {
      name: "Agent Haus Agent",
      description: "AI agent deployed on Agent Haus platform with ERC-8004 identity",
      url: `${baseUrl}/api/agents/${agentId}`,
      provider: {
        organization: "Agent Haus",
        url: baseUrl
      },
      version: "1.0.0",
      capabilities: {
        streaming: true,
        pushNotifications: true,
        stateTransitionHistory: true
      },
      authentication: {
        schemes: ["bearer", "jwt"]
      },
      endpoints: {
        primary: `${baseUrl}/api/chat/${agentId}`,
        mcp: `${baseUrl}/api/mcp/${agentId}`,
        reputation: `${baseUrl}/api/agents/${agentId}/reputation/summary`,
        skills: `${baseUrl}/api/agents/${agentId}/skills`
      },
      skills: [
        {
          id: "erc8004-identity",
          name: "ERC-8004 Identity",
          description: "On-chain agent identity and registration"
        },
        {
          id: "celo-payments",
          name: "Celo Payments",
          description: "Send and receive CELO and stablecoins on Celo"
        },
        {
          id: "selfxyz-verification",
          name: "Self.xyz Verification",
          description: "Humanity proof via Self Protocol"
        }
      ],
      defaultInputModes: ["text", "json"],
      defaultOutputModes: ["text", "json"],
      protocols: ["erc8004", "selfxyz", "a2a"],
      chainId: 42220
    };

    return NextResponse.json(agentCard, {
      headers: {
        "Content-Type": "application/json",
        "X-Agent-Card-Version": "1.0"
      }
    });
  } catch (error) {
    console.error("A2A agent card error:", error);
    return NextResponse.json({ error: "Failed to get agent card" }, { status: 500 });
  }
}
