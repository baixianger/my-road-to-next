import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

/*
TODO: 此处有个设想，把修改表单的页面变成一个弹出框来进行修改。
*/

type TicketEditFormProps = {
	params: Promise<{
		ticketId: string;
	}>;
}

const TicketEditPage = async ({ params}: TicketEditFormProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) { // 其他方式还有用？表达式来识别未定义的元素，比如 ticket?.id
    notFound(); // 404 页面 本级目录因为没有定义404或者not-found，所以会向上级目录查找404页面
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        className="animate-fade-in-from-top"
        title="Edit Ticket"
        description="Edit the details of your ticket."
        content={<TicketUpsertForm ticket={ticket}/>}
        />
    </div>
  );
}
export default TicketEditPage;