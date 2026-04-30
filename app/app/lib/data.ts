export const ME = { name: "Alex Rivers", handle: "alexriv" };
export const WEEKLY = ["done","done","done","done","today","none","none"] as const;
export const TRENDING = [
  { id: "t1", name: "Push / Pull / Legs · 6-day", by: "mayalifts", cat: "Hypertrophy", saves: "12.4k" },
  { id: "t2", name: "High-protein vegan 2,200",   by: "noravegan",  cat: "Diet",        saves: "9.8k"  },
  { id: "t3", name: "Marathon block — week 8",    by: "sasharuns",  cat: "Endurance",   saves: "7.1k"  },
  { id: "t4", name: "20-min mobility flow",       by: "linmoves",   cat: "Mobility",    saves: "5.6k"  },
];
export type Post =
  | { id: number; type: "routine"; author: string; handle: string; time: string; online?: boolean; shimmer?: boolean; verified?: boolean; likes: number; comments: number; liked: boolean; title: string; body: string; exercises: { name: string; detail: string; reps: string; duration: string }[]; }
  | { id: number; type: "diet";    author: string; handle: string; time: string; online?: boolean; shimmer?: boolean; verified?: boolean; likes: number; comments: number; liked: boolean; title: string; body: string; macros: { label: string; value: number; unit: string; pct: number }[]; meals: { when: string; name: string; desc: string; kcal: number }[]; }
  | { id: number; type: "tip";     author: string; handle: string; time: string; online?: boolean; shimmer?: boolean; verified?: boolean; likes: number; comments: number; liked: boolean; body: string; quote: string; };

export const POSTS: Post[] = [
  { id: 1, type: "routine", author: "Maya Okafor", handle: "mayalifts", time: "2h", online: true, shimmer: true, verified: true,
    likes: 1284, comments: 96, liked: false,
    title: "Tide-pull pull day — back & rear delts",
    body: "Heavy compound + high-rep finishers. Felt the rear delts swimming after set three. Save and try Sunday.",
    exercises: [
      { name: "Weighted pull-ups",    detail: "Neutral grip · 3 min rest", reps: "5×5",  duration: "18 min" },
      { name: "Pendlay rows",         detail: "Strict, no body english",   reps: "4×8",  duration: "14 min" },
      { name: "Single-arm cable row", detail: "Pause at peak contraction", reps: "3×12", duration: "10 min" },
      { name: "Face pulls",           detail: "Rope, eyes-level pull",     reps: "3×15", duration: "8 min"  },
      { name: "Hammer curls",         detail: "Slow eccentric",            reps: "3×10", duration: "7 min"  },
    ],
  },
  { id: 2, type: "diet", author: "Theo Marais", handle: "theoats", time: "4h", likes: 612, comments: 48, liked: true,
    title: "High-protein day — 2,200 kcal cut",
    body: "Lean cut day under 2,200 kcal. No supplements, all whole foods. Macros below — easy to swap fish for tofu.",
    macros: [
      { label: "Protein",  value: 184, unit: "g",    pct: 92 },
      { label: "Carbs",    value: 220, unit: "g",    pct: 70 },
      { label: "Fats",     value:  62, unit: "g",    pct: 55 },
      { label: "Calories", value: 2188, unit: "kcal", pct: 91 },
    ],
    meals: [
      { when: "07:30", name: "Greek yogurt + berries", desc: "Honey, almonds, oats",          kcal: 420 },
      { when: "12:00", name: "Grilled salmon bowl",     desc: "Quinoa, edamame, slaw, tahini", kcal: 680 },
      { when: "16:00", name: "Protein smoothie",        desc: "Whey, banana, peanut butter",   kcal: 380 },
      { when: "19:30", name: "Chicken stir-fry",        desc: "Bell peppers, jasmine rice",    kcal: 708 },
    ],
  },
  { id: 3, type: "tip", author: "Lin Park", handle: "linmoves", time: "6h", online: true, likes: 244, comments: 19, liked: false,
    body: "A reminder for anyone in a slump:",
    quote: "Consistency is the tide. Motivation is the wave. You don't need motivation if you let the tide carry you.",
  },
  { id: 4, type: "routine", author: "Sasha Volkov", handle: "sasharuns", time: "8h", verified: true,
    likes: 902, comments: 71, liked: false,
    title: "Z2 base run + glute activation warm-up",
    body: "Easy 50-min zone-2 run. Heart rate stayed under 145. Felt like floating. Stretches before below.",
    exercises: [
      { name: "Hip-90/90 mobility",  detail: "Slow, breathe through it",  reps: "2×8",   duration: "5 min"  },
      { name: "Banded glute bridge", detail: "Squeeze 2s at top",         reps: "3×15",  duration: "6 min"  },
      { name: "Z2 base run",         detail: "HR < 145, conversational",  reps: "50 min", duration: "50 min" },
      { name: "Calf walk-out",       detail: "Cooldown",                  reps: "3×20s", duration: "4 min"  },
    ],
  },
  { id: 5, type: "diet", author: "Kai Nguyen", handle: "kaicooks", time: "10h", online: true, shimmer: true, verified: true,
    likes: 1542, comments: 188, liked: true,
    title: "Mediterranean reset — 1,800 kcal",
    body: "Three-day reset I do after travel. Heavy on omega-3, fiber, and water-rich foods. Energy returns by day two.",
    macros: [
      { label: "Protein",  value: 128, unit: "g",    pct: 80 },
      { label: "Carbs",    value: 180, unit: "g",    pct: 64 },
      { label: "Fats",     value:  72, unit: "g",    pct: 90 },
      { label: "Calories", value: 1804, unit: "kcal", pct: 75 },
    ],
    meals: [
      { when: "08:00", name: "Shakshuka",        desc: "Two eggs, tomato, feta, sourdough", kcal: 450 },
      { when: "13:00", name: "Tuna nicoise",     desc: "Olives, green beans, egg, potato",  kcal: 540 },
      { when: "19:00", name: "Grilled sea bass", desc: "Lemon, herbs, charred zucchini",    kcal: 620 },
    ],
  },
];
