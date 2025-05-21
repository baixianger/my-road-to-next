"use client";

import { LucideShieldX } from "lucide-react";
import { Placeholder } from "@/components/placeholder";

export default function Error({error}: {error: Error}) {
  if (error) {
    console.error("Error in ticket page:", error);
  }
  return (
    <>
      <Placeholder
        label={"Failed to fetch ticket"}
        icon=<LucideShieldX />
      />
    </>
  );
}