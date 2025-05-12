"use server"; //一般默认是server component。但是因为调用此函数的组件是client component，所以需要显示声明。

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';


export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  // 重新验证路径，刷新数据。但是⚠️此处用于服务端的动作，比如用户操作之后，删除/提交。
  // https://nextjs.org/docs/app/deep-dive/caching#revalidatepath
  revalidatePath(ticketsPath());

  redirect(ticketsPath());
}