"use client";

import { SearchInput } from "@/components/search-input";
import { useQueryState } from "nuqs";
import { searchParser } from "../types";
import { useDebounceCallback } from "usehooks-ts";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedHandleSearch = useDebounceCallback(handleSearch, 200);

  return (
    <SearchInput
      placeholder={placeholder}
      onChange={debouncedHandleSearch}
      defaultValue={search}
    />
  );
};

export { TicketSearchInput };
