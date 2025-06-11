import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
};

export const SearchInput = ({
  placeholder,
  onChange,
  defaultValue,
}: SearchInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};
