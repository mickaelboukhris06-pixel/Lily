import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '7fhvzszahmx8ej25.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
