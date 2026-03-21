/**
 * Uniswap Trading API Client
 *
 * Server-side client for the Uniswap Trading API (REST).
 * Handles quote generation, transaction building, and cross-chain swaps.
 *
 * Docs: https://docs.uniswap.org/api/trading/overview
 * Base URL: https://trade-api.gateway.uniswap.org/v1
 *
 * Important: The Trading API does NOT support Celo as a swap chain directly.
 * For Celo-native swaps, use Mento (src/lib/blockchain/mento.ts).
 * This client is for:
 *   - Cross-chain swaps where one endpoint is a supported chain
 *   - Getting quotes on supported chains for tokens the agent holds
 *   - Building swap calldata for supported EVM chains
 */

export interface QuoteRequest {
  type: "EXACT_INPUT" | "EXACT_OUTPUT";
  amount: string;
  tokenIn: string;
  tokenOut: string;
  tokenInChainId: number;
  tokenOutChainId: number;
  swapper: string;
  routingPreference?: "BEST_PRICE" | "CLASSIC" | "DUTCH_V2" | "DUTCH_LIMIT" | "BRIDGE";
  urgency?: "urgent" | "normal" | "slow";
  autoSlippage?: "DEFAULT";
  spreadOptimization?: "EXECUTION" | "PRICE";
  protocols?: ("V2" | "V3" | "V4")[];
  maxSplits?: number;
  permitAmount?: "FULL" | "NONE";
  generatePermitAsTransaction?: boolean;
}

export interface SwapRequest {
  quote: ClassicQuote | DutchQuote | UniswapXOrder;
  permitData?: unknown;
  simulationDeadline?: number;
}

export interface ClassicQuote {
  quoteId?: string;
  input: { amount: string; token: string };
  output: { amount: string; token: string };
  swapper: string;
  source: string;
  totalGas: string;
  gasPrice: string;
  slippage: string;
  route: unknown[];
  requestId?: string;
  gasFeeInCurrency?: { amount: string; token: string };
  priceImpact?: number;
  protocolExceptions?: unknown[];
}

export interface DutchQuote {
  quoteId?: string;
  input: { amount: string; token: string };
  output: { amount: string; token: string };
  swapper: string;
  slippage: string;
  startAmount: string;
  endAmount: string;
  startTime: number;
  deadline: number;
  offerNumber?: number;
  exclusiveFiller?: string;
  exclusivityOverrideBps?: number;
  requestId?: string;
}

export interface UniswapXOrder {
  requestId?: string;
  encodedOrder?: string;
  orderHash?: string;
  exclusiveFiller?: string;
  exclusivityOverrideBps?: number;
}

export interface SwapCalldata {
  to: string;
  data: string;
  value: string;
  chainId: number;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gas?: string;
  permitData?: unknown;
}

export interface SwapResponse {
  transactionRequest: SwapCalldata;
  quote: ClassicQuote | DutchQuote | UniswapXOrder;
}

export interface CheckApprovalRequest {
  token: string;
  chainId: number;
  owner: string;
  spender: string;
}

export interface ApprovalStatus {
  amount: string;
  token: string;
  owner: string;
  spender: string;
  needsApproval: boolean;
  approvalDeadline?: string;
}

const API_BASE = "/api/uniswap";

async function post<T>(path: string, data: object): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, data }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || err.message || `Uniswap API error: ${res.status}`);
  }

  return res.json();
}

async function get(path: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}/${path}`);
  if (!res.ok) {
    throw new Error(`Uniswap API error: ${res.status}`);
  }
  return res.json();
}

export async function getSupportedChains(): Promise<{ id: number; name: string }[]> {
  const data = (await get("chains")) as { chains: { id: number; name: string }[] };
  return data.chains;
}

export async function checkApproval(req: CheckApprovalRequest): Promise<ApprovalStatus> {
  return post("/check_approval", req);
}

export async function getQuote(req: QuoteRequest): Promise<ClassicQuote | DutchQuote> {
  const result = await post<{ input?: unknown; output?: unknown; swapper?: string; quoteId?: string; transactionRequest?: unknown; requestId?: string }>("/quote", req);
  return result as ClassicQuote | DutchQuote;
}

export async function buildSwap(req: SwapRequest): Promise<SwapResponse> {
  return post("/swap", req);
}

export interface ParsedSwapResult {
  success: boolean;
  txHash?: string;
  calldata?: SwapCalldata;
  quote?: ClassicQuote | DutchQuote;
  error?: string;
  chainId?: number;
  swapper?: string;
}

export async function executeUniswapSwap(
  quoteRequest: QuoteRequest
): Promise<ParsedSwapResult> {
  try {
    const quote = await getQuote(quoteRequest);

    if (!quoteRequest.swapper) {
      return { success: false, error: "Missing swapper address" };
    }

    const isClassic = "source" in quote;
    if (isClassic) {
      const swapRes = await buildSwap({ quote: quote as ClassicQuote });
      return {
        success: true,
        calldata: swapRes.transactionRequest,
        quote,
        chainId: quoteRequest.tokenInChainId,
        swapper: quoteRequest.swapper,
      };
    }

    return {
      success: true,
      quote,
      calldata: undefined,
      chainId: quoteRequest.tokenInChainId,
      swapper: quoteRequest.swapper,
      error: "Dutch/ UniswapX quotes require additional signing flow via wallet",
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
