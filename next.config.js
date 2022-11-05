/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60 * 60 * 24,
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: '/public/static/emoji',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
      {
        source: '/public/static/cover',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
