import { i18n } from './next-i18next.config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Add any other domains you need here
    ],
  },
};

export default nextConfig;