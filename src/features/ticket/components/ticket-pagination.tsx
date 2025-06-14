"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { paginationOptions } from "../types";
import { paginationParser, searchParser } from "../types";
import { Pagination } from "@/components/pagination";
import { PageAndSize } from "@/components/pagination";
import { useEffect, useRef } from "react";

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

  const [search] = useQueryState("search", searchParser);
  const preSearch = useRef(search);
  useEffect(() => {
    if (preSearch.current !== search) {
      setPagination({ ...pagination, page: 0 });
    }
    preSearch.current = search;
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={handlePaginationChange}
      paginatedMetadata={paginatedTicketsMetadata}
    />
  );
};
