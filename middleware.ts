import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

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

// Custom CSRF token generation and validation
function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function validateCsrfToken(request: NextRequest): boolean {
  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf-token')?.value;

  if (!tokenFromHeader || !tokenFromCookie) {
    return false;
  }

  return tokenFromHeader === tokenFromCookie;
}

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

  // Generate and set CSRF token if not present
  if (!request.cookies.get('csrf-token')) {
    const csrfToken = generateCsrfToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  }

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Validate CSRF token for non-GET requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    if (!validateCsrfToken(request)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};