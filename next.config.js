// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true, // Consistent with vercel.json
  images: {
    unoptimized: true,
    domains: ['github.com', 'api.github.com', 'raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;