"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { sidebarNav } from "./constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
    setIsTransition(true);
    setTimeout(() => setIsTransition(false), 300);
  };

  return (
    <nav
      className={cn(
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[55px]" : "w-[55px]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="ps-3 py-2">
        <nav className="space-y-2">
          {sidebarNav.map((item) => (
            <SidebarItem 
              key={item.title} 
              navItem={item} 
              isOpen={isOpen} 
            />
          ))}
        </nav>
      </div>
    </nav>
  )
};

export { Sidebar };