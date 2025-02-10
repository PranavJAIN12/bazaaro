/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["fakestoreapi.com"], // Add allowed external image domains here
    },
    
};

export default nextConfig;
