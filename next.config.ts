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
      {
        source: '/creds',
        destination:
          'https://docs.google.com/spreadsheets/u/2/d/1WR6dh3Q-Ig7BPGKZ0vyH8KreTfGmVJ5UFLh6vu9FZow/edit?gid=949929944#gid=949929944',
        permanent: false,
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

