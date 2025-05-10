import { prisma } from "@/lib/prisma";
import { Ticket } from "../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  // two ways to get the ticket findUnique and findUniqueOrThrow
  // findUniqueOrThrow will throw an error if the ticket is not found
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
};