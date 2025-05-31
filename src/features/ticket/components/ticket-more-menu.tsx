"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTicket } from "../queries/get-ticket";
import { getTickets } from "../queries/get-tickets";
import { LucideTrash } from "lucide-react";
import { TICKET_STATUS_LABELS } from "../constants";
import { TicketStatus } from "@prisma/client";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { deleteTicket } from "../actions/delete-ticket";

type TicketMoreMenuProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  menuTrigger: React.ReactElement;
};

const TicketMoreMenu = ({ ticket, menuTrigger }: TicketMoreMenuProps) => {

  const [deleteButton, deleteDialog] = useConfirmDialog({
    title: "Delete Ticket",
    description: "Are you sure you want to delete this ticket? This action cannot be undone.",
    action: async () => {
      await handleDeleteTicket();
    },
    dialogTrigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id); //相当于建立了一个网管，从浏览器端的onClick监听器调用服务器操作。
  };

  const handleUpdateTicketStatus = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);

    toast.promise(promise, {
      loading: "Updating ticket status...",
    });
    const result = await promise;
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.keys(TICKET_STATUS_LABELS).map((status) => (
        <DropdownMenuRadioItem
          key={status}
          value={status}
          className="flex items-center"
        >
          {TICKET_STATUS_LABELS[status as TicketStatus]}
          {/* 或者 status as keyof type of TICKET_STATUS_LABELS */}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}{/* 把dialog 和 dropdownmenu 分离 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{menuTrigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {ticketStatusRadioGroup}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
