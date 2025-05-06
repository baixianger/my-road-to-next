import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";


const TicketsPage = () => {
  return (
  <div className="flex-1 flex flex-col gap-y-8">
    <Heading title="Tickets" description="All your tickets at one place"/>
    {/* 先暂停，等异步完成后，才渲染数据，可能的效果是，动画能够得到保留 */}
    <Suspense fallback={<Spinner />}> 
      <TicketList />
    </Suspense>
  </div>)
};

export default TicketsPage;