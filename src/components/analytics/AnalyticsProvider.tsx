'use client';

import { useState, useEffect } from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import Hotjar from './Hotjar';
import { shouldLoadAnalytics } from '@/lib/cookieConsent';

export default function AnalyticsProvider() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if analytics should be loaded based on cookie consent
    const checkAnalytics = () => {
      setAnalyticsEnabled(shouldLoadAnalytics());
    };

    // Initial check
    checkAnalytics();

    // Listen for storage changes (when cookie consent is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkAnalytics();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleConsentChange = () => {
      checkAnalytics();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cookieConsentChanged', handleConsentChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentChanged', handleConsentChange);
    };
  }, []);

  if (!analyticsEnabled) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics />
      <Hotjar />
    </>
  );
} 