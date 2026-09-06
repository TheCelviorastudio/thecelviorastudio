/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Let phones/tablets on the home network use the dev server (Next 16 blocks
  // cross-origin dev requests, e.g. HMR, unless the origin is allow-listed).
  allowedDevOrigins: ["192.168.0.104", "192.168.0.*", "*.local"],
};

export default nextConfig;
