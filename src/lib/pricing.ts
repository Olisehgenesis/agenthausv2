/**
 * Shared pricing logic for Haus Names (.agenthaus.eth)
 * 
 * Tiers:
 * - 3 characters: $30.00
 * - 4 characters: $15.00
 * - 5 characters: $5.00
 * - 6 characters: $1.00
 * - 7 characters: $0.30
 * - 8-20 characters: $0.10
 */

export function getHausNamePrice(name: string): string {
  if (!name) return "0.30";
  
  const cleanName = name.toLowerCase().trim().replace(/[^a-z0-9-]/g, "");
  const length = cleanName.length;

  if (length === 3) return "30.00";
  if (length === 4) return "15.00";
  if (length === 5) return "5.00";
  if (length === 6) return "1.00";
  if (length === 7) return "0.30";
  if (length >= 8 && length <= 20) return "0.10";
  
  // Default preview for invalid/empty lengths
  return "0.30";
}

/**
 * Returns a human-friendly price string with currency
 */
export function formatHausNamePrice(name: string, currency = "USDC"): string {
  const price = getHausNamePrice(name);
  return `${price} ${currency}`;
}
