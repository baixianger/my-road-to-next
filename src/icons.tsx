import { CircleCheck, CircleX, FileText, Pencil } from "lucide-react"
// or use Lucide[item] naming style
// import { LucideCircleCheck, LucideCircleX, LucideFileText, LucidePencil } from "lucide-react"

export const TICKET_ICONS = {
  OPEN: <FileText />,
  DONE: <CircleCheck />,
  RUNNING: <Pencil />,
  CLOSED: <CircleX />,
}