/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["randomuser.me"], // ✅ Add allowed external image domains
        remotePatterns: [
            {
              protocol: "https",
              hostname: "randomuser.me", // Allow images from all domains
            },
          ],
    },

    experimental: {              // ✅ Done this before Setup the 'AI-Receipt-scanner' 
      serverActions: {
        bodySizeLimit: "5mb",
      },
    },
};

export default nextConfig;
