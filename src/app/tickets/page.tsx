import { LucideShieldX } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";


// 在生产力环境部署，build后此页面会被编译成一个静态页面（○），
// 如果是对于博客这种新闻类的页面，影响不大；但是对于数据变化频繁的页面，比如票务系统，
// 可能会影响到数据的实时性，所以可以使用动态路由，
// 解决方案是 https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// export const dynamic = 'force-dynamic'; // 这个页面会被编译成一个动态页面，在build后会显示（ƒ）字样

// 另外一个方案是保留静态页面，但是设置一个缓存时间。Incremental Static Regeneration (ISR)
// https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
// 时间调成0秒后，实际等效一个动态页面。
export const revalidate = 60

const TicketsPage = () => {
  return (
  <div className="flex-1 flex flex-col gap-y-8">
    <Heading title="Tickets" description="All your tickets at one place"/>
    {/* error boundary is more fine-grained  */}
    <ErrorBoundary fallback={<Placeholder label="Something went wrong" icon=<LucideShieldX />/>}>
      <Suspense fallback={<Spinner />}> 
        <TicketList />
      </Suspense>
    </ErrorBoundary>
  </div>)
};

export default TicketsPage;