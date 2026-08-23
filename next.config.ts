import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose GOOGLE_MAPS_API_KEY to the browser ONLY for loading the Maps JS SDK.
  // All other Google Maps REST calls (Routes, Geocoding, Route Optimization)
  // are made from Next.js API routes using the server-side GOOGLE_MAPS_API_KEY.
  // The user only ever sets ONE variable: GOOGLE_MAPS_API_KEY in .env.local.
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY ?? '',
  },
  allowedDevOrigins: [
    '10.195.25.152',
    '10.195.25.152:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
  ],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
