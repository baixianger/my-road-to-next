import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";


type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}

export { SubmitButton }