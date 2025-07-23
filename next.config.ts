import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
<<<<<<< HEAD
  typescript: {
    ignoreBuildErrors: true, // 👈 SKIPS type checking during build
  },
=======
  // other config options here
>>>>>>> fa51bce7cbd0be50ec1cca6081406005d25642d8
};

export default nextConfig;

