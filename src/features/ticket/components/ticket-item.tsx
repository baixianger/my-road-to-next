"use client"; //为什么要用客户端组件？因为要用到按钮的onClick事件，所以必须在客户端中执行。

// 如果想保持默认服务端组件的状态
// 可以用form标签包裹按钮,通过action属性来指定删除的操作，并绑定参数
// const deleteButton = (
//   <form action={deleteTicket.bind(null, ticket.id)}>
//   <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
//     <LucideTrash className="h-4 w-4" />
//   </Button>
//   </form>
// );

import clsx from "clsx";
import {
  LucideEdit,
  LucideMenu,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ticketPath, ticketEditPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";
import { ConfirmDialog } from "@/components/confirm-dialog";

// import { Ticket } from "@prisma/client";
// type TicketItemProps = {
//   ticket: Ticket;
//   isDetail?: boolean;
// };
// 更好的方式是用类型推导来获取ticket的类型
type TicketItemProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  // check null or the certain type wouldn't have the id property
  // if (!ticket) {
  //   return null;
  // }
  // 如果不想要check步骤，可以修改getTicket里的查询函数为findUniqueOrThrow，这样绝不会返回null，就不会出现ticket.id的情况

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      {/* 添加预先加载功能，只有在浏览器视图中的next Link组建才能被加载。还没浏览到的不加载 */}
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const handleDeleteTicket = async () => {
    // "use server"; //It is not allowed to define inline "use server" annotated Server Actions in Client Components.
    // await prisma.ticket.delete({
    //   where: {
    //     id: ticket.id,
    //   },
    // });
    await deleteTicket(ticket.id); //相当于建立了一个网管，从浏览器端的onClick监听器调用服务器操作。
  };

  // const deleteButton = (
  //   <Button variant="outline" size="icon" onClick={handleDeleteTicket}>
  //     <LucideTrash className="h-4 w-4" />
  //   </Button>
  // );

  const deleteButton =(
    <ConfirmDialog 
      action={handleDeleteTicket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideTrash className="h-4 w-4" />
        </Button>
      }
    />
  )

  const editButton = (
    <Button variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucideEdit className="h-4 w-4" />
      </Link>
    </Button>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMenu className="h-4 w-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full max-w-[420px] flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span
              className={clsx({
                "truncate max-w-70": !isDetail,
                "line-clamp-3": isDetail,
              })}
            >
              {ticket.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
            {moreMenu}
          </>
        ) : (
          <>
            {editButton}
            {detailButton}
          </>
        )}
      </div>
    </div>
  );
};
