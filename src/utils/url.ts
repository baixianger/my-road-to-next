export const getBaseUrl = () => {
  const environment = process.env.NODE_ENV;

  const baseUrls = 
    environment === "development"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return baseUrls;
}; 


// 其他环境变量
// VERCEL_ // Vercel 平台相关的环境变量
// NEXT—— // Next.js 相关的环境变量
// NODE_ENV // Node.js 环境变量，表示当前环境是开发环境还是生产环境