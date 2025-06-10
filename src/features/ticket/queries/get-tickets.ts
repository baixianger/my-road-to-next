"use server";

import { prisma } from "@/lib/prisma";
import { TicketWithUser, SearchParams } from "../types";

type GetTicketsProps = {
  userId: string | undefined;
  searchParams: SearchParams;
};

export const getTickets = async ({
  userId,
  searchParams,
}: GetTicketsProps): Promise<TicketWithUser[]> => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
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
};
