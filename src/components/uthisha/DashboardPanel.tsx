import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { ProgressRing } from "./ProgressRing";
import { MODES, type ModeKey, type ViewKey } from "./types";
import { progressBanner, type LangKey } from "./content";
import type { TasksApi } from "./useTasks";
import { cn } from "@/lib/utils";

interface Props {
  mode: ModeKey;
  language: LangKey;
  codeSwitch: boolean;
  api: TasksApi;
  onNavigate: (view: ViewKey) => void;
}

export function DashboardPanel({ mode, language, codeSwitch, api, onNavigate }: Props) {
  const config = MODES[mode];
  const { done, total, pct } = api;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-7 text-primary-foreground sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
          {config.icon} {config.label} mode
        </p>
        <h1 className="font-display relative mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
          Welcome to Uthisha AI
        </h1>
        <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
          {config.tone}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
        <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-base font-bold">Today's checklist</h2>
          <p className="mt-1 text-xs text-muted-foreground">Tailored to your active mode</p>
          <div className="mt-5 flex items-center gap-5">
            <ProgressRing done={done} total={total} />
            <div className="min-w-0 space-y-2 text-sm">
              <p className="font-semibold">
                {done} of {total} tasks done
              </p>
              <p
                className={cn(
                  "text-xs font-bold leading-relaxed",
                  pct >= 100 ? "text-success" : pct >= 50 ? "text-primary" : "text-gold-foreground",
                )}
              >
                {progressBanner(pct, language, codeSwitch)}
              </p>
              <button
                type="button"
                onClick={() => onNavigate("planner")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Open planner <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <QuickAction
            icon={<Sparkles className="h-5 w-5" />}
            title="Smart Generator"
            body="Draft a professional email or a WhatsApp message in seconds."
            cta="Launch generator"
            onClick={() => onNavigate("generator")}
          />
          <QuickAction
            icon={<MessageCircle className="h-5 w-5" />}
            title="Chat Coach"
            body="Ask Uthisha to explain business and career concepts simply."
            cta="Start chatting"
            onClick={() => onNavigate("chat")}
          />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  body,
  cta,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col items-start rounded-3xl border bg-card p-6 text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
    >
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
        {icon}
      </span>
      <span className="font-display mt-4 text-base font-bold">{title}</span>
      <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</span>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}
