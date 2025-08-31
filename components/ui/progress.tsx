import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-[var(--border)]", className)}>
      <div
        className="h-full w-full origin-left rounded-full bg-accent"
        style={{ transform: `scaleX(${Math.max(0, Math.min(100, value)) / 100})` }}
      />
    </div>
  );
}