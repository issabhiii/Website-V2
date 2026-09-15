/**
 * Work desk gate — verifies a passphrase without storing it in plaintext.
 * Only a salted digest lives in the client bundle.
 */

const SALT = "abhi-work-gate-v1:";
/** SHA-256 hex digest of SALT + passphrase (passphrase never committed). */
const GATE_DIGEST =
  "2019a935ac2e8d9187d3e2510082a6e234c3534479cb9856afe087510ae9f14e";

const SESSION_KEY = "work-desk-session";

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function digestPassphrase(input) {
  const data = new TextEncoder().encode(SALT + input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return toHex(hash);
}

export async function verifyPassphrase(input) {
  const digest = await digestPassphrase(input);
  // Constant-ish compare for equal-length hex strings
  if (digest.length !== GATE_DIGEST.length) return false;
  let mismatch = 0;
  for (let i = 0; i < digest.length; i += 1) {
    mismatch |= digest.charCodeAt(i) ^ GATE_DIGEST.charCodeAt(i);
  }
  return mismatch === 0;
}

export function isWorkUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === GATE_DIGEST.slice(0, 24);
  } catch {
    return false;
  }
}

export function unlockWorkSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, GATE_DIGEST.slice(0, 24));
  } catch {
    /* ignore */
  }
}

export function lockWorkSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
