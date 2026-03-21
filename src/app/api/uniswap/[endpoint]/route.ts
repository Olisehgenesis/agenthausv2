/**
 * Uniswap Trading API Proxy Route
 *
 * Proxies requests to the Uniswap Trading API to avoid CORS restrictions
 * when calling from the browser. All requests require the server-side API key.
 *
 * Docs: https://docs.uniswap.org/api/trading/overview
 * Base URL: https://trade-api.gateway.uniswap.org/v1
 */

import { NextRequest, NextResponse } from "next/server";

const UNISWAP_API_BASE = "https://trade-api.gateway.uniswap.org/v1";

function getApiKey(): string {
  const key = process.env.UNISWAP_API_KEY;
  if (!key) {
    throw new Error("UNISWAP_API_KEY environment variable is not set");
  }
  return key;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, path } = body;

    const validPaths = ["/quote", "/swap", "/check_approval"];
    if (!path || !validPaths.includes(path)) {
      return NextResponse.json(
        { error: `Invalid endpoint path. Supported: ${validPaths.join(", ")}` },
        { status: 400 }
      );
    }

    const apiKey = getApiKey();
    const uniswapRes = await fetch(`${UNISWAP_API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-universal-router-version": "2.0",
        accept: "application/json",
      },
      body: JSON.stringify(body.data || {}),
    });

    const data = await uniswapRes.json();

    if (!uniswapRes.ok) {
      return NextResponse.json(
        { error: data.message || data.error || "Uniswap API error", details: data },
        { status: uniswapRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("UNISWAP_API_KEY")) {
      return NextResponse.json({ error: "Uniswap API key not configured" }, { status: 500 });
    }
    console.error("[UniswapProxy] Error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    const validEndpoints = ["chains", "tokens"];
    if (!endpoint || !validEndpoints.includes(endpoint)) {
      return NextResponse.json(
        { error: `Invalid endpoint. Supported: ${validEndpoints.join(", ")}` },
        { status: 400 }
      );
    }

    if (endpoint === "chains") {
      return NextResponse.json({
        chains: [
          { id: 1, name: "Ethereum" },
          { id: 10, name: "Optimism" },
          { id: 137, name: "Polygon" },
          { id: 42161, name: "Arbitrum One" },
          { id: 43114, name: "Avalanche C-Chain" },
          { id: 8453, name: "Base" },
          { id: 11155111, name: "Sepolia" },
          { id: 11155420, name: "Optimism Sepolia" },
          { id: 421614, name: "Arbitrum Sepolia" },
          { id: 84532, name: "Base Sepolia" },
          { id: 534352, name: "Scroll" },
          { id: 59144, name: "Linea" },
          { id: 42220, name: "Celo" },
          { id: 56, name: "BNB Smart Chain" },
          { id: 100, name: "Gnosis" },
        ],
        note: "Celo is listed but execution requires Celo RPC + signing infrastructure",
      });
    }

    return NextResponse.json({ error: "Unknown endpoint" }, { status: 400 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
