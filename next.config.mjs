
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: "/blog/image/**"
      }
    ],
  },
};

export default nextConfig;
