import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs", className)}>
      {children}
    </span>
  );
}