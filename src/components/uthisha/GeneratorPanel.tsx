import { useState } from "react";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { MODES, type ModeKey } from "./types";
import { cn } from "@/lib/utils";

const TONES = ["Professional", "Friendly", "Firm but polite", "Ubuntu warm"];

const DRAFTS: Record<ModeKey, string> = {
  smme: `Sawubona Mr Dlamini 👋

Hope you are well. Ngiyabonga for your order last week — the 20 crates arrived safely and the customers loved them.

I would like to place a repeat order of 30 crates for Friday delivery. Please confirm the total and whether the R150 delivery fee still applies.

Ngiyabonga kakhulu,
Nomsa — Nomsa's Fresh Produce`,
  graduate: `Good day Ms Khumalo

Thank you for taking the time to review my application for the Junior Data Analyst role.

I completed my BCom (Information Systems) in 2025 and built a sales dashboard that cut a small retailer's stock-check time by 40%. I would love the chance to bring that same practical energy to your team.

I am available for an interview at any time this week.

Kind regards,
Sipho Mahlangu`,
};

export function GeneratorPanel({ mode }: { mode: ModeKey }) {
  const [tone, setTone] = useState(TONES[0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DRAFTS[mode]);
      toast.success("Draft copied to clipboard");
    } catch {
      toast.error("Couldn't copy — please select the text manually");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Smart Email &amp; WhatsApp Generator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell Uthisha what you need to say — get a polished draft in your voice.
        </p>
      </header>

      <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
        <label htmlFor="brief" className="text-sm font-semibold">
          What must the message say?
        </label>
        <Textarea
          id="brief"
          rows={5}
          className="mt-3 resize-none rounded-2xl bg-secondary/60"
          placeholder={
            mode === "smme"
              ? "e.g. Ask my supplier for a repeat order of 30 crates for Friday…"
              : "e.g. Follow up on my job application for a junior analyst role…"
          }
        />

        <p className="mt-5 text-sm font-semibold">Select tone</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                tone === t
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-secondary-foreground hover:bg-secondary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-gold)] px-6 py-3.5 font-display text-sm font-bold text-gold-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          <Sparkles className="h-4 w-4" />
          Generate Draft
        </button>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display truncate text-base font-bold">Your draft</h2>
            <p className="truncate text-xs text-muted-foreground">{tone} tone · {MODES[mode].label}</p>
          </div>
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl bg-secondary/60 p-5 font-sans text-sm leading-relaxed text-foreground">
          {DRAFTS[mode]}
        </pre>
      </section>

      <aside className="rounded-3xl border border-gold/40 bg-gold/12 p-5">
        <p className="font-display text-sm font-bold text-gold-foreground">
          💡 Uthisha's Coaching Corner
        </p>
        <p className="mt-2 text-xs leading-relaxed text-gold-foreground/85">
          {mode === "smme"
            ? "Always confirm price and delivery date in writing — it protects your cash flow when a supplier forgets."
            : "Open with the value you created, not the degree you hold. Numbers make recruiters slow down and read."}
        </p>
      </aside>
    </div>
  );
}
