"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="rounded-full inline-flex h-8 w-8"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <LucideSun
        className="absolute
          h-3 w-3 rotate-0 scale-100 
          transition-transform duration-500 ease-in-out
          dark:-rotate-180 dark:scale-0
        "
      />
      <LucideMoon
        className="absolute
        h-3 w-3 -rotate-180 scale-0 
        transition-transform duration-500 ease-in-out
        dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
