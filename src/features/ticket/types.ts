import { Prisma } from "@prisma/client";

export type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true; // filter passwordHash
      };
    };
  };
}>;

export type SearchParams = {
  search: string | string[] | undefined;
  sort: string | string[] | undefined;
};
