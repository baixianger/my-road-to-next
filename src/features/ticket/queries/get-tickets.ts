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
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && {
        createdAt: "desc",
      }),
      ...(searchParams.sort === "bounty" && {
        bounty: "desc",
      }),
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
