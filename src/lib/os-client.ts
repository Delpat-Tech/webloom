/**
 * Delpat OS API client — server-side only.
 * Uses OAuth 2.0 client credentials to obtain a bearer token,
 * caches it in memory until 60s before expiry, then refreshes.
 */

const OS_URL = process.env.DELPAT_OS_URL;
const CLIENT_ID = process.env.DELPAT_OS_CLIENT_ID;
const CLIENT_SECRET = process.env.DELPAT_OS_CLIENT_SECRET;

interface TokenCache {
  token: string;
  expiresAt: number; // ms timestamp
}

let tokenCache: TokenCache | null = null;

async function getToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (tokenCache && tokenCache.expiresAt - 60_000 > now) {
    return tokenCache.token;
  }

  if (!OS_URL || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Missing Delpat OS env vars: DELPAT_OS_URL, DELPAT_OS_CLIENT_ID, DELPAT_OS_CLIENT_SECRET');
  }

  const res = await fetch(`${OS_URL}/api/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OS token request failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const expiresIn: number = data.expires_in ?? 3600; // default 1h

  tokenCache = {
    token: data.access_token,
    expiresAt: now + expiresIn * 1000,
  };

  return tokenCache.token;
}

/**
 * Make an authenticated request to Delpat OS.
 */
export async function osRequest<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown
): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${OS_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OS request ${method} ${path} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}
