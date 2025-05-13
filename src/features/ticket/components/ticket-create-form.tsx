import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTicket } from "../actions/create-ticket"

const TicketCreateForm = () => {


  return (
    // 因为这是一个服务端组件，所以可以直接使用表单并绑定action提交
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" />

      <Label htmlFor="content">Content</Label>  
      <Textarea id="content" name="content" />

      <Button type="submit">Create</Button>
    </form>
  )

}

export { TicketCreateForm }
