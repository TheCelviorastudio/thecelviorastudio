export const SITE = {
  name: "thecelviorastudio",
  shortName: "celviora",
  tagline: "curated scoops of aesthetic jewelry & stationery",
  description:
    "thecelviorastudio hand-picks playful, pastel jewelry and stationery pieces in small curated scoops. Sweet little things for your ears, wrists, and desk.",
  url: "https://thecelviorastudio.com",
  email: "hello@thecelviorastudio.com",
  instagram: "https://instagram.com/thecelviorastudio",
  locale: "en_IN",
} as const;

export const CURRENCY = {
  code: "INR",
  locale: "en-IN",
  symbol: "₹",
} as const;

export type ShippingMethod = "standard" | "express";

export const SHIPPING = {
  freeThreshold: 999,
  methods: {
    standard: {
      id: "standard",
      label: "Standard scoop",
      description: "Tracked delivery across India",
      price: 79,
      eta: "5–7 days",
    },
    express: {
      id: "express",
      label: "Express scoop",
      description: "Priority dispatch, faster courier",
      price: 199,
      eta: "2–3 days",
    },
  },
} as const satisfies {
  freeThreshold: number;
  methods: Record<
    ShippingMethod,
    { id: ShippingMethod; label: string; description: string; price: number; eta: string }
  >;
};

export const MAX_QTY = 10;

export function shippingCost(method: ShippingMethod, subtotal: number): number {
  if (method === "standard" && subtotal >= SHIPPING.freeThreshold) return 0;
  return SHIPPING.methods[method].price;
}

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=jewelry", label: "Jewelry" },
  { href: "/shop?category=stationery", label: "Stationery" },
  { href: "/about", label: "Our story" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: "/shop", label: "All scoops" },
    { href: "/shop?category=jewelry", label: "Jewelry" },
    { href: "/shop?category=stationery", label: "Stationery" },
    { href: "/shop?sort=newest", label: "New arrivals" },
  ],
  studio: [
    { href: "/about", label: "Our story" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping-returns", label: "Shipping & returns" },
  ],
} as const;
