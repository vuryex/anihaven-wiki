/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['github.com', 'api.github.com', 'raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;