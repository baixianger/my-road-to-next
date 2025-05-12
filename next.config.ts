import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cache设置 小心谨慎，优先使用Link里的prefetch
  experimental: {
    staleTimes: {
      dynamic: 30, //用于生产力环境部署30，默认为0
    },
  },
};

export default nextConfig;
