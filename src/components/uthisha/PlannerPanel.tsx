import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ProgressRing } from "./ProgressRing";
import { MODES, type ModeKey } from "./types";
import { progressBanner, type LangKey } from "./content";
import type { TasksApi } from "./useTasks";
import { cn } from "@/lib/utils";

interface Props {
  mode: ModeKey;
  language: LangKey;
  codeSwitch: boolean;
  api: TasksApi;
}

export function PlannerPanel({ mode, language, codeSwitch, api }: Props) {
  const { tasks, done, total, pct, toggle, add, remove } = api;
  const [draft, setDraft] = useState("");

  const addTask = () => {
    const label = draft.trim();
    if (!label) return;
    add(label);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Daily Operation &amp; Routine Planner</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {MODES[mode].icon} Checklist tuned for {MODES[mode].label} mode.
        </p>
      </header>

      <section className="grid gap-6 rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <ProgressRing done={done} total={total} size={148} />
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold">Today's progress</h2>
          <p
            className={cn(
              "font-display mt-3 text-lg font-bold leading-snug",
              pct >= 100 ? "text-success" : pct >= 50 ? "text-primary" : "text-gold-foreground",
            )}
          >
            {progressBanner(pct, language, codeSwitch)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {done} of {total} tasks complete. Small consistent wins beat one big rush.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-base font-bold">Checklist</h2>
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary",
                  task.done && "border-success/40 bg-success/10 hover:bg-success/15",
                )}
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={(v) => toggle(task.id, v === true)}
                  className="shrink-0"
                />
                <span
                  className={cn(
                    "min-w-0 text-sm font-medium",
                    task.done && "text-muted-foreground line-through",
                  )}
                >
                  {task.label}
                </span>
              </label>
              <button
                type="button"
                onClick={() => remove(task.id)}
                aria-label={`Delete task: ${task.label}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add custom task…"
            aria-label="Add custom task"
            className="rounded-2xl bg-secondary/60"
          />
          <button
            type="button"
            onClick={addTask}
            aria-label="Add task"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-glow)]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
