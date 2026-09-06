const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Generates ids like `TCS-7KQ2MX`. Only call from event handlers, never during render. */
export function generateOrderId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return `TCS-${out}`;
}
