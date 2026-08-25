import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MODES, type ModeKey } from "./types";

const CHIPS: Record<ModeKey, string[]> = {
  smme: [
    "Explain Profit vs Revenue",
    "How do I price my products?",
    "Write a stock-count routine",
  ],
  graduate: ["Mock Interview Prep", "Explain Profit vs Revenue", "Fix my CV summary"],
};

export function ChatPanel({ mode }: { mode: ModeKey }) {
  const greeting =
    mode === "smme"
      ? "Sawubona! I'm Uthisha, your business coach. Tell me about your hustle and we'll sort out pricing, stock or customers — kancane kancane."
      : "Sawubona! I'm Uthisha, your career coach. Let's get you interview-ready and make that CV speak for you.";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Uthisha AI Chat Coach</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {MODES[mode].icon} Conversational tech mentor · {MODES[mode].label}
        </p>
      </header>

      <section className="flex h-[520px] flex-col overflow-hidden rounded-3xl border bg-card shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3 border-b bg-secondary/50 px-5 py-4">
          <Avatar />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Uthisha</p>
            <p className="truncate text-[11px] text-muted-foreground">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-success align-middle" />
              Online · always patient
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="flex items-end gap-3">
            <Avatar small />
            <p className="max-w-[85%] rounded-3xl rounded-bl-md bg-secondary px-4 py-3 text-sm leading-relaxed">
              {greeting}
            </p>
          </div>
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-3xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
              Sharp Uthisha! Where should I start today?
            </p>
          </div>
          <div className="flex items-end gap-3">
            <Avatar small />
            <p className="max-w-[85%] rounded-3xl rounded-bl-md bg-secondary px-4 py-3 text-sm leading-relaxed">
              Let's begin with one of the quick starts below — or just type your question in your own
              words. Asikho isikhathi sokulinda. 💪
            </p>
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {CHIPS[mode].map((chip) => (
              <button
                key={chip}
                type="button"
                className="shrink-0 rounded-full border border-gold/50 bg-gold/12 px-4 py-2 text-xs font-semibold text-gold-foreground transition-colors hover:bg-gold/20"
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <Input placeholder="Buza uThisha anything…" className="rounded-2xl bg-secondary/60" />
            <button
              type="button"
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-glow)]"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Avatar({ small }: { small?: boolean }) {
  return (
    <span
      className={
        (small ? "h-8 w-8 text-sm" : "h-10 w-10 text-base") +
        " grid shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground"
      }
      aria-hidden="true"
    >
      👩🏾‍🏫
    </span>
  );
}
