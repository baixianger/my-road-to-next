"use server";

import { fromErrorToActionState, toActionState } from "@/components/form/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  // mimic time deley
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try{
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