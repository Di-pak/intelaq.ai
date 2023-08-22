/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    esmExternals: false,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
