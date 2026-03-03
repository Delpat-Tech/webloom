const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

type SearchParamsLike = {
  get: (key: string) => string | null;
};

export function extractUTMParams(searchParams: SearchParamsLike): Record<string, string> {
  const params: Record<string, string> = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  }

  return params;
}

const UTM_COOKIE_KEY = 'delpat_utm';

export function saveUTMsToCookie(params: Record<string, string>): void {
  if (typeof document === 'undefined' || Object.keys(params).length === 0) return;
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${UTM_COOKIE_KEY}=${encodeURIComponent(JSON.stringify(params))}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getUTMsFromCookie(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  const match = document.cookie.split('; ').find(row => row.startsWith(`${UTM_COOKIE_KEY}=`));
  if (!match) return {};
  try {
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
  } catch {
    return {};
  }
}

export function buildHrefWithQuery(
  path: string,
  params: Record<string, string | undefined>
): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `${path}?${queryString}` : path;
}
