import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
// import { getTickets } from '@/features/ticket/queries/get-tickets';
import { ErrorBoundary } from "react-error-boundary";
import { Placeholder } from "@/components/placeholder";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath } from "@/paths";
import { Separator } from "@/components/ui/separator";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
}; // next js 15 特性 https://nextjs.org/docs/app/api-reference/file-conventions/page

// 动态路由传递的永远是一个对象，比如ticketId，实际传输的是{params: {ticketId: '123'}}
// nextjs 15 动态路径参数只支持异步函数async, 参数对象是一个promise对象,所以必须用await来获取
const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) { // 其他方式还有用？表达式来识别未定义的元素，比如 ticket?.id
    notFound(); // 404 页面 本级目录因为没有定义404或者not-found，所以会向上级目录查找404页面
  }

  return (
		<div className="flex flex-1 flex-col gap-y-8">
			<Breadcrumbs 
				breadcrumbs={[
					{ title: "Tickets", href: homePath() },
					{ title: ticket.title },
				]}
			/>

			<Separator />

			<div className="flex justify-center animate-fade-in-from-top">
				<ErrorBoundary 
					fallback={
						<Placeholder label="Failed to fetch ticket" />
					}
				>
				<TicketItem ticket={ticket} isDetail />
				</ErrorBoundary>
			</div>
		</div>
  );
};

// 将动态路径静态化，此时为了避免页面不更新，适用于博客内容。同步还得设置revalidatePath在 delete-ticket.ts内
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// export async function generateStaticParams() {
// 	const tickets = await getTickets();
// 	return tickets.map((ticket) => ({
// 		ticketId: ticket.id,
// 	}));
// };

export default TicketPage;
