"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTicket } from "../queries/get-ticket"
import { upsertTicket } from "../actions/upsert-ticket"
import { SubmitButton } from "@/components/submit-button"


type TicketUpsertFormProps = {
  ticket?: Awaited<ReturnType<typeof getTicket>>;
}

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {

  return (

    <form action={upsertTicket} className="flex flex-col gap-y-2">
      <Input type="hidden" name="id" defaultValue={ticket?.id} />

      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>  
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </form>
  )

}

export { TicketUpsertForm }