/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async redirects() {
    return [{ source: '/gestion-vacacional/overseas', destination: '/overseas', permanent: true }, { source: '/blog/:path*', destination: '/actualidad/:path*', permanent: true }, { source: '/inmuebles', destination: 'https://www.advocadarealestate.es/inmuebles', permanent: true }]
  },
  async headers() {
    return [{ source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    ] }]
  },
}

export default nextConfig
