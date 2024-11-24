// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
      domains: ['assets.aceternity.com','encrypted-tbn0.gstatic.com','static.vecteezy.com'], 
      // Add the hostname here
    },
    reactStrictMode: false
  };
  
  export default nextConfig;
  