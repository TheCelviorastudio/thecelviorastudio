export const SITE = {
  name: "thecelviorastudio",
  shortName: "celviora",
  tagline: "curated scoops of jewellery, hair accessories & stationery",
  description:
    "thecelviorastudio packs playful, pastel jewellery, hair accessories and stationery into small curated gift boxes. Sweet little things for your ears, hair, wrists and desk.",
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
  { href: "/shop?sort=newest", label: "New in" },
  { href: "/about", label: "Our story" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: "/shop", label: "All scoops" },
    { href: "/shop?sort=newest", label: "New arrivals" },
    { href: "/faq", label: "What's in a box?" },
  ],
  studio: [
    { href: "/about", label: "Our story" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping-returns", label: "Shipping & returns" },
  ],
} as const;
