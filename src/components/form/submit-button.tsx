"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";
import clsx from "clsx";
import { cloneElement, ReactElement, SVGProps } from "react";

type SubmitButtonProps = {
  className?: string;
  label?: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const SubmitButton = ({
  label,
  icon,
  variant = "default",
  size = "default",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending && (
        <LucideLoaderCircle
          className={clsx("h-4 w-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}
      {label}
      {pending ? null : icon ? (
        cloneElement(icon, {
          className: clsx("w-4 h-4", {
            "ml-2": !!label,
          }),
        })
      ) : null}
    </Button>
  );
};

export { SubmitButton };