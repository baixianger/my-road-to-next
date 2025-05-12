import clsx from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TICKET_ICONS } from "@/features/ticket/constants";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ticketPath } from "@/paths";

// import { Ticket } from "@prisma/client";
// type TicketItemProps = {
//   ticket: Ticket;
//   isDetail?: boolean;
// };
// 更好的方式是用类型推导来获取ticket的类型
type TicketItemProps = {
  ticket: 
  | Awaited<ReturnType<typeof getTickets>>[number]
  | Awaited<ReturnType<typeof getTicket>>;
  isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {

  // check null or the certain type wouldn't have the id property
  // if (!ticket) {
  //   return null;
  // }
  // 如果不想要check步骤，可以修改getTicket里的查询函数为findUniqueOrThrow，这样绝不会返回null，就不会出现ticket.id的情况

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>  
  );

  const deleteButton = (
    <Button variant="outline" size="icon">
      <LucideTrash className="h-4 w-4" />
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
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">
      {isDetail? deleteButton : detailButton}
      </div>
    </div>
  );
}
