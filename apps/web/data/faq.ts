export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faq: FaqGroup[] = [
  {
    title: "Orders",
    items: [
      {
        q: "What is a scoop?",
        a: "A scoop is our word for a small, curated drop. We pick a handful of pieces we love, photograph them badly in good light, and release them in limited quantities. When a scoop sells out, it may not come back.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Yes, within 2 hours of placing it. Email us with your order number and we'll sort it before it goes to packing.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Every order ships in our pastel mailer with a little sticker and a handwritten note. Add a gift message at checkout and we'll leave the invoice out.",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery is 5–7 working days across India. Express is 2–3 working days to metro cities. You'll get a tracking link as soon as we hand it to the courier.",
      },
      {
        q: "Is shipping free?",
        a: "Standard shipping is free on orders of ₹999 and above. Below that, it's a flat ₹79. Express is ₹199.",
      },
      {
        q: "Do you ship internationally?",
        a: "Not yet. We're a tiny studio and want to get India right first. Join the list on our contact page and we'll tell you when that changes.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        q: "Is your jewelry hypoallergenic?",
        a: "All earrings use surgical steel or nickel-free posts. Plated pieces are brass or stainless steel under the gold, and we list the base metal on every product page.",
      },
      {
        q: "Will the gold plating fade?",
        a: "With everyday wear, plating lasts about a year. Keep pieces away from water, perfume and sweat, and they'll keep their shine much longer.",
      },
      {
        q: "Is the notebook paper fountain-pen friendly?",
        a: "Yes. Our 100 gsm paper handles fountain pens, gel pens and mellow highlighters with minimal ghosting and no bleed.",
      },
    ],
  },
  {
    title: "Returns",
    items: [
      {
        q: "What is your return policy?",
        a: "Unworn, unused items in original packaging can be returned within 14 days of delivery for store credit or a refund. Earrings are final sale for hygiene reasons.",
      },
      {
        q: "My item arrived damaged. What now?",
        a: "We're sorry. Email a photo within 48 hours of delivery and we'll ship a replacement or refund you, no return needed.",
      },
    ],
  },
];
