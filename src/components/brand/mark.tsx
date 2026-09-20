import { cn } from "@/lib/cn";

export function RouterMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="8" className="router-mark-plate fill-subtle" />
      <circle cx="10" cy="10" r="2.1" className="router-mark-node fill-fg" />
      <circle cx="22" cy="10" r="2.1" className="router-mark-node fill-fg" />
      <circle cx="22" cy="22" r="2.1" className="router-mark-node fill-fg" />
      <circle cx="10" cy="22" r="1.5" className="router-mark-node fill-muted" />
      <path
        d="M10 10h12M22 10v12M10 10c0 8 4 12 12 12"
        className="router-mark-edge stroke-fg"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
