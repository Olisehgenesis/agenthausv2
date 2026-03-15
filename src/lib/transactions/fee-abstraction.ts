import { createPublicClient, http, type Address, type Hash, type Hex, formatEther, parseEther } from "viem";
import { celo } from "viem/chains";

/**
 * Celo Fee Abstraction Constants (Mainnet)
 */
export const FEE_TOKENS = {
  CELO: {
    symbol: "CELO",
    address: "0x471EcE3750Da237f93B8E299745289111F11a291", // Native gas
    adapter: undefined, 
    decimals: 18,
  },
  cUSD: {
    symbol: "cUSD",
    address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    adapter: "0x765DE816845861e75A25fCA122bb6898B8B1282a", // Native stable
    decimals: 18,
  },
  USDC: {
    symbol: "USDC",
    address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
    adapter: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B", // Adapter address for feeCurrency
    decimals: 6,
  },
  USDT: {
    symbol: "USDT",
    address: "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
    adapter: "0x0e2a3e05bc9a16f5292a6170456a710cb89c6f72", // Adapter address for feeCurrency
    decimals: 6,
  },
};

export type FeeTokenSymbol = keyof typeof FEE_TOKENS;

/**
 * Utility to identify the best fee currency based on user balances.
 * Prioritizes cUSD -> USDC -> USDT -> CELO.
 */
export async function getBestFeeCurrency(userAddress: Address) {
  const publicClient = createPublicClient({
    chain: celo,
    transport: http(),
  });

  // Check balances
  // For USDC/USDT adapters, balanceOf returns 18-decimal normalized values.
  const checks = await Promise.all([
    publicClient.getBalance({ address: userAddress }), // CELO
    publicClient.readContract({
      address: FEE_TOKENS.cUSD.address as Address,
      abi: [{ name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "balance", type: "uint256" }] }],
      functionName: "balanceOf",
      args: [userAddress],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: FEE_TOKENS.USDC.adapter as Address,
      abi: [{ name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "balance", type: "uint256" }] }],
      functionName: "balanceOf",
      args: [userAddress],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: FEE_TOKENS.USDT.adapter as Address,
      abi: [{ name: "balanceOf", type: "function", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "balance", type: "uint256" }] }],
      functionName: "balanceOf",
      args: [userAddress],
    }) as Promise<bigint>,
  ]);

  const [celoBal, cusdBal, usdcBal, usdtBal] = checks;

  // threshold for gas (approx 0.1 normalized unit)
  const threshold = parseEther("0.1");

  if (cusdBal > threshold) return FEE_TOKENS.cUSD;
  if (usdcBal > threshold) return FEE_TOKENS.USDC;
  if (usdtBal > threshold) return FEE_TOKENS.USDT;
  if (celoBal > threshold) return FEE_TOKENS.CELO;

  return FEE_TOKENS.CELO; // Fallback
}

/**
 * Wraps a transaction request with the appropriate fee fields for Celo.
 */
export async function prepareCeloTransaction(
  userAddress: Address,
  txRequest: { to: Address; data: Hex; value?: bigint }
) {
  const bestToken = await getBestFeeCurrency(userAddress);

  return {
    ...txRequest,
    feeCurrency: bestToken.adapter as Address | undefined,
    type: "0x7b" as const, // CIP-64
  };
}
