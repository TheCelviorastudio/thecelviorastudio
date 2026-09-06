export interface Milestone {
  year: string;
  title: string;
  body: string;
  palette: "lavender" | "butter" | "pink" | "mint" | "sky";
}

export const milestones: Milestone[] = [
  {
    year: "2023",
    title: "A desk, a doodle, a drawer of hoops",
    body: "It started with a habit of buying too many earrings and too many notebooks. We figured other people had the same problem, so we made it a shop.",
    palette: "butter",
  },
  {
    year: "2024",
    title: "The first scoop",
    body: "Twelve pieces, one Instagram post, sold out in a weekend. We learned to pack boxes faster and never looked back.",
    palette: "pink",
  },
  {
    year: "2025",
    title: "Stationery joins the party",
    body: "Notebooks and pens felt like the natural friends of tiny jewelry. Turns out our customers agreed. The Dot Grid Dream notebook is still our best seller.",
    palette: "lavender",
  },
  {
    year: "2026",
    title: "Our own little corner of the internet",
    body: "This site. Built to feel like the pastel, sticker-covered desk it came from. Thanks for being here.",
    palette: "mint",
  },
];

export const values = [
  { title: "Small batches", body: "We'd rather sell out than overstock." },
  { title: "Skin-friendly", body: "Nickel-free posts and honest base metals." },
  { title: "Gentle paper", body: "100 gsm, fountain-pen friendly, no bleed." },
  { title: "Plastic-light", body: "Paper mailers, paper tape, recycled fill." },
];

export const team = [
  { name: "Cel", role: "Curator & founder", palette: "pink" as const, emoji: "🍦" },
  { name: "Viora", role: "Paper person", palette: "lavender" as const, emoji: "📒" },
  { name: "Momo", role: "Studio cat, QA", palette: "butter" as const, emoji: "🐱" },
];
