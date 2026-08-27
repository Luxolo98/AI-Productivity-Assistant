import type { ModeKey } from "./types";

export type LangKey = "en" | "zu" | "st" | "xh";

export const TONES = [
  "WhatsApp Promo",
  "Ubuntu Corporate",
  "Polite Cover Letter",
  "LinkedIn DM",
] as const;
export type Tone = (typeof TONES)[number];

/* ------------------------------------------------------------------ drafts */

const DRAFTS: Record<string, string> = {
  "smme|zu|WhatsApp Promo": `Ngqanga yomfana! Khon' i-Special kule wekhini eNomsa's Fresh Produce 🔥

🥔 Isaka lamazambane (10kg) — R89 (kwakuyi-R110)
🫗 Uwoyela wokupheka (2L) — R59
🍞 Ufulawa (5kg) — R74

Sivula ngo-07:00 kuya ku-18:00, izinsuku zonke. Uma uthenga ngaphezu kuka-R250, sikulethela mahhala ekhaya (radius 3km).

Yebo, siyakwamukela i-cash, i-Yoco card ne-EFT.
Ngiyabonga, sihlangane esitolo! 🙏
— Nomsa, 073 555 0142`,

  "smme|en|Ubuntu Corporate": `Dear Wholesale Partner,

I trust this email finds you well. I am writing to politely inquire about your bulk pricing structure for maize meal, cooking oil and flour for the coming quarter.

Our store in Tembisa currently moves roughly 40 units of each line per week, and we would like to build a long-term relationship rather than a once-off order. If you are able to offer a standing monthly account with Friday deliveries, we would gladly commit to a fixed volume.

Kindly confirm your best rate, minimum order quantity, and delivery fee. I am also happy to arrange a short call at your convenience.

Thank you for your time and consideration — we grow together.

Warm regards,
Nomsa Mahlangu
Owner, Nomsa's Fresh Produce | 073 555 0142`,

  "graduate|xh|Polite Cover Letter": `Molo,

Ndiyazisa ngomdla wam kulo msebenzi we-Junior Data Analyst endiwubone kwi-website yenu. Ndigqibe i-BCom (Information Systems) kwi-2025, kwaye ndinolwazi lokusebenza nge-Excel, SQL kunye ne-Power BI.

Ngethuba lokuqeqeshwa kwam, ndakha i-dashboard eyanciphisa ixesha lokubala istoko ngamashumi amane ekhulwini (40%) kwivenkile encinci. Ndifuna ukusebenzisa eso khono kwiqela lakho.

Ndiyabulela kakhulu ngexesha lakho. Ndikulungele udliwano-ndlebe nangaliphi na ixesha kule veki.

Ozithobayo,
Sipho Mahlangu | 082 555 0199`,

  "graduate|st|LinkedIn DM": `Dumela,

Ke thabela ho hokahana le uena. Lebitso la ka ke Sipho — ke qetile lengolo la BCom (Information Systems) selemong sa 2025, mme ke batla mosebetsi wa pele wa data analysis.

Ke bone hore u sebetsa ka har'a sehlopha sa data ha koponong ya lona, mme nka thabela haholo ho utloa keletso e le 'ngoe: ke bofe bokgoni bo lokelang ho ba pele-pele ha motho a qala mosebetsing ona?

Ha u na le motsotso, nka romela CV ea ka bakeng sa maikutlo a hao.

Kea leboha nakong ea hao,
Sipho Mahlangu`,
};

const FALLBACK_INTRO: Record<LangKey, string> = {
  en: "Good day",
  zu: "Sawubona",
  st: "Dumela",
  xh: "Molo",
};

const TONE_BODY: Record<Tone, Record<"smme" | "graduate", string>> = {
  "WhatsApp Promo": {
    smme: "We have fresh specials in store this week — great prices on the basics your family needs. Cash, card and EFT all welcome. Free delivery on orders over R250.",
    graduate:
      "I am currently open to junior roles and short internships. If you hear of anything in data, admin or operations, please keep me in mind — I can start immediately.",
  },
  "Ubuntu Corporate": {
    smme: "I am writing to politely inquire about your bulk pricing and delivery terms. We would like to build a long-term account rather than place a once-off order.",
    graduate:
      "I am writing to express my sincere interest in the role advertised on your careers page, and to share how my training could support your team's goals.",
  },
  "Polite Cover Letter": {
    smme: "Please accept this letter as our formal application to supply your organisation. We are a registered small business with three years of consistent trading history.",
    graduate:
      "I recently completed my degree and would be grateful for the opportunity to contribute to your team. My strongest skills are analysis, clear reporting and reliability.",
  },
  "LinkedIn DM": {
    smme: "I would love to connect. I run a small township retail business and I am always looking to learn from people who understand supply chains.",
    graduate:
      "I would love to connect and learn from your career path. If you have a spare minute, I would appreciate one piece of advice for someone starting out.",
  },
};

const SIGNOFF: Record<LangKey, string> = {
  en: "Kind regards,",
  zu: "Ngiyabonga kakhulu,",
  st: "Kea leboha,",
  xh: "Ndiyabulela,",
};

export function getDraft(
  mode: ModeKey,
  lang: LangKey,
  tone: Tone,
  codeSwitch: boolean,
  brief: string,
) {
  const effectiveLang: LangKey = codeSwitch ? lang : "en";
  const exact = DRAFTS[`${mode}|${effectiveLang}|${tone}`] ?? DRAFTS[`${mode}|en|${tone}`];
  if (exact) return exact;

  const name = mode === "smme" ? "Nomsa Mahlangu" : "Sipho Mahlangu";
  const extra = brief.trim() ? `\n\nSpecifically: ${brief.trim()}` : "";
  return `${FALLBACK_INTRO[effectiveLang]},

${TONE_BODY[tone][mode]}${extra}

${SIGNOFF[effectiveLang]}
${name}`;
}

export const COACHING: Record<Tone, string> = {
  "WhatsApp Promo":
    "Lead with the price, not the greeting — a customer scrolling WhatsApp decides in two seconds. Always close with your trading hours and a phone number.",
  "Ubuntu Corporate":
    "Warmth wins in South African business, but keep one number in every paragraph. Relationship plus volume is what unlocks a standing account.",
  "Polite Cover Letter":
    "Open with the value you created, not the degree you hold. One measurable result (like 40% faster stock counts) beats three lines of adjectives.",
  "LinkedIn DM":
    "Ask for one small thing — advice, not a job. Short messages with a single clear question get replies; long ones get ignored.",
};

/* ---------------------------------------------------------------- checklist */

export const MODE_TASKS: Record<ModeKey, string[]> = {
  smme: [
    "Audit morning flour/oil stock",
    "Send WhatsApp community promo",
    "Cash up cash & digital Yoco sales",
    "Study Profit vs Cash Flow",
  ],
  graduate: [
    "Tailor CV profile",
    "Search CAPACITI internships",
    "Practice interview questions",
    "Start Uthisha Mock Interview",
  ],
};

export function progressBanner(pct: number, lang: LangKey, codeSwitch: boolean) {
  const band = pct >= 100 ? "done" : pct >= 50 ? "mid" : "low";
  const english = {
    low: "Start step-by-step!",
    mid: "Excellent progress, keep pushing!",
    done: "Incredible job! You've checked off every task today!",
  }[band];

  if (!codeSwitch || lang === "en") return english;

  const local = {
    zu: { low: "Qala kancane kancane, uzo-fika!", mid: "Sharp, uyaqhuba!", done: "Halala! Ugqibe konke!" },
    xh: { low: "Qala kancinci kancinci, uyakufika!", mid: "Kulungile, uyaqhuba!", done: "Halala! Ugqibe konke!" },
    st: { low: "Qala butle butle, o tla fihla!", mid: "Sharp, o ntse o tsoela pele!", done: "Halala! O phethile tsohle!" },
  }[lang as "zu" | "xh" | "st"];

  return `${local[band]} — ${english}`;
}

/* --------------------------------------------------------------------- chat */

export const GREETINGS: Record<LangKey, string> = {
  en: "Hello! I'm Uthisha, your patient teacher. Ask me anything about business or your career and I'll explain it with everyday South African examples.",
  zu: "Yebo! Ngingu-Uthisha, uthisha wakho onesineke. Buza noma yini mayelana nebhizinisi noma umsebenzi, ngizokuchazela ngezibonelo zasekhaya.",
  xh: "Molo! Ngingu-Uthisha, utitshala wakho onomonde. Buza nantoni na ngeshishini okanye ngomsebenzi, ndiza kukucacisela ngemizekelo yasekhaya.",
  st: "Dumela! Ke nna Uthisha, mosuoe oa hao ea mamellang. Mpotse eng kapa eng ka khoebo kapa mosebetsi, ke tla hlalosa ka mehlala ea heno.",
};

export const CHIPS: Record<ModeKey, string[]> = {
  smme: ["Explain Profit vs Revenue", "What is Prompt Engineering?", "How do I price my products?"],
  graduate: ["Mock Interview Prep", "Explain Profit vs Revenue", "What is Prompt Engineering?"],
};

const PROFIT_REVENUE =
  "Let's use the taxi rank 🚕\n\nRevenue (Inzuzo isiyonke) is all the taxi fares collected in a day. It looks huge! But Profit (Inzuzo ehlanzekile) is only what is left after paying for petrol, the owner's target, and rank fees. Revenue is the money you touch; Profit is the money you keep!";

const PROMPT_ENGINEERING =
  "Prompt Engineering, ka Sesotho 🚖\n\nHore o fihle moo o yang ka taxi, o lokela ho bolella mokhanni hantle hore o theoha kae (e.g., 'Khona le lekgotla'). Prompt Engineering ke ho bolella AI hantle le ka botlalo seo o se batlang hore e se ke ya u lahla!";

const REPLIES: { match: RegExp; reply: string }[] = [
  { match: /profit|revenue|inzuzo|cash flow/i, reply: PROFIT_REVENUE },
  { match: /prompt|ai|chatgpt|engineer/i, reply: PROMPT_ENGINEERING },
  {
    match: /interview|mock/i,
    reply:
      "Mock interview, let's start 🎤\n\nQuestion 1: \"Tell me about yourself.\" Answer in three beats — what you studied, one real thing you built or fixed, and why this role. Keep it to 60 seconds.\n\nThink of it like a taxi driver shouting the route: short, clear, and everyone knows exactly where you're going. Type your answer and I'll coach you on it.",
  },
  {
    match: /price|pricing|charge/i,
    reply:
      "Pricing, step by step 💰\n\n1. Add what one unit truly costs you (stock + transport + packaging).\n2. Add your time — your hours are not free.\n3. Add your margin (start at 25-30%).\n\nIf the shop down the road is cheaper, don't drop your price — add value: delivery, credit for regulars, or a combo deal.",
  },
  {
    match: /cv|resume/i,
    reply:
      "CV clinic 📄\n\nYour top three lines must show results, not duties. Swap \"Responsible for stock\" for \"Cut stock-count time by 40% by building a simple tracker.\" Numbers make a recruiter slow down and read.",
  },
];

export function getReply(message: string) {
  const hit = REPLIES.find((r) => r.match.test(message));
  if (hit) return hit.reply;
  return `Good question — let's break it down 🙌\n\nTell me a bit more about your situation and I'll explain it with a real example. In the meantime, try one of the quick starts below: profit vs revenue, prompt engineering, or interview prep. Kancane kancane, siyafika.`;
}

export const DISCLAIMERS: Record<LangKey, { title: string; body: string }> = {
  en: {
    title: "Translation Safeguard",
    body: "While Uthisha AI strives for cultural accuracy, AI software can occasionally hallucinate or miss corporate nuances. Always verify professional documents before sending.",
  },
  zu: {
    title: "Isixwayiso",
    body: "Nakuba u-Uthisha AI ezama ukuhumusha ngendlela eyiyo, i-AI ingaphuthelwa yimiqondo ethile yamasiko. Sicela uhlole yonke imibhalo ngaphambi kokuyisebenzisa.",
  },
  xh: {
    title: "Isilumkiso",
    body: "Nakuba u-Uthisha AI ezama ukukhombisa ukunyaniseka, i-AI ingasilela kwiintonas zomthonyama. Hlola yonke imibhalo phambi kokuba uyithumele.",
  },
  st: {
    title: "Tlhokomelo",
    body: "Leha Uthisha AI a leka ho fetolela hantle, AI e ka lahleheloa ke moelelo oa setso. Ka kopo, hlahloba melaetsa eohle pele u e sebelisa.",
  },
};
