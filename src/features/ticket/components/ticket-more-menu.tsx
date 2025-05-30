import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTicket } from "../queries/get-ticket";
import { getTickets } from "../queries/get-tickets";
import { LucideTrash } from "lucide-react";

type TicketMoreMenuProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="h-4 w-4 mr-2" />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuItem>{deleteButton}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };
