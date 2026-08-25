export type ViewKey = "dashboard" | "generator" | "planner" | "chat";

export type ModeKey = "smme" | "graduate";

export const NAV_ITEMS: { key: ViewKey; icon: string; label: string; hint: string }[] = [
  { key: "dashboard", icon: "📊", label: "Dashboard Overview", hint: "Your daily snapshot" },
  { key: "generator", icon: "📥", label: "Smart Generator", hint: "Email & WhatsApp drafts" },
  { key: "planner", icon: "📋", label: "Daily Planner", hint: "Operations & routine" },
  { key: "chat", icon: "💬", label: "Uthisha Chat Coach", hint: "Your tech mentor" },
];

export const MODES: Record<
  ModeKey,
  { icon: string; label: string; tone: string; tasks: string[] }
> = {
  smme: {
    icon: "💼",
    label: "Township SMME",
    tone: "Practical, hustle-smart guidance for running your spaza, salon or delivery business.",
    tasks: [
      "Count stock & note what sold out",
      "Send today's WhatsApp specials to customers",
      "Record cash in vs cash out",
      "Follow up on one unpaid invoice",
    ],
  },
  graduate: {
    icon: "🎓",
    label: "Recent Graduate",
    tone: "Encouraging, interview-ready coaching for landing your first professional role.",
    tasks: [
      "Apply for 2 relevant vacancies",
      "Polish one CV bullet with impact numbers",
      "Message a professional on LinkedIn",
      "Practise one interview answer out loud",
    ],
  },
};

export const LANGUAGES = [
  { value: "en", label: "🇬🇧 English" },
  { value: "zu", label: "🇿🇦 isiZulu" },
  { value: "st", label: "🇿🇦 Sesotho" },
  { value: "xh", label: "🇿🇦 isiXhosa" },
];
