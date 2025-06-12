/*
如何通过prisma来seed数据
1. 安装tsx包，来执行本ts文件，npm install tsx -D (or --save-dev)
2. 编写本脚本
3. 执行本脚本，执行本脚本时会遇到环境变量找不到的问题
3. 下载dotenv-cli包，npm install dotenv-cli -D
4. a) 在package.json中添加一个脚本 "prisma-seed": "dotenv -e .env.local -- tsx prisma/seed.ts"
      后执行 npm run prisma-seed
   b) 或者在package.json中添加一个脚本"prisma-seed": "tsx prisma/seed.ts" 
      后再显示使用dotenv -e .env.local -- npm run prisma-seed
   c) 或者直接执行 dotenv -e .env.local -- tsx prisma/seed.ts
   * 都测试过，加不加npx的区别在于是否全局安装了tsx和dotenv-cli
*/
import { PrismaClient } from "@prisma/client";
import { TicketPriority, TicketStatus } from "@prisma/client";
import { hashPassword } from "@/lib/auth/utils";

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "Pai",
    email: "baixianger@gmail.com",
  },
  {
    username: "test",
    email: "test@test.com",
  },
  {
    username: "Liu",
    email: "liu@liu.com",
  },
];

// Initialize the array with the correct type
const tickets = Array.from({ length: 12 }, (_, i) => {
  const id = `${i + 1}`;
  return {
    id,
    title: `Ticket ${id}`,
    content: `This is the description for ticket ${id}`,
    status: ["OPEN", "DONE", "RUNNING", "CLOSED"][i % 4] as TicketStatus,
    priority: ["LOW", "MEDIUM", "HIGH"][i % 3] as TicketPriority,
    deadline: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // string
    bounty: 100 * (i + 1),
  };
});

const comments = Array.from({ length: 200 }, (_, i) => {
  const id = `${i + 1}`;
  return {
    id,
    content: `This is the comment No. ${id}`,
  };
});

const prisma = new PrismaClient();

/* Seeding 有几种实现方式，最原始的是用for循环
1. 用for循环
  for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
  }
2. 用 Promise.all
  await Promise.all(
    tickets.map((ticket) => {
      return prisma.ticket.create({
        data: ticket,
      });
    })
  );
3. 用 createMany */
const seed = async () => {
  console.log("Deleting existing data...");

  await prisma.comment.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticket.deleteMany({});

  console.log("Seeding database...");

  const psdHash = await hashPassword("11111111");
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash: psdHash,
    })),
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket, i) => ({
      ...ticket,
      userId: dbUsers[i % users.length].id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment, i) => ({
      ...comment,
      ticketId: dbTickets[i % tickets.length].id,
      userId: dbUsers[i % users.length].id,
    })),
  });
  console.log("Seeding completed.");
};

seed();
