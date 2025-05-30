"use server"

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromErrorToActionState, ActionState, toActionState } from "../../../components/form/to-action-state";
import { setCookieByKey } from "@/action/cookies";
import { toCent } from "@/utils/currency";


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
  // id: string | undefined, 这里放表单里action动作bind的额外参数
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
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty), // 将美元转换为分
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
    await setCookieByKey("toast", "Ticket Updated");
    redirect(ticketsPath()); // 之后代码不会执行
  }
  return toActionState("SUCCESS", "Ticket created successfully");
};