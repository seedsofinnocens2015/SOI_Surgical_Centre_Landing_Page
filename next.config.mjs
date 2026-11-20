/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/seeds-of-innocens-surgical-center',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seeds-of-innocens-surgical-center/',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
