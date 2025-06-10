"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { sidebarNav } from "./constants";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { usePathname } from "next/navigation";
import { getActivePath, signInPath, signUpPath } from "@/paths";

const Sidebar = () => {
  const { user, isFetched } = useAuth();

  const pathName = usePathname();
  const { activeIndex } = getActivePath(
    pathName,
    sidebarNav.map((item) => item.href),
    [signUpPath(), signInPath()]
  );

  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    setIsTransition(true);
    setTimeout(() => setIsTransition(false), 300);
  };

  if (!user || !isFetched) {
    return <div className="w-[55px] bg-secondary" />;
  }

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[55px]" : "w-[55px]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="ps-1 py-2 pr-1">
        <nav className="space-y-2">
          {sidebarNav.map((item, index) => (
            <SidebarItem
              key={item.title}
              navItem={item}
              isOpen={isOpen}
              isActive={activeIndex === index}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
