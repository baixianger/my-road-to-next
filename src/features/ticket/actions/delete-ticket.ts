"use server"; //一般默认是server component。但是因为调用此函数的组件是client component，所以需要显示声明。

import { prisma } from '@/lib/prisma';
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { ActionState } from "@/components/form/to-action-state";
import { ticketsPath } from "@/paths";
import { setCookieByKey } from "@/action/cookies";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export const deleteOnSuccess = async (actionState: ActionState) => {
  revalidatePath(ticketsPath());
  await setCookieByKey("toast", actionState.message);
  redirect(ticketsPath());
};


export const deleteTicket = async (ticketId: string) : Promise<ActionState> => {

  await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟，实际应用中可以去掉
  const { user } = await getAuthOrRedirect(); //确保用户登录，否则重定向到登录页面

  try{
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "You are not authorized to delete this ticket");
    } 
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });

  } catch (error) {
    return fromErrorToActionState(error);
  }


  return toActionState("SUCCESS", "Ticket deleted successfully");

};