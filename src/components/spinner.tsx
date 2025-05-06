import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center">
      <LucideLoaderCircle className="animate-spin h-10 w-10"/>
    </div>
  )
};

export { Spinner };