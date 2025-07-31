import { NextRequest, NextResponse } from 'next/server';
import { GeoLocation } from '@/types';

// Free IP geolocation service (you can replace with paid services like MaxMind)
async function getGeoLocationFromIP(ip: string): Promise<GeoLocation | null> {
  try {
    // Using ipapi.co as a free service (limited to 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch geolocation data');
    }

    const data = await response.json();
    
    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'US',
      region: data.region || undefined,
      city: data.city || undefined,
      timezone: data.timezone || undefined,
      latitude: data.latitude || undefined,
      longitude: data.longitude || undefined,
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return null;
  }
}

// Utility function to get client IP
function getClientIp(request: NextRequest): string {
  // Try common headers for client IP
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // Use the first IP in the chain (client's IP)
    return xForwardedFor.split(',')[0].trim();
  }

  // Fallback to other headers (e.g., for Cloudflare)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to unknown if no IP is found
  return 'unknown';
}

export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    
    // Don't process if IP is unknown or localhost
    if (clientIp === 'unknown' || clientIp === '127.0.0.1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.')) {
      return NextResponse.json({
        success: false,
        message: 'Unable to determine location from IP',
        geoLocation: null
      });
    }

    const geoLocation = await getGeoLocationFromIP(clientIp);
    
    if (!geoLocation) {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch geolocation data',
        geoLocation: null
      });
    }

    return NextResponse.json({
      success: true,
      geoLocation,
      ip: clientIp
    });

  } catch (error) {
    console.error('Geolocation API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        geoLocation: null 
      },
      { status: 500 }
    );
  }
} 