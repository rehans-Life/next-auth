/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/new-verification",
        destination: "/auth/login",
        permanent: false,
        missing: [
          {
            type: "query",
            key: "token",
          },
        ],
      },
      {
        source: "/auth/new-password",
        destination: "/auth/login",
        permanent: false,
        missing: [
          {
            type: "query",
            key: "token",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
