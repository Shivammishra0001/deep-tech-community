import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        // Keep HTML and API responses uncached, but exclude everything that is
        // content-hashed or otherwise safe to cache. The previous "/:path*"
        // pattern also matched /_next/static/**, which stripped the immutable
        // caching Next.js sets on its own build output and forced browsers and
        // CDNs to re-download every JS/CSS chunk on each navigation.
        source: "/((?!_next/static|_next/image|favicon\\.ico|favicon\\.png|icon\\.png|apple-icon\\.png).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
