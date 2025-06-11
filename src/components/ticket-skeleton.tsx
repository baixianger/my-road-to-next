import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type TicketSkeletonProps = {
  isDetail?: boolean;
};

export const TicketSkeleton = ({ isDetail = false }: TicketSkeletonProps) => {
  return (
    <div
      className={cn("w-full flex gap-x-1 h-[171px]", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      {/* shadcn-card */}
      <div
        data-slot="shadcn-card"
        className="w-full bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 "
      >
        <div
          data-slot="shadcn-card-header"
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6"
        >
          <div
            data-slot="shadcn-card-title"
            className="leading-none font-semibold flex gap-x-2 items-center"
          >
            <Skeleton data-slot="shadcn-card-title-icon" className="h-6 w-6" />
            <Skeleton
              data-slot="shadcn-card-title-text"
              className="h-6 w-1/4"
            />
          </div>
        </div>
        <div data-slot="shadcn-card-content" className="px-6">
          <Skeleton className="h-4 w-full" />
        </div>
        <div
          data-slot="shadcn-card-footer"
          className="flex justify-between items-center px-6 [.border-t]:pt-6"
        >
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </div>{" "}
      {/* shadcn-card */}
      {/* shadcn-buttons */}
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
};

export const TicketListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TicketSkeleton key={i} />
      ))}
    </>
  );
};
