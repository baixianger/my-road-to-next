// import clsx from "clsx";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { tickets } from "@/data";
import { TICKET_ICONS } from "@/icons";
import { ticketPath } from "@/paths";


const TicketsPage = () => {
  return (
  <div className="flex-1 flex flex-col gap-y-8">
    <Heading title="Tickets" description="All your tickets at one place"/>
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
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
      ))}
    </div>
  
  </div>)
};
  
  export default TicketsPage