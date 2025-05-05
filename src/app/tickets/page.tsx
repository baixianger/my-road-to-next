import clsx from "clsx";
import Link from "next/link";
import { tickets } from "@/data";
import { TICKET_ICONS } from "@/icons";
import { ticketPath } from "@/paths";

const TicketsPage = () => {
  return (
  <div className="flex-1 flex flex-col gap-y-8">
    <div>
      <h2 className="text-3xl font-bold tracking-tight">TicketsPage</h2>
      <p className="text-sm text-muted-foreground">
        All your tickets at one place
      </p>
    </div>
    {/* 动画 */}
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <div 
          key={ticket.id}
          className="w-full max-w-[420px] p-4 border border-slate-200 rounded"
        >
          <div>{TICKET_ICONS[ticket.status]}</div>
          <h3 className="text-lg font-semibold truncate">{ticket.title}</h3> 
          <p className={clsx("text-sm text-slate-500 truncate",{
            "line-through decoration-amber-600": ticket.status === "CLOSED",
          })}>
            {ticket.description + ticket.description}
          </p>

          <Link className="text-sm underline" href={ticketPath(ticket.id)}>view</Link>
        </div>
      ))}
    </div>
  
  </div>)
};
  
  export default TicketsPage