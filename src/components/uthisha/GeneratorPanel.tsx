import { useState } from "react";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { MODES, type ModeKey } from "./types";
import { COACHING, TONES, getDraft, type LangKey, type Tone } from "./content";
import { cn } from "@/lib/utils";

interface Props {
  mode: ModeKey;
  language: LangKey;
  codeSwitch: boolean;
}

export function GeneratorPanel({ mode, language, codeSwitch }: Props) {
  const [tone, setTone] = useState<Tone>(TONES[0]);
  const [brief, setBrief] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setLoading(true);
    window.setTimeout(() => {
      setDraft(getDraft(mode, language, tone, codeSwitch, brief));
      setLoading(false);
    }, 1000);
  };

  const copy = async () => {
    if (!draft.trim()) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
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
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
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
          onClick={generate}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-gold)] px-6 py-3.5 font-display text-sm font-bold text-gold-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uthisha is writing…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Draft
            </>
          )}
        </button>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display truncate text-base font-bold">Your draft</h2>
            <p className="truncate text-xs text-muted-foreground">
              {tone} · {MODES[mode].label} · editable
            </p>
          </div>
          <button
            type="button"
            onClick={copy}
            disabled={!draft.trim()}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors hover:bg-secondary disabled:opacity-50",
              copied && "border-success/50 bg-success/10 text-success",
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        {draft ? (
          <Textarea
            aria-label="Editable draft message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={14}
            className="mt-4 rounded-2xl bg-secondary/60 font-sans text-sm leading-relaxed"
          />
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
            Your draft will appear here — and you'll be able to edit every word before copying.
          </p>
        )}
      </section>

      <aside className="rounded-3xl border border-gold/40 bg-gold/12 p-5">
        <p className="font-display text-sm font-bold text-gold-foreground">
          💡 Uthisha's Coaching Corner
        </p>
        <p className="mt-2 text-xs leading-relaxed text-gold-foreground/85">{COACHING[tone]}</p>
      </aside>
    </div>
  );
}
