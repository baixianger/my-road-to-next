import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { LucideTicket } from "lucide-react";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { ParsedSearchParams } from "../types";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets({ userId, searchParams });
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="max-w-[420px] w-full flex gap-x-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { value: "newest", label: "Newest" },
            { value: "bounty", label: "Bounty" },
          ]}
        />
      </div>
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
    </div>
  );
};

export { TicketList };
