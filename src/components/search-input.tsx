"use client";

import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  const debouncedHandleSearch = useDebounceCallback(handleSearch, 200);

  return <Input placeholder={placeholder} onChange={debouncedHandleSearch} />;
};
