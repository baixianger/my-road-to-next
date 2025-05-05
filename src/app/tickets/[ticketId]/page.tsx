import {tickets} from '@/data';
import { TICKET_ICONS } from '@/icons';

type TicketPageProps = {
    params: {
        ticketId: string;
        };
}


// 动态路由传递的永远是一个对象，比如ticketId，实际传输的是{params: {ticketId: '123'}}
const TicketPage = ({ params }: TicketPageProps) => {
    const ticketId = params.ticketId;
    const ticket = tickets.find(ticket => ticket.id === ticketId);
    if (!ticket) { // 其他方式还有用？表达式来识别未定义的元素，比如 ticket?.id
        return <div>
            <h2 className="text-3xl">Ticket not found</h2>
            <p>Ticket with ID {ticketId} does not exist.</p>
        </div>;
    }
    return <div>
        <h2 className="text-3xl">Ticket Page {ticketId}</h2>
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl">Ticket Details</h3>
            <div className="flex flex-col gap-2">
                <p>Title: {ticket.title}</p>
                <p>Description: {ticket.description}</p>
                <p title={ticket.status}>Status: {TICKET_ICONS[ticket.status]}</p>
            </div>
        </div>
    </div>;
  };

  
  export default TicketPage