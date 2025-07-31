'use client';

import { useState, useEffect } from 'react';
import { GeoLocation } from '@/types';

interface UseGeoLocationReturn {
  geoLocation: GeoLocation | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGeoLocation(): UseGeoLocationReturn {
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGeoLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/geolocation');
      const data = await response.json();

      if (data.success && data.geoLocation) {
        setGeoLocation(data.geoLocation);
      } else {
        setError(data.message || 'Failed to fetch geolocation');
      }
    } catch (err) {
      setError('Network error while fetching geolocation');
      console.error('Geolocation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGeoLocation();
  }, []);

  return {
    geoLocation,
    isLoading,
    error,
    refetch: fetchGeoLocation,
  };
} 