/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['github.com', 'api.github.com', 'raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/index.html',
      },
    ];
  },
};

module.exports = nextConfig;