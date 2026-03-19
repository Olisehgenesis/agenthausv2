/**
 * MCP Server endpoint for Agent Haus agents.
 * Implements Model Context Protocol for agent discoverability and interaction.
 * 
 * @see https://modelcontextprotocol.io/
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: agentId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space";
    
    const mcpServer = {
      name: "Agent Haus MCP Server",
      version: "1.0.0",
      description: "MCP server for Agent Haus AI agents on Celo blockchain",
      tools: [
        {
          name: "get_agent_info",
          description: "Get information about an Agent Haus agent including identity and capabilities",
          inputSchema: {
            type: "object",
            properties: {
              agent_id: { type: "string", description: "The agent ID" }
            },
            required: ["agent_id"]
          }
        },
        {
          name: "list_agents",
          description: "List all available Agent Haus agents",
          inputSchema: {
            type: "object",
            properties: {
              template_type: { type: "string", enum: ["payment", "trading", "forex", "social", "custom"] },
              verified_only: { type: "boolean", description: "Only return verified agents" }
            }
          }
        },
        {
          name: "send_message",
          description: "Send a message to an Agent Haus agent",
          inputSchema: {
            type: "object",
            properties: {
              agent_id: { type: "string" },
              message: { type: "string" },
              user_wallet: { type: "string" }
            },
            required: ["agent_id", "message"]
          }
        },
        {
          name: "execute_transaction",
          description: "Execute a blockchain transaction through an agent",
          inputSchema: {
            type: "object",
            properties: {
              agent_id: { type: "string" },
              action: { type: "string", enum: ["send_celo", "send_token", "deploy_token"] },
              params: { type: "object" }
            },
            required: ["agent_id", "action"]
          }
        }
      ],
      resources: [
        {
          uri: `${baseUrl}/api/mcp/agents`,
          name: "Agent Registry",
          description: "Registry of all Agent Haus agents"
        },
        {
          uri: `${baseUrl}/api/mcp/agents/{id}`,
          name: "Agent Details",
          description: "Details for a specific agent"
        }
      ],
      agentEndpoint: `${baseUrl}/api/agents/${agentId}`,
      protocols: ["erc8004", "selfxyz"]
    };

    return NextResponse.json(mcpServer);
  } catch (error) {
    console.error("MCP server error:", error);
    return NextResponse.json({ error: "Failed to get MCP server info" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: agentId } = await params;
    const body = await request.json();
    const { method, params: toolParams } = body;

    switch (method) {
      case "get_agent_info": {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space"}/api/public/agents/${toolParams?.agent_id || agentId}`);
        const data = await response.json();
        return NextResponse.json({ result: data });
      }

      case "list_agents": {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space"}/api/public/agents`);
        const data = await response.json();
        
        let agents = data.agents || [];
        if (toolParams?.template_type) {
          agents = agents.filter((a: any) => a.templateType === toolParams.template_type);
        }
        if (toolParams?.verified_only) {
          agents = agents.filter((a: any) => a.verified);
        }
        
        return NextResponse.json({ result: { agents, count: agents.length } });
      }

      case "send_message": {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://agenthaus.space"}/api/chat/${toolParams?.agent_id || agentId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: toolParams?.message,
            userWallet: toolParams?.user_wallet
          })
        });
        const data = await response.json();
        return NextResponse.json({ result: data });
      }

      default:
        return NextResponse.json({ error: `Unknown method: ${method}` }, { status: 400 });
    }
  } catch (error) {
    console.error("MCP tool call error:", error);
    return NextResponse.json({ error: "Tool execution failed" }, { status: 500 });
  }
}
