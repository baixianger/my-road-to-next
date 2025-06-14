import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/cookies";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { homePath, ticketPath } from "@/paths";
import { Separator } from "@/components/ui/separator";

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

  const { user } = await getCurrentSession();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    // 其他方式还有用？表达式来识别未定义的元素，比如 ticket?.id
    notFound(); // 404 页面
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs 
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />

      <Separator />
      <div className="flex-1 flex flex-col items-center justify-center">
        <CardCompact
          className="animate-fade-in-from-top"
          title="Edit Ticket"
          description="Edit the details of your ticket."
          content={<TicketUpsertForm ticket={ticket}/>}
          />
      </div>
    </div>
  );
}
export default TicketEditPage;