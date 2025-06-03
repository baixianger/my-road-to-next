"use server"

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/cookies";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";


export const createTicket = async (formData: FormData) => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect(signInPath());
  }

  // 这里的formData是一个FormData对象，包含了表单提交的数据
  // 你可以使用formData.get('title')来获取表单字段的值
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
    deadline: formData.get('deadline'),
    bounty: formData.get('bounty'),
  };

  await prisma.ticket.create({
    data: {
      title: data.title as string,
      content: data.content as string,
      deadline: data.deadline as string,
      bounty: Number(data.bounty), 
      userId: user.id,
    },
  });

  revalidatePath(ticketsPath());
};