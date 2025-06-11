"use server";

import { prisma } from "@/lib/prisma";
import { TicketWithUser, ParsedSearchParams } from "../types";

type GetTicketsProps = {
  userId: string | undefined;
  searchParams: ParsedSearchParams;
};

type GetTicketsResult = {
  list: TicketWithUser[];
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const getTickets = async ({
  userId,
  searchParams,
}: GetTicketsProps): Promise<GetTicketsResult> => {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.ticket.count({ where }),
  ]);
  const hasNextPage = count > skip + take;
  return {
    list: tickets,
    metadata: { count, hasNextPage },
  };
};
