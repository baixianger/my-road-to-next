"use server";

import { prisma } from "@/lib/prisma";
import { TicketWithUser } from "../types";

export const getTickets = async (userId: string | undefined): Promise<TicketWithUser[]> => {
  
  return await prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {  
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}