/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
                pathname: "**",
            },
        ],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
