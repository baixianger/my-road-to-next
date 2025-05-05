import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TICKET_ICONS } from "@/features/ticket/constants";
import { Ticket } from "@/features/ticket/types";
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
};

export const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card key={ticket.id} className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate">{ticket.title}</span> 
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="line-clamp-3 whitespace-break-spaces">
          {/* clsx("text-sm text-slate-500 truncate",{
          "line-through decoration-amber-600": ticket.status === "CLOSED",
        }) */}
          {ticket.description + ticket.description}
        </span>
      </CardContent>
      <CardFooter>
        <Link className="text-sm underline" href={ticketPath(ticket.id)}>view</Link>
      </CardFooter>
    </Card>
  );
}
