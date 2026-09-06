import type { Product } from "@/lib/commerce/types";

// NOTE: names, prices and item counts below are placeholders until the studio confirms them.

const care = {
  label: "Care",
  value:
    "Keep jewellery away from water and perfume. Store pieces in the pouch and tin they came in.",
};
const packaging = {
  label: "Packaging",
  value: "Gift-ready box with a thank-you card, a little note and pink crinkle paper.",
};
const jewellery = {
  label: "Jewellery",
  value: "Stainless steel, gold-tone, nickel-free and skin-friendly.",
};

export const products: Product[] = [
  {
    id: "box-001",
    slug: "mini-scoop",
    name: "Mini Scoop",
    tagline: "a small box of five little joys",
    description:
      "Our starter scoop. Pearl-drop heart earrings, a pair of strawberry bow clips, a rose quartz bead bracelet with a tassel, a mandala trinket tin and a cute sticky-note set. Small things, brighter days.",
    category: "gift-boxes",
    price: 499,
    tags: ["gift box", "starter", "earrings", "hair clips"],
    badges: ["bestseller"],
    images: [
      {
        src: "/products/mini-scoop.jpg",
        alt: "Mini Scoop gift box with pearl heart earrings, strawberry bow clips, a bead bracelet, a mandala tin and sticky notes",
        width: 1024,
        height: 1536,
      },
    ],
    art: { palette: "pink", shape: "heart", seed: 11 },
    details: [
      {
        label: "Inside",
        value:
          "Pearl heart earrings · 2 strawberry bow clips · rose quartz bead bracelet · mandala trinket tin · bear & latte sticky-note set",
      },
      jewellery,
      packaging,
      care,
    ],
    inStock: true,
    featured: true,
    createdAt: "2026-06-02",
  },
  {
    id: "box-002",
    slug: "sweet-scoop",
    name: "Sweet Scoop",
    tagline: "eight pieces, good things inside",
    description:
      "Everything in the Mini Scoop plus a daisy organza scrunchie, an adjustable heart ring in a velvet box and a fluffy bunny clip. The one we pack most often for birthdays.",
    category: "gift-boxes",
    price: 899,
    tags: ["gift box", "birthday", "scrunchie", "ring"],
    badges: ["bestseller"],
    images: [
      {
        src: "/products/sweet-scoop.jpg",
        alt: "Sweet Scoop gift box with pearl heart earrings, a mandala tin, sticky notes, a daisy scrunchie, a bead bracelet, a heart ring, strawberry clips and a bunny clip",
        width: 1145,
        height: 1374,
      },
    ],
    art: { palette: "butter", shape: "ring", seed: 23 },
    details: [
      {
        label: "Inside",
        value:
          "Pearl heart earrings · adjustable heart ring · rose quartz bead bracelet · daisy organza scrunchie · 2 strawberry bow clips · fluffy bunny clip · mandala trinket tin · sticky-note set",
      },
      jewellery,
      packaging,
      care,
    ],
    inStock: true,
    featured: true,
    createdAt: "2026-07-09",
  },
  {
    id: "box-003",
    slug: "big-scoop",
    name: "Big Scoop",
    tagline: "a box full of little joys",
    description:
      "The full spread. Jewellery, hair accessories, a mini bag-and-sneaker keychain, three squishy charms and a watermelon claw clip, all tucked into one very pink box. Made for the friend who loves everything.",
    category: "gift-boxes",
    price: 1499,
    tags: ["gift box", "deluxe", "necklace", "keychain"],
    badges: ["new"],
    images: [
      {
        src: "/products/big-scoop.jpg",
        alt: "Big Scoop gift box with earrings, strawberry clips, a watermelon claw clip, a mandala tin, a butterfly necklace, a keychain, a bead bracelet, a daisy scrunchie, four gold rings, three charms and sticky notes",
        width: 1145,
        height: 1374,
      },
    ],
    art: { palette: "lavender", shape: "star", seed: 37 },
    details: [
      {
        label: "Inside",
        value:
          "Pearl heart earrings · butterfly charm necklace · set of 4 gold-tone rings · pearl & black bead bracelet · 2 strawberry bow clips · watermelon claw clip · daisy scrunchie · mini bag & sneaker keychain · 3 squishy charms · mandala trinket tin · sticky-note set",
      },
      jewellery,
      packaging,
      care,
    ],
    inStock: true,
    featured: true,
    createdAt: "2026-08-15",
  },
  {
    id: "box-004",
    slug: "grand-scoop",
    name: "Grand Scoop",
    tagline: "the keepsake box, watch included",
    description:
      "Our biggest scoop in a compartment keepsake box you'll want to keep on the dresser. A gold-tone watch, four fruit claw clips, a butterfly necklace, rings, charms, a keychain and all the studio favourites. Little things, bigger happiness.",
    category: "gift-boxes",
    price: 2499,
    tags: ["gift box", "keepsake", "watch", "premium"],
    badges: ["limited"],
    images: [
      {
        src: "/products/grand-scoop.jpg",
        alt: "Grand Scoop compartment gift box with a gold watch, pearl heart earrings, a butterfly necklace, four rings, a bead bracelet, three charms, a keychain, four fruit claw clips, a daisy scrunchie, a mandala tin and sticky notes",
        width: 1145,
        height: 1374,
      },
    ],
    art: { palette: "mint", shape: "sticker", seed: 41 },
    details: [
      {
        label: "Inside",
        value:
          "Gold-tone watch · pearl heart earrings · butterfly charm necklace · set of 4 gold-tone rings · pearl & black bead bracelet · 4 fruit claw clips · daisy scrunchie · mini bag & sneaker keychain · 3 squishy charms · mandala trinket tin · sticky-note set",
      },
      { label: "Box", value: "Rigid compartment keepsake box with a satin ribbon." },
      jewellery,
      packaging,
      care,
    ],
    inStock: true,
    featured: true,
    createdAt: "2026-08-28",
  },
];
