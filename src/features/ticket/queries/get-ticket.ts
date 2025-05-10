import { Ticket } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getTicket = async (ticketId: string): Promise<Ticket> => {
  // two ways to get the ticket findUnique and findUniqueOrThrow
  // findUniqueOrThrow will throw an error if the ticket is not found, Promise<Ticket>
  // findUnique will return null if the ticket is not found, Promise<Ticket | null>
  return await prisma.ticket.findUniqueOrThrow({
    where: {
      id: ticketId,
    },
  });
};