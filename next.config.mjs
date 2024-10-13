/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['tesseract.js', 'mongoose'],
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.kroger.com',
            port: '',
            pathname: '/**',
          },
        ],
        unoptimized: true,
      },
};

export default nextConfig;
