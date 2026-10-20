import { DOCS_UPDATE } from "@/lib/docs/updates";
import { cn } from "@/lib/cn";

type UpdateDotProps = {
  className?: string;
  /** When true, render a quieter faded state (already visited). */
  seen?: boolean;
};

/** Small red badge marking content updated in the current docs sync. */
export function UpdateDot({ className, seen = false }: UpdateDotProps) {
  return (
    <span
      className={cn(
        "docs-update-dot inline-block size-1.5 shrink-0 rounded-full",
        seen ? "opacity-35" : "opacity-100",
        className,
      )}
      title={DOCS_UPDATE.label}
      aria-label={DOCS_UPDATE.label}
    />
  );
}
