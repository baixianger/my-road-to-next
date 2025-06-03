import { prisma } from "@/lib/prisma";
import { TicketWithUser } from "../types";

// 添加react内建的catche到具体的查询函数上，目的是减少不必要的请求。

export const getTicket = async (ticketId: string): Promise<TicketWithUser> => {
  // two ways to get the ticket findUnique and findUniqueOrThrow
  // findUniqueOrThrow will throw an error if the ticket is not found, Promise<Ticket>
  // findUnique will return null if the ticket is not found, Promise<Ticket | null>
  return await prisma.ticket.findUniqueOrThrow({
    where: {
      id: ticketId,
    },
    include: {
      user: true,
    },
  });
};