// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
      domains: ['assets.aceternity.com','encrypted-tbn0.gstatic.com','static.vecteezy.com'], 
      // Add the hostname here
    },
    reactStrictMode: false,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    }
  };
  
  export default nextConfig;
  