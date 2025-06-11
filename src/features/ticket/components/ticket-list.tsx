import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { LucideTicket } from "lucide-react";
import { ParsedSearchParams } from "../types";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";
import { TicketPagination } from "./ticket-pagination";
import { Suspense } from "react";
import { TicketListSkeleton } from "@/components/ticket-skeleton";
import { TicketWithUser } from "../types";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketPureList = async ({ tickets }: { tickets: TicketWithUser[] }) => {
  return (
    <>
      {tickets.length === 0 ? (
        <Placeholder
          label="No tickets found, create one now?"
          icon={<LucideTicket />}
        />
      ) : (
        tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
        ))
      )}
    </>
  );
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata } = await getTickets({
    userId,
    searchParams,
  });
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="max-w-[420px] w-full flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
            { sortKey: "title", sortValue: "asc", label: "Title" },
          ]}
        />
      </div>
      <Suspense fallback={<TicketListSkeleton count={searchParams.size} />}>
        <TicketPureList tickets={tickets} />
      </Suspense>

      <div>
        <TicketPagination paginatedTicketsMetadata={metadata} />
      </div>
    </div>
  );
};

export { TicketList };
