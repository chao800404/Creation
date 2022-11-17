/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/dashboard/:page*',
        destination: '/',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/getImageCover',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2593000, must-revalidate',
          },
        ],
      },
      {
        source: '/api/getImageEmoji',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2593000, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
