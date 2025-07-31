import { NextRequest, NextResponse } from 'next/server';
import { createCsrfMiddleware } from '@edge-csrf/nextjs';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';
import { getLocaleFromCountry } from '@/lib/translation';

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

// Initialize CSRF protection
const csrfMiddleware = createCsrfMiddleware({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

// Initialize rate limiting
const limiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60, // Per 60 seconds (1 minute)
});

// Security headers
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Middleware
export async function middleware(request: NextRequest) {
  // Get client IP
  const clientIp = getClientIp(request);

  // Apply rate limiting
  try {
    await limiter.consume(clientIp); // Use client IP as key
  } catch (error: unknown) {
    // Type guard to narrow error to RateLimiterRes
    if (error instanceof RateLimiterRes) {
      const rateLimitHeaders = {
        'Retry-After': Math.ceil(error.msBeforeNext / 1000).toString(),
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': error.remainingPoints.toString(),
        'X-RateLimit-Reset': Math.ceil((Date.now() + error.msBeforeNext) / 1000).toString(),
      };
      return NextResponse.json(
        { error: 'Too Many Requests' },
        { status: 429, headers: rateLimitHeaders }
      );
    }
    // Handle unexpected errors
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  // Create response
  const response = NextResponse.next();

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add geolocation headers for client-side detection
  if (clientIp !== 'unknown' && !clientIp.startsWith('127.0.0.1') && !clientIp.startsWith('192.168.') && !clientIp.startsWith('10.')) {
    try {
      // For production, you might want to use a more reliable geolocation service
      // This is a simple example using a free service
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        const detectedLocale = getLocaleFromCountry(geoData.country_code || 'US');
        
        response.headers.set('x-detected-locale', detectedLocale);
        response.headers.set('x-detected-country', geoData.country_code || 'US');
        response.headers.set('x-detected-country-name', geoData.country_name || 'United States');
      }
    } catch (error) {
      console.error('Error detecting geolocation in middleware:', error);
    }
  }

  // Apply CSRF protection for non-GET requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    try {
      await csrfMiddleware(request);
    } catch (error: unknown) {
      // Type guard to ensure error is an Error instance
      if (error instanceof Error) {
        return NextResponse.json(
          { error: 'Invalid CSRF token', details: error.message },
          { status: 403 }
        );
      }
      // Handle unexpected errors
      return NextResponse.json(
        { error: 'Invalid CSRF token', details: 'Unknown error' },
        { status: 403 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};