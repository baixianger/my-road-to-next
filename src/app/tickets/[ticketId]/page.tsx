import Link from 'next/link';
import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { tickets } from '@/data';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { ticketsPath } from '@/paths';

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
		return ( 
			<Placeholder 
			label="Ticket Not Found"
			button={
				<Button asChild variant="outline">
					<Link href={ticketsPath()}>
						Back to Tickets
					</Link>
				</Button>
			}
			/>
		)
	}
	return (
		<div className="flex justify-center anmiate-fade-in-from-top">
			<TicketItem ticket={ticket} isDetail />
		</div>
	);
  };

  
  export default TicketPage