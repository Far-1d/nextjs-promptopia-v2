/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: "loose",
        serverComponentsExternalPackages: ['mongoose'],
    },
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'lh3.googleusercontent.com'
            },
            { 
                protocol: "https",
                hostname: 'avatars.githubusercontent.com',
            }
    ]},  
    webpack:(config) => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config;
    }
};

export default nextConfig;
