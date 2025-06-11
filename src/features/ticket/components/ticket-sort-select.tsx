"use client";

import { useQueryStates } from "nuqs";
import { sortParser, sorthOptions } from "@/features/ticket/types";
import { SortSelect, SortSelectOption } from "@/components/sort-select";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sorthOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");
    setSort({ sortKey, sortValue });
  };

  return <SortSelect options={options} onSort={handleSort} value={sort} />;
};

export { TicketSortSelect };
