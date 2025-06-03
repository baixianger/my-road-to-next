"use server";

import { prisma } from "@/lib/prisma";
import { TicketWithUser } from "../types";

export const getTickets = async (): Promise<TicketWithUser[]> => {
  
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
}