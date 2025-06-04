"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromErrorToActionState, ActionState, toActionState } from "../../../components/form/to-action-state";
import { setCookieByKey } from "@/action/cookies";
import { toCent } from "@/utils/currency";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";

const upsertTicketSchema = z.object({
  title: z.string()
    .min(1, { message: "Title is required" })
    .max(20, { message: "Title must be less than 20 characters" }),
  content: z.string()
    .min(1, { message: "Content is required" })
    .max(1000, { message: "Content must be less than 1000 characters" }),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Is required" }),
  bounty: z.coerce.number().positive({ message: "Bounty must be a positive number" }),
});

export const upsertTicket = async (
  _actionState: ActionState,
  formData: FormData
) => {

  const { user } = await getAuthOrRedirect(); //确保用户登录，否则重定向到登录页面
  await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟，实际应用中可以去掉
  const id = formData.get('id') as string;

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });
      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "You are not authorized to update this ticket");
      }
    }
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty), // 将美元转换为分
      userId: user.id,
    }
    await prisma.ticket.upsert({
      where: {
        id: id,
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  };

  revalidatePath(ticketsPath());
  if (id) {
    await setCookieByKey("toast", "Ticket updated successfully");
    redirect(ticketsPath()); // 之后代码不会执行
  }
  return toActionState("SUCCESS", "Ticket created successfully");
};