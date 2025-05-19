"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTicket } from "../queries/get-ticket"
import { upsertTicket } from "../actions/upsert-ticket"
import { SubmitButton } from "@/components/submit-button"
import { useActionState } from "react"

type TicketUpsertFormProps = {
  ticket?: Awaited<ReturnType<typeof getTicket>>;
}


const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  // useActionState takes a function that returns a promise and an initial state, 
  // the function will be called when the form is submitted, and the state will be updated with the result of the function
  // binding the state to the form action, the state will be updated when the form is submitted.
  // So the state can wrap a lot of information about the result of the action.
  const [actionState, action] = useActionState(
    upsertTicket,
    {
      message: "",
    }
  )
  return (

    <form action={action} className="flex flex-col gap-y-2">
      <Input type="hidden" name="id" defaultValue={ticket?.id} />

      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>  
      <Textarea id="content" name="content" defaultValue={ticket?.content} />

      <SubmitButton label={ticket ? "Update" : "Create"} />

      {actionState.message}
    </form>
  )

}

export { TicketUpsertForm }