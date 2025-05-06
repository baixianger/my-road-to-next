import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TICKET_ICONS } from "@/features/ticket/constants";
import { Ticket } from "@/features/ticket/types";
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  console.log("Where am I displayed? (TicketItem)");

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>  
  );

  return (
    <div className={clsx("w-full max-w-[420px] flex gap-x-1", {
      "max-w-[580px]": isDetail,
      "max-w-[420px]": !isDetail,
    })}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span> 
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={clsx("whitespace-break-spaces",{
            "line-clamp-3" : !isDetail
          })}>
            {ticket.description + ticket.description + ticket.description + ticket.description + ticket.description
            + ticket.description + ticket.description + ticket.description + ticket.description + ticket.description}
          </span>
        </CardContent>
      </Card>
      {isDetail? null : (<div className="flex flex-col gap-y-1">
        {detailButton}
      </div>)}
    </div>
  );
}
