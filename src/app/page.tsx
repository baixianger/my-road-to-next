import Link from "next/link";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return <div>
    <h1 className="text-4xl text-center">Welcome to the home page</h1>
    <Link href={ticketsPath()} className="text-2xl text-blue-500 hover:underline">
      Go to tickets page
    </Link>
  </div>;
};

export default HomePage