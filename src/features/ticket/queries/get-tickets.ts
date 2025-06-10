"use server";

import { prisma } from "@/lib/prisma";
import { TicketWithUser, ParsedSearchParams } from "../types";

type GetTicketsProps = {
  userId: string | undefined;
  searchParams: ParsedSearchParams;
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
      [searchParams.sortKey]: searchParams.sortValue,
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
