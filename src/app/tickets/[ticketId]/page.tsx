import Link from 'next/link';
import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { ticketsPath } from '@/paths';

type TicketPageProps = {
	params: Promise<{
		ticketId: string;
	}>;
} // next js 15 特性 https://nextjs.org/docs/app/api-reference/file-conventions/page


// 动态路由传递的永远是一个对象，比如ticketId，实际传输的是{params: {ticketId: '123'}}
const TicketPage = async ({ params }: TicketPageProps) => {
	const { ticketId } = await params;
	const ticket = await getTicket(ticketId);

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
		<div className="flex justify-center animate-fade-in-from-top">
			<TicketItem ticket={ticket} isDetail />
		</div>
	);
  };

  
  export default TicketPage