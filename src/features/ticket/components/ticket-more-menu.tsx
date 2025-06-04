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
import { deleteTicket, deleteOnSuccess } from "../actions/delete-ticket";
import { ActionState } from "@/components/form/to-action-state";

type TicketMoreMenuProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  menuTrigger: React.ReactElement;
};

const TicketMoreMenu = ({ ticket, menuTrigger }: TicketMoreMenuProps) => {
 
  const deleteOnErrorHandler = async(actionState: ActionState) => {
    toast.error(actionState.message);
  };

  const deleteOnSuccessHandler = async(actionState: ActionState) => {
    deleteOnSuccess(actionState);
  };
 
  const [deleteButton, deleteDialog] = useConfirmDialog({
    title: "Delete Ticket",
    description: "Are you sure you want to delete this ticket? This action cannot be undone.",
    action: async () => deleteTicket(ticket.id),
    dialogTrigger: (
      <DropdownMenuItem>
        <LucideTrash className="h-4 w-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
    onSuccess: deleteOnSuccessHandler,
    onError: deleteOnErrorHandler,
  });

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
