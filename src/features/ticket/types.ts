import { Prisma } from "@prisma/client";

export type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    user: true;
  };
}>;