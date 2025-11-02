/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      // Disable turbopack for now to avoid compatibility issues
      enabled: false,
    },
  },
  transpilePackages: ['framer-motion'],
  // Fix for framer-motion and Next.js 14 compatibility
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;