import { useEffect, useState } from "react";
import { Palette, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { applyTheme, readStoredTheme, THEMES, type ThemeId } from "@/lib/theme";

const ICONS: Record<ThemeId, typeof Sun> = {
  light: Sun,
  dark: Moon,
  color: Palette,
};

export function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeId>("dark");

  useEffect(() => {
    const current = readStoredTheme();
    setTheme(current);
    applyTheme(current);
  }, []);

  function select(next: ThemeId) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="界面风格"
      className="flex h-10 items-center rounded-lg border border-border bg-elevated p-0.5"
    >
      {THEMES.map((item) => {
        const Icon = ICONS[item.id];
        const active = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${item.label}色风格`}
            title={`${item.label}色风格`}
            onClick={() => select(item.id)}
            className={cn(
              "flex h-9 min-w-8 items-center justify-center gap-1 rounded-md px-1.5 text-xs font-medium transition-colors duration-150 sm:min-w-10 sm:px-2",
              active ? "bg-accent text-accent-fg" : "text-faint hover:text-fg",
            )}
          >
            <Icon className="hidden size-3.5 sm:block" aria-hidden />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
