import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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

