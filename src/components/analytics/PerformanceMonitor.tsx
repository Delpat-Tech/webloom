'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only import and start monitoring on the client side
    if (process.env.NODE_ENV === 'development') {
      import('@/utils/performanceMonitor');
    }
  }, []);

  return null; // This component doesn't render anything
} 