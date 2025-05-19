"use server"

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const editTicket = async (formData: FormData) => {
  // 这里的formData是一个FormData对象，包含了表单提交的数据
  // 你可以使用formData.get('title')来获取表单字段的值
  const data = {
    id: formData.get('id'),
    title: formData.get('title'),
    content: formData.get('content'),
  };

  await prisma.ticket.update({
    where: {
      id: data.id as string,
    },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};