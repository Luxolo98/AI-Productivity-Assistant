import { X } from "lucide-react";
import { NAV_ITEMS, type ViewKey } from "./types";
import { cn } from "@/lib/utils";

function BrandLogo() {
  return (
    <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-gold)] shadow-[var(--shadow-glow)]">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-foreground" aria-hidden="true">
        <path
          d="M12 6.5C10 4.8 7.4 4.3 4.5 4.5v13c2.9-.2 5.5.3 7.5 2 2-1.7 4.6-2.2 7.5-2v-13c-2.9-.2-5.5.3-7.5 2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 6.5v14" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="3" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}

interface SidebarProps {
  active: ViewKey;
  onSelect: (view: ViewKey) => void;
  onClose?: () => void;
  showClose?: boolean;
}

export function SidebarNav({ active, onSelect, onClose, showClose }: SidebarProps) {
  return (
    <nav className="flex h-full w-64 flex-col bg-slate-panel text-slate-panel-foreground">
      <div className="flex items-center gap-3 px-5 py-6">
        <BrandLogo />
        <div className="min-w-0">
          <p className="font-display truncate text-lg font-bold tracking-tight">Uthisha AI</p>
          <p className="truncate text-[11px] text-slate-panel-foreground/60">Learn. Plan. Grow.</p>
        </div>
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="ml-auto rounded-lg p-2 text-slate-panel-foreground/70 transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                isActive
                  ? "bg-white/12 text-slate-panel-foreground shadow-[inset_3px_0_0_0_var(--gold)]"
                  : "text-slate-panel-foreground/70 hover:bg-white/8 hover:text-slate-panel-foreground",
              )}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{item.label}</span>
                <span className="block truncate text-[11px] text-slate-panel-foreground/50">
                  {item.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="m-3 rounded-xl bg-white/8 p-4">
        <p className="text-xs font-semibold text-gold">Sawubona! 👋</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-panel-foreground/65">
          Uthisha means teacher. Ask me anything, sikhona nathi.
        </p>
      </div>
    </nav>
  );
}
