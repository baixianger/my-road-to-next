// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();
// // 在 prisma 客户端初始化时添加日志
// {
//   log: ['query', 'info', 'warn', 'error']
// }

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;