"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Option = {
  value: string;
  label: string;
};

type SortSelectProps = {
  defaultValue?: string;
  options: Option[];
};

export const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Select
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
