import Link from "next/link";
import { tickets } from "@/data";
import { ticketPath } from "@/paths";

const TicketsPage = () => {
    return <div>
        <h2 className="text-5xl">Tickets page</h2>
        {/* list of tickets */}
        <ul className="list-disc">
            {tickets.map((ticket) => (
            <li className="text-2xl" key={ticket.id}>
                <h2>{ticket.title}</h2>
                <Link className="text-2xl text-blue-500 hover:underline" href={ticketPath(ticket.id)}>view</Link>
            </li>
      ))}
        </ul>   
    </div>
  };
  
  export default TicketsPage