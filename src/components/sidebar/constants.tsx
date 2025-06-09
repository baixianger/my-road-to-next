import { accountProfilePath, homePath, ticketsPath } from "@/paths";
import { LucideCircleUser, LucideLibrary, LucideBook } from "lucide-react";
import { NavItem } from "./types";

export const sidebarNav: NavItem[] = [
  {
    title: "Home",
    href: homePath(),
    icon: <LucideLibrary />,
  },
  {
    title: "Tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
  },
  {
    separator: true,
    title: "Account",
    href: accountProfilePath(),
    icon: <LucideCircleUser />,
  }
];

export const closedClassName = 
`text-background opacity-0 transition-all duration-300 
group-hover:z-40 group-hover:ml-4 group-hover:rounded 
group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100`