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

// export type SearchParams = {
//   search: string | string[] | undefined;
//   sort: string | string[] | undefined;
// };

// export type SearchParams = Record<string, string | string[] | undefined>;

// import { SearchParams } from "nuqs/server";

import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
