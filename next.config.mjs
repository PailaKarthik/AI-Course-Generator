/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'aavatars.githubusercontent.com',
          }
        ]
    }
};

export default nextConfig;
