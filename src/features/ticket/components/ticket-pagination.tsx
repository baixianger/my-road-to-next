"use client";

import { useQueryStates } from "nuqs";
import { paginationOptions } from "../types";
import { paginationParser } from "../types";
import { Pagination } from "@/components/pagination";
import { PageAndSize } from "@/components/pagination";

type TicketPaginationProps = {
  paginatedTicketsMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const TicketPagination = ({
  paginatedTicketsMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const handlePaginationChange = (newPagination: PageAndSize) => {
    setPagination(newPagination);
  };

  return (
    <Pagination
      pagination={pagination}
      onPagination={handlePaginationChange}
      paginatedMetadata={paginatedTicketsMetadata}
    />
  );
};
