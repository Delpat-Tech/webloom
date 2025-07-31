'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TranslationContextType, TranslationProviderProps, GeoLocation } from '@/types';
import { 
  getLocaleFromGeoLocation, 
  getLocaleFromBrowser, 
  isValidLocale,
  formatDate as formatDateUtil,
  formatNumber as formatNumberUtil,
  formatCurrency as formatCurrencyUtil,
  getCurrencyForLocale,
  parseTranslationKey,
  getNestedValue,
  interpolateTranslation
} from '@/lib/translation';

// Import translation data
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';
import it from '@/locales/it.json';
import pt from '@/locales/pt.json';
import nl from '@/locales/nl.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';
import zh from '@/locales/zh.json';
import ar from '@/locales/ar.json';
import hi from '@/locales/hi.json';
import ru from '@/locales/ru.json';

const translations = {
  en, fr, es, de, it, pt, nl, ja, ko, zh, ar, hi, ru
};

// Create context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation provider component
export function TranslationProvider({ 
  children, 
  initialLocale = 'en', 
  geoLocation = null 
}: TranslationProviderProps) {
  const [locale, setLocaleState] = useState<string>(initialLocale);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize locale based on geolocation or browser preference
  useEffect(() => {
    const initializeLocale = () => {
      let detectedLocale = initialLocale;

      // First priority: URL parameter or stored preference
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLocale = urlParams.get('lang');
        const storedLocale = localStorage.getItem('preferred-locale');
        
        if (urlLocale && isValidLocale(urlLocale)) {
          detectedLocale = urlLocale;
        } else if (storedLocale && isValidLocale(storedLocale)) {
          detectedLocale = storedLocale;
        }
      }

      // Second priority: IP geolocation
      if (detectedLocale === initialLocale && geoLocation) {
        const geoLocale = getLocaleFromGeoLocation(geoLocation);
        if (geoLocale !== 'en') {
          detectedLocale = geoLocale;
        }
      }

      // Third priority: browser language
      if (detectedLocale === initialLocale) {
        const browserLocale = getLocaleFromBrowser();
        if (browserLocale !== 'en') {
          detectedLocale = browserLocale;
        }
      }

      setLocaleState(detectedLocale);
      setIsLoading(false);

      // Store preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', detectedLocale);
      }
    };

    initializeLocale();
  }, [initialLocale, geoLocation]);

  // Set locale function
  const setLocale = (newLocale: string) => {
    if (isValidLocale(newLocale)) {
      setLocaleState(newLocale);
      
      // Store preference
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', newLocale);
        
        // Update URL parameter
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLocale);
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  // Translation function
  const t = (key: string, params?: Record<string, any>): string => {
    const currentTranslations = translations[locale as keyof typeof translations] || translations.en;
    const path = parseTranslationKey(key);
    let translation = getNestedValue(currentTranslations, path);

    // Fallback to English if translation not found
    if (!translation && locale !== 'en') {
      translation = getNestedValue(translations.en, path);
    }

    // Fallback to key if still not found
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    // Interpolate parameters
    return interpolateTranslation(translation, params);
  };

  // Format date
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return formatDateUtil(date, locale, options);
  };

  // Format number
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    return formatNumberUtil(number, locale, options);
  };

  // Format currency
  const formatCurrency = (amount: number, currency?: string): string => {
    const defaultCurrency = currency || getCurrencyForLocale(locale);
    return formatCurrencyUtil(amount, locale, defaultCurrency);
  };

  const value: TranslationContextType = {
    locale,
    setLocale,
    t,
    formatDate,
    formatNumber,
    formatCurrency,
    geoLocation,
    isLoading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook to use translation context
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Hook to get only translation function
export function useT() {
  const { t } = useTranslation();
  return t;
} 