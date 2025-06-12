import clsx from "clsx";
import {
  LucideEdit,
  LucideMenu,
  LucideSquareArrowOutUpRight,
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
import { TICKET_ICONS } from "@/features/ticket/constants";
import { ticketPath, ticketEditPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";
import { TicketWithUser } from "../types";
import { getCurrentSession } from "@/lib/auth/cookies";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comment/components/comments";

type TicketItemProps = {
  ticket: TicketWithUser;
  isDetail?: boolean;
};

export const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getCurrentSession();

  const isTicketOwner = isOwner(user, ticket);

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      {/* 添加预先加载功能，只有在浏览器视图中的next Link组建才能被加载。还没浏览到的不加载 */}
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <LucideEdit className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      menuTrigger={
        <Button variant="outline" size="icon">
          <LucideMenu className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      {/* 卡片+按钮综合体 */}
      <div className="flex gap-x-2">
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
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {editButton}
              {detailButton}
            </>
          )}
        </div>
      </div>{" "}
      {/* end of 卡片按钮综合体 */}
      {isDetail && (
        <div>
          <Comments ticketId={ticket.id} />
        </div>
      )}
    </div>
  );
};
