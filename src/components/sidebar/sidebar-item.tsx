import Link from "next/link";
import { NavItem } from "./types";
import { cloneElement } from "react";
import { cn } from "@/lib/utils";
import { closedClassName } from "./constants";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive?: boolean;
};

const SidebarItem = ({ isOpen, navItem, isActive }: SidebarItemProps) => {
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          isActive && "bg-muted font-bold hover:bg-muted"
        )}
      >
        {cloneElement(navItem.icon, {
          className: "ml-1 h-5 w-5 ",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden" : "w-[55px]",
            !isOpen && closedClassName
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};

export { SidebarItem };
