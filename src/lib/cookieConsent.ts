export const COOKIE_CONSENT_KEY = 'cookie-consent';

export type CookieConsentStatus = 'accepted' | 'declined' | null;

export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsentStatus;
}

export function setCookieConsent(status: 'accepted' | 'declined'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COOKIE_CONSENT_KEY, status);
}

export function hasAcceptedCookies(): boolean {
  return getCookieConsent() === 'accepted';
}

export function shouldLoadAnalytics(): boolean {
  return hasAcceptedCookies();
}

export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
} 