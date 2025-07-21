
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: "/blog/image/**"
      },
      {
        protocol: "https",
        hostname: "api.alamondaii.com",
        pathname: "/blog/image/**"
      }
    ],
  },
};

export default nextConfig;
