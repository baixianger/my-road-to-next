"use client";

import { SearchInput } from "@/components/search-input";
import { useQueryState, useQueryStates } from "nuqs";
import { paginationParser, paginationOptions, searchParser } from "../types";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const handleSearch = (search: string) => {
    setSearch(search);
    setPagination({ ...pagination, page: 0 });
  };

  return (
    <SearchInput
      value={search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};

export { TicketSearchInput };
