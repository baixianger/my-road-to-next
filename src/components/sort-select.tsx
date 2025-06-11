import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortObject = {
  sortKey: string;
  sortValue: string;
};

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  value: SortObject;
  onSort: (compositeKey: string) => void;
  options: SortSelectOption[];
};

export const SortSelect = ({ options, onSort, value }: SortSelectProps) => {
  return (
    <Select
      defaultValue={value.sortKey + "_" + value.sortValue}
      onValueChange={onSort}
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
