import { 
  createPublicClient, 
  http, 
  type PublicClient, 
  type Chain 
} from "viem";
import { 
  celo, 
  celoSepolia, 
  mainnet, 
  sepolia, 
  base, 
  baseSepolia, 
  polygon, 
  polygonAmoy, 
  arbitrum, 
  arbitrumSepolia, 
  optimism, 
  optimismSepolia, 
  bsc, 
  bscTestnet, 
  linea, 
  avalanche, 
  scroll, 
  gnosis, 
  taiko 
} from "viem/chains";

export const SUPPORTED_ERC8004_CHAINS: Record<number, Chain> = {
  1: mainnet,
  11155111: sepolia,
  42220: celo,
  11142220: celoSepolia,
  8453: base,
  84532: baseSepolia,
  137: polygon,
  80002: polygonAmoy,
  42161: arbitrum,
  421614: arbitrumSepolia,
  10: optimism,
  11155420: optimismSepolia,
  56: bsc,
  97: bscTestnet,
  59144: linea,
  43114: avalanche,
  534352: scroll,
  100: gnosis,
  167000: taiko,
};

const ERC8004_IDENTITY_MAINNET = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";
const ERC8004_IDENTITY_TESTNET = "0x8004A818BFB912233c491871b3d84c89A494BD9e";

/**
 * Get ERC-8004 Identity Registry address for a chain.
 * Most chains use the same vanity address.
 */
export function getERC8004IdentityAddress(chainId: number): string {
  // Testnets usually use the same testnet vanity address
  const isTestnet = [11155111, 11142220, 84532, 80002, 421614, 11155420, 97].includes(chainId);
  return isTestnet ? ERC8004_IDENTITY_TESTNET : ERC8004_IDENTITY_MAINNET;
}

/**
 * Get a public client for a specific chain.
 * Uses default viem RPCs or env overrides if available.
 */
export function getChainPublicClient(chainId: number): PublicClient {
  const chain = SUPPORTED_ERC8004_CHAINS[chainId];
  if (!chain) {
    throw new Error(`Chain ID ${chainId} is not supported for ERC-8004 operations.`);
  }

  // Allow env overrides for RPCs (optional, but good for production)
  const envKey = `RPC_URL_${chainId}`;
  const rpcUrl = process.env[envKey] || chain.rpcUrls.default.http[0];

  return createPublicClient({
    chain,
    transport: http(rpcUrl),
  });
}
