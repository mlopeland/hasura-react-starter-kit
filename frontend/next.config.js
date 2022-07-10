/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/spa/:path',
        destination: '/spa/'
      }
    ]
  }
}

module.exports = nextConfig
