import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SidebarNav } from "@/components/uthisha/Sidebar";
import { DashboardPanel } from "@/components/uthisha/DashboardPanel";
import { GeneratorPanel } from "@/components/uthisha/GeneratorPanel";
import { PlannerPanel } from "@/components/uthisha/PlannerPanel";
import { ChatPanel } from "@/components/uthisha/ChatPanel";
import { LANGUAGES, MODES, NAV_ITEMS, type ModeKey, type ViewKey } from "@/components/uthisha/types";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uthisha AI — Multilingual SA Productivity Coach" },
      {
        name: "description",
        content:
          "Uthisha AI is a multilingual South African productivity coach for township SMMEs and recent graduates: smart message drafts, daily planners and a chat mentor.",
      },
      { property: "og:title", content: "Uthisha AI — Multilingual SA Productivity Coach" },
      {
        property: "og:description",
        content:
          "Draft emails and WhatsApps, plan your day and learn from a patient AI teacher — in English, isiZulu, Sesotho and isiXhosa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [mode, setMode] = useState<ModeKey>("smme");
  const [language, setLanguage] = useState<LangKey>("en");
  const [codeSwitch, setCodeSwitch] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const api = useTasks(mode);


  const select = (next: ViewKey) => {
    setView(next);
    setDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen shrink-0 md:block">
        <SidebarNav active={view} onSelect={select} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 animate-in slide-in-from-left duration-300">
            <SidebarNav active={view} onSelect={select} showClose onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="font-display truncate text-sm font-bold md:hidden">Uthisha AI</p>
              <p className="hidden truncate text-sm text-muted-foreground sm:block">
                Your Multilingual South African Productivity Coach
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-4 pb-3 sm:px-6">
            <div className="flex rounded-full border bg-secondary/60 p-1">
              {(Object.keys(MODES) as ModeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    mode === key
                      ? "bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-glow)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {MODES[key].icon} {MODES[key].label}
                </button>
              ))}
            </div>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-9 w-[9.5rem] rounded-full bg-secondary/60 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.value} value={l.value} className="text-xs">
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <label className="flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1.5">
              <Switch checked={codeSwitch} onCheckedChange={setCodeSwitch} />
              <span className="text-xs font-semibold">Mix Local Phrases 🇿🇦</span>
            </label>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {NAV_ITEMS.find((n) => n.key === view)?.label}
          </p>
          {view === "dashboard" && <DashboardPanel mode={mode} onNavigate={setView} />}
          {view === "generator" && <GeneratorPanel mode={mode} />}
          {view === "planner" && <PlannerPanel mode={mode} />}
          {view === "chat" && <ChatPanel mode={mode} />}
        </main>
      </div>
    </div>
  );
}
