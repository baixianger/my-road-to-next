import { Heading } from "@/components/heading";
import { Suspense } from "react";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { ErrorBoundary } from "react-error-boundary";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { LucideShieldX } from "lucide-react";
import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/features/ticket/types";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const parsedSearchParams = await searchParamsCache.parse(await searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All Tickets" description="All tickets at one place" />
      <ErrorBoundary
        fallback={
          <Placeholder label="Something went wrong" icon={<LucideShieldX />} />
        }
      >
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={parsedSearchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
