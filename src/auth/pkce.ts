const b64urlFromBytes = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

export function randomString(len = 64) {
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  return b64urlFromBytes(bytes)
}

export async function createCodeVerifier(): Promise<string> {
  return randomString(64)
}

export async function createCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return b64urlFromBytes(new Uint8Array(digest))
}