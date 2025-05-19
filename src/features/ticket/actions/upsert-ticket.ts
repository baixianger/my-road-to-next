"use server"

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const upsertTicket = async (formData: FormData) => {
  // 这里的formData是一个FormData对象，包含了表单提交的数据
  // 你可以使用formData.get('title')来获取表单字段的值
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const id = formData.get('id') as string;

  await prisma.ticket.upsert({
    where: {
      id: id,
    },
    update: data,
    create: data,
  });

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketsPath());
  }
};