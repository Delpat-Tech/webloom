import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/:path*',
        destination: '/what-we-do/:path*',
        permanent: true,
      },
      {
        source: '/collaborate',
        destination: '/partner-with-us',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Set-Cookie',
            value: 'HttpOnly; Secure; SameSite=Strict',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

