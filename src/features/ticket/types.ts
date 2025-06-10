import { Prisma } from "@prisma/client";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

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

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = parseAsString.withDefault("newest").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
