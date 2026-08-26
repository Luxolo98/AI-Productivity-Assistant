import { useEffect, useState } from "react";
import { MODE_TASKS } from "./content";
import type { ModeKey } from "./types";

export interface Task {
  id: string;
  label: string;
  done: boolean;
  custom?: boolean;
}

const seed = (mode: ModeKey): Task[] =>
  MODE_TASKS[mode].map((label, i) => ({ id: `${mode}-${i}`, label, done: i < 2 }));

export function useTasks(mode: ModeKey) {
  const [tasks, setTasks] = useState<Task[]>(() => seed(mode));

  useEffect(() => {
    setTasks(seed(mode));
  }, [mode]);

  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const toggle = (id: string, value: boolean) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: value } : t)));

  const add = (label: string) =>
    setTasks((prev) => [
      ...prev,
      { id: `custom-${Date.now()}`, label, done: false, custom: true },
    ]);

  const remove = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return { tasks, done, total, pct, toggle, add, remove };
}

export type TasksApi = ReturnType<typeof useTasks>;
