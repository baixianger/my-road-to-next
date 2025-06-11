"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryStates } from "nuqs";
import { sortParser, sorthOptions } from "@/features/ticket/types";

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
};

export const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sorthOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");
    setSort({ sortKey, sortValue });
  };

  return (
    <Select
      defaultValue={sort.sortKey + "_" + sort.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
