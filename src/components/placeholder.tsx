import { LucideMessageSquareWarning } from 'lucide-react';
import { cloneElement } from 'react';

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<HTMLElement>;
  button?: React.ReactElement<HTMLElement>;
};

const Placeholder = ({
  label, 
  icon=<LucideMessageSquareWarning />,
  button=<div></div>,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2 animate-fade-in-from-top">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-8",
      })}
    </div> 
  );
}

export { Placeholder };