export interface PolicySection {
  id: string;
  title: string;
  palette: "lavender" | "butter" | "pink" | "mint" | "sky";
  paragraphs: string[];
  bullets?: string[];
}

export const policies: PolicySection[] = [
  {
    id: "shipping",
    title: "Shipping",
    palette: "butter",
    paragraphs: [
      "We pack orders Monday to Saturday from our studio in Bengaluru. Most orders leave within 1–2 working days, and you'll get a tracking link by email and SMS the moment they do.",
    ],
    bullets: [
      "Standard: 5–7 working days, ₹79 (free over ₹999)",
      "Express: 2–3 working days to metros, ₹199",
      "Currently shipping within India only",
    ],
  },
  {
    id: "returns",
    title: "Returns",
    palette: "pink",
    paragraphs: [
      "Changed your mind? Unworn, unused items in their original packaging can be returned within 14 days of delivery. Earrings and opened sticker packs are final sale.",
      "Email us your order number and we'll send a prepaid return label. Refunds are issued to the original payment method within 5 working days of the item reaching us.",
    ],
  },
  {
    id: "exchanges",
    title: "Exchanges",
    palette: "lavender",
    paragraphs: [
      "Want a different size or colour? Tell us within 14 days and we'll swap it if we have stock. If not, we'll refund you or hold store credit for the next scoop.",
    ],
  },
  {
    id: "damaged",
    title: "Damaged or missing",
    palette: "mint",
    paragraphs: [
      "If something arrives broken or is missing from your parcel, send a photo within 48 hours and we'll fix it with a replacement or refund. No need to send anything back.",
    ],
  },
];
