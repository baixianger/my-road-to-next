import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  const handleSearch = useDebounceCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250
  );
  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  );
};
