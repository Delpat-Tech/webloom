import { TranslationConfig, GeoLocation } from '@/types';

// Supported languages and their configurations
export const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// Language to country mapping for IP-based detection
export const LANGUAGE_COUNTRY_MAP: Record<string, SupportedLocale> = {
  // French-speaking countries
  'FR': 'fr', 'CA': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr',
  // Spanish-speaking countries
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es', 'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es', 'GQ': 'es', 'UY': 'es',
  // German-speaking countries
  'DE': 'de', 'AT': 'de', 'LI': 'de',
  // Italian-speaking countries
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  // Portuguese-speaking countries
  'PT': 'pt', 'BR': 'pt', 'AO': 'pt', 'MZ': 'pt', 'GW': 'pt', 'CV': 'pt', 'ST': 'pt', 'TL': 'pt', 'MO': 'pt',
  // Dutch-speaking countries
  'NL': 'nl', 'BE': 'nl',
  // Japanese-speaking countries
  'JP': 'ja',
  // Korean-speaking countries
  'KR': 'ko',
  // Chinese-speaking countries
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'MO': 'zh', 'SG': 'zh',
  // Arabic-speaking countries
  'SA': 'ar', 'EG': 'ar', 'AE': 'ar', 'IQ': 'ar', 'SY': 'ar', 'JO': 'ar', 'LB': 'ar', 'LY': 'ar', 'MA': 'ar', 'DZ': 'ar', 'TN': 'ar', 'OM': 'ar', 'KW': 'ar', 'QA': 'ar', 'BH': 'ar', 'YE': 'ar', 'SD': 'ar', 'SO': 'ar', 'DJ': 'ar', 'KM': 'ar', 'TD': 'ar', 'ER': 'ar',
  // Hindi-speaking countries
  'IN': 'hi',
  // Russian-speaking countries
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru', 'TJ': 'ru', 'UZ': 'ru', 'TM': 'ru', 'MD': 'ru', 'GE': 'ru', 'AM': 'ru', 'AZ': 'ru',
};

// Default translation configuration
export const translationConfig: TranslationConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  supportedLocales: SUPPORTED_LOCALES,
  defaultLocale: 'en',
};

// Get locale from country code
export function getLocaleFromCountry(countryCode: string): SupportedLocale {
  return LANGUAGE_COUNTRY_MAP[countryCode.toUpperCase()] || 'en';
}

// Get locale from browser language
export function getLocaleFromBrowser(): SupportedLocale {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  return SUPPORTED_LOCALES.includes(langCode as SupportedLocale) 
    ? langCode as SupportedLocale 
    : 'en';
}

// Get locale from IP geolocation
export function getLocaleFromGeoLocation(geoLocation: GeoLocation | null): SupportedLocale {
  if (!geoLocation?.countryCode) return 'en';
  return getLocaleFromCountry(geoLocation.countryCode);
}

// Validate locale
export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Get direction for RTL languages
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  const rtlLocales = ['ar', 'he', 'fa', 'ur'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

// Format date based on locale
export function formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

// Format number based on locale
export function formatNumber(number: number, locale: string, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

// Format currency based on locale
export function formatCurrency(amount: number, locale: string, currency: string = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

// Get currency for locale
export function getCurrencyForLocale(locale: string): string {
  const currencyMap: Record<string, string> = {
    'en': 'USD',
    'fr': 'EUR',
    'es': 'EUR',
    'de': 'EUR',
    'it': 'EUR',
    'pt': 'EUR',
    'nl': 'EUR',
    'ja': 'JPY',
    'ko': 'KRW',
    'zh': 'CNY',
    'ar': 'SAR',
    'hi': 'INR',
    'ru': 'RUB',
  };
  return currencyMap[locale] || 'USD';
}

// Parse translation key (e.g., "common.buttons.submit" -> ["common", "buttons", "submit"])
export function parseTranslationKey(key: string): string[] {
  return key.split('.');
}

// Get nested object value by path
export function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((current, key) => current?.[key], obj);
}

// Interpolate translation with parameters
export function interpolateTranslation(text: string, params?: Record<string, any>): string {
  if (!params) return text;
  
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? String(params[key]) : match;
  });
} 