"use client";

import { SearchInput } from "@/components/search-input";
import { useQueryState } from "nuqs";
import { searchParser } from "../types";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      value={search}
      placeholder={placeholder}
      onChange={setSearch}
    />
  );
};

export { TicketSearchInput };
