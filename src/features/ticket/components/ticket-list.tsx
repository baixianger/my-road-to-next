import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { LucideTicket } from "lucide-react";

type TicketListProps = {
  userId?: string;
}

const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId);
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.length === 0 ? (
        <Placeholder label="No tickets found, create one now?" icon={<LucideTicket />}/>
      ) : (
        tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} isDetail={false} />
        ))
      )}
    </div>
  );
}

export { TicketList };