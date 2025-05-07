import { clsx } from "clsx";
import { LucideTicket } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 self-center flex items-center justify-center gap-x-2">
      <LucideTicket className="w-20 h-20"/>
      {/* generate three dot */}
      {[...Array(3)].map((_, index) => (
        <div key={index} 
        className={clsx(
          'w-4 h-4 mx-1.5 rounded-full bg-black opacity-100',
          {
            'animate-bouncing-loader-000': index === 0,
            'animate-bouncing-loader-200': index === 1,
            'animate-bouncing-loader-400': index === 2
          }
        )}>
        </div>
      ))}
    </div>
  );
}