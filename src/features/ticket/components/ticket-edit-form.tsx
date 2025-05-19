import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTicket } from "../queries/get-ticket"
import { editTicket } from "../actions/edit-ticket"

type TicketEditFormProps = {
  ticket: Awaited<ReturnType<typeof getTicket>>;
}

const TicketEditForm = ({ ticket }: TicketEditFormProps) => {

  return (
    // 因为这是一个服务端组件，所以可以直接使用表单并绑定action提交
    <form action={editTicket} className="flex flex-col gap-y-2">
      <Input type="hidden" name="id" defaultValue={ticket.id} />
      {/* option2: 如果不想要这个隐藏的input，可以bind到form里 */}
      {/* action={editTicket.bind(null, ticket.id)} */}
      {/* 如果使用非受控组件（通过 ref 直接访问 DOM 元素），表单数据由 DOM 自身管理，更不需要绑定参数 */}

      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>  
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  )

}

export { TicketEditForm }