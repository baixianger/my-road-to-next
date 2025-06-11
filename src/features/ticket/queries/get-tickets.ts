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

  const tickets = await prisma.ticket.findMany({
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
  });

  const count = await prisma.ticket.count({ where });

  return {
    list: tickets,
    metadata: { count, hasNextPage: count > skip + take },
  };
};

export const getTicketsMetadata = async ({
  userId,
  searchParams,
}: GetTicketsProps): Promise<{ count: number; hasNextPage: boolean }> => {
  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const count = await prisma.ticket.count({ where });

  return { count, hasNextPage: count > skip + take };
};

export const getTicketsOnly = async ({
  userId,
  searchParams,
}: GetTicketsProps): Promise<GetTicketsResult["list"]> => {
  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const tickets = await prisma.ticket.findMany({
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
  });

  return tickets;
};
