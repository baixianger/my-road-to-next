"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟，实际应用中可以去掉
  const { user } = await getAuthOrRedirect(); //确保用户登录，否则重定向到登录页面

  try{
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "You are not authorized to update this ticket");
    }
    await prisma.ticket.update({
      where: { id: id },
      data: { status },
    });
  } catch (error) {
  return fromErrorToActionState(error);
  };
  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Ticket status updated to " + status)
};