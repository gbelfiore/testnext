const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    // assetPrefix: isProd ? 'https://d1snpe5mtkdoo8.cloudfront.net' : undefined,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dg5ko83jkkp0n.cloudfront.net',
                port: '',
                pathname: '/public/it-prod/**',
            },
        ],
    },
};



export default nextConfig;
