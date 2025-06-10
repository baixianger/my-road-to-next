import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { LucideTicket } from "lucide-react";
import { SearchInput } from "@/components/search-input";
import { SearchParams } from "../types";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets({ userId, searchParams });
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="max-w-[420px] w-full">
        <SearchInput placeholder="Search tickets..." />
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
