import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ProgressRing } from "./ProgressRing";
import { MODES, type ModeKey } from "./types";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  label: string;
  done: boolean;
}

export function PlannerPanel({ mode }: { mode: ModeKey }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setTasks(
      MODES[mode].tasks.map((label, i) => ({ id: `${mode}-${i}`, label, done: i < 2 })),
    );
  }, [mode]);

  const done = tasks.filter((t) => t.done).length;

  const addTask = () => {
    const label = draft.trim();
    if (!label) return;
    setTasks((prev) => [...prev, { id: `custom-${Date.now()}`, label, done: false }]);
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
        <ProgressRing done={done} total={tasks.length} size={148} />
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold">Today's progress</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {done === tasks.length && tasks.length > 0
              ? "Wonke umsebenzi uphelile — well done, you finished everything today! 🎉"
              : "Tick items off as you go. Small consistent wins beat one big rush."}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-base font-bold">Checklist</h2>
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary",
                  task.done && "border-success/40 bg-success/10 hover:bg-success/15",
                )}
              >
                <Checkbox
                  checked={task.done}
                  onCheckedChange={(v) =>
                    setTasks((prev) =>
                      prev.map((t) => (t.id === task.id ? { ...t, done: v === true } : t)),
                    )
                  }
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
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add custom task…"
            className="rounded-2xl bg-secondary/60"
          />
          <button
            type="button"
            onClick={addTask}
            aria-label="Add custom task"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-gold)] text-gold-foreground shadow-[var(--shadow-glow)]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
