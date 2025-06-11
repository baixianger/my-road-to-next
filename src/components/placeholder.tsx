import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";
import { cn } from "@/lib/utils";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<HTMLElement>;
  button?: React.ReactElement<HTMLElement>;
  className?: string;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div></div>,
  className,
}: PlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex-1 self-center flex flex-col items-center justify-center gap-y-2 animate-fade-in-from-top",
        className
      )}
    >
      {cloneElement(icon, {
        className: "w-8 h-8",
      })}
      <h2 className="text-sm text-muted-foreground text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-8",
      })}
    </div>
  );
};

export { Placeholder };
