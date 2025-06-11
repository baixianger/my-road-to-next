"use client";

import { useQueryStates } from "nuqs";
import {
  paginationParser,
  paginationOptions,
  sortParser,
  sorthOptions,
} from "@/features/ticket/types";
import { SortSelect, SortSelectOption } from "@/components/sort-select";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sorthOptions);
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");
    setSort({ sortKey, sortValue });
    setPagination({ ...pagination, page: 0 });
  };

  return <SortSelect options={options} onSort={handleSort} value={sort} />;
};

export { TicketSortSelect };
