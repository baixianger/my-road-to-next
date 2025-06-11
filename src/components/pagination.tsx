"use client";
import { Button } from "@/components/ui/button";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

export type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
}: PaginationProps) => {
  const { page, size } = pagination;
  const startOffset = page * size + 1;
  const endOffset = startOffset + size - 1;
  const label = `${startOffset} - ${endOffset} of ${count}`;

  const handleNextPage = () => {
    onPagination({ ...pagination, page: page + 1 });
  };
  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: page - 1 });
  };

  const nextButton = (
    <Button
      variant="secondary"
      size="icon"
      className="size-8"
      // TODO: disabled when no more pages
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      <LucideChevronRight />
    </Button>
  );
  const previousButton = (
    <Button
      variant="secondary"
      size="icon"
      className="size-8"
      disabled={page < 1}
      onClick={handlePreviousPage}
    >
      <LucideChevronLeft />
    </Button>
  );

  return (
    <>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </>
  );
};

export { Pagination };
