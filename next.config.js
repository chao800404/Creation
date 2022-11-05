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
}

module.exports = nextConfig
