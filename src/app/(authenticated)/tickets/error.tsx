"use client";

import { LucideShieldX } from "lucide-react";
import { Placeholder } from "@/components/placeholder";

export default function Error({error}: {error: Error}) {
  return (
    <Placeholder
      label={error.message || "Something went wrong"}
      icon=<LucideShieldX />
    />
  );
}