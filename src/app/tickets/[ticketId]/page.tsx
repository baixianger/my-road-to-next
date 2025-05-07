import { notFound } from 'next/navigation';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketPageProps = {
	params: Promise<{
		ticketId: string;
	}>;
} // next js 15 特性 https://nextjs.org/docs/app/api-reference/file-conventions/page


// 动态路由传递的永远是一个对象，比如ticketId，实际传输的是{params: {ticketId: '123'}}
// nextjs 15 动态路径参数只支持异步函数async, 参数对象是一个promise对象,所以必须用await来获取
const TicketPage = async ({ params }: TicketPageProps) => {
	const { ticketId } = await params;
	const ticket = await getTicket(ticketId);

	if (!ticket) { // 其他方式还有用？表达式来识别未定义的元素，比如 ticket?.id
		notFound(); // 404 页面
	}

	return (
		<div className="flex justify-center animate-fade-in-from-top">
			<TicketItem ticket={ticket} isDetail />
		</div>
	);
  };

  
  export default TicketPage