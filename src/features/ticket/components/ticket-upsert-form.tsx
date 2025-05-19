"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTicket } from "../queries/get-ticket"
import { upsertTicket } from "../actions/upsert-ticket"
import { useTransition } from "react"
import { LucideLoaderCircle } from "lucide-react"

type TicketUpsertFormProps = {
  ticket?: Awaited<ReturnType<typeof getTicket>>;
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {

  const [isPending, startTransition] = useTransition()
  const upsertTicketAction = async ( formData: FormData) => {
    startTransition(async () => {
      await upsertTicket(formData); // 如果有bind数据，这里也要bind
    });
  }

  return (

    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Input type="hidden" name="id" defaultValue={ticket?.id} />

      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>  
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <Button type="submit">
        {isPending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
        {ticket ? "Edit" : "Create"}
        </Button>
    </form>
  )

}

export { TicketUpsertForm }