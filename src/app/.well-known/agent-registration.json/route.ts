/**
 * Agent Haus Agent Registration - Well-Known Endpoint
 * 
 * Implements .well-known/agent-registration.json for endpoint verification.
 * Per ERC-8004 best practices: https://best-practices.8004scan.io/docs/01-agent-metadata-standard.html
 * 
 * This file at /.well-known/agent-registration.json verifies that agenthaus.space
 * is a legitimate agent deployment platform.
 */

import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space";
  
  const agentRegistration = {
    name: "Agent Haus",
    description: "No-code AI agent deployment platform on Celo with ERC-8004 identity and Self Protocol verification",
    image: `${baseUrl}/icon.png`,
    agenthaus_space: baseUrl,
    services: [
      {
        name: "agent-deployment",
        endpoint: `${baseUrl}/dashboard`,
        description: "Web interface for deploying and managing AI agents"
      },
      {
        name: "agent-api",
        endpoint: `${baseUrl}/api`,
        description: "REST API for agent operations"
      },
      {
        name: "agent-chat",
        endpoint: `${baseUrl}/api/chat`,
        description: "Chat interface for interacting with agents"
      }
    ],
    version: "1.0.0",
    platform: "Agent Haus",
    deployedBy: "agenthaus.space",
    supportedStandards: ["erc-8004", "selfxyz", "a2a", "mcp"],
    chainId: 42220,
    identityRegistry: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    reputationRegistry: "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63"
  };

  return NextResponse.json(agentRegistration, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
