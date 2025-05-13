"use server"; //一般默认是server component。但是因为调用此函数的组件是client component，所以需要显示声明。

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
// import { ticketPath } from '@/paths/ticket-paths';


export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  // 重新验证路径，刷新数据。但是⚠️此处用于服务端的动作，比如用户操作之后，删除/提交。
  // https://nextjs.org/docs/app/deep-dive/caching#revalidatepath
  revalidatePath(ticketsPath());

  // 此处配合generateStaticParams使用，
  // 同时也要用errorboundary处理500服务端错误，自定义500.js页面或者用error boundary处理错误
  // https://nextjs.org/docs/pages/building-your-application/configuring/error-handling#handling-server-errors
  // revalidatePath(ticketPath(ticketId));

  redirect(ticketsPath());
}