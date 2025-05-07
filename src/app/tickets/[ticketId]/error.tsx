"use client";

import { LucideShieldX } from "lucide-react";
import { Placeholder } from "@/components/placeholder";

export default function Error({error}: {error: Error}) {
  return (
    <Placeholder
      label={error.message || "Failed to fetch ticket"}
      icon=<LucideShieldX />
    />
  );
}