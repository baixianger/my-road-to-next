"use client";

import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { searchParser } from "@/features/ticket/types";
import { useQueryState } from "nuqs";

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedHandleSearch = useDebounceCallback(handleSearch, 200);

  return (
    <Input
      placeholder={placeholder}
      onChange={debouncedHandleSearch}
      defaultValue={search}
    />
  );
};
