'use client';

import GoogleAnalytics from './GoogleAnalytics';
import Hotjar from './Hotjar';

export default function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
      <Hotjar />
    </>
  );
} 