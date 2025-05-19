"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromErrorToActionState, ActionState } from "./to-action-state";


const upsertTicketSchema = z.object({
  title: z.string()
    .min(1, { message: "Title is required" })
    .max(20, { message: "Title must be less than 20 characters" }),
  content: z.string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content must be less than 1000 characters" }),
});

export const upsertTicket = async (
  _actionState: ActionState,
  formData: FormData
) => {
  // 这里的formData是一个FormData对象，包含了表单提交的数据
  // 你可以使用formData.get('title')来获取表单字段的值
  const id = formData.get('id') as string;
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.upsert({
      where: {
        id: id,
      },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  };

  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketsPath());
  }
  return {
    message: "Ticket created successfully",
    fieldErrors: {},
  };
};