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
