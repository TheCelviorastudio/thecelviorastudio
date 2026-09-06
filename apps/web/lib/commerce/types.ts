import type { ShippingMethod } from "@/lib/config";

export type CategorySlug = "jewelry" | "stationery";

export type Palette = "lavender" | "butter" | "pink" | "mint" | "sky";

export type Shape =
  | "hoop"
  | "star"
  | "heart"
  | "ring"
  | "beads"
  | "pearl"
  | "pen"
  | "notebook"
  | "tape"
  | "sticker"
  | "clip"
  | "note";

export interface ProductArt {
  palette: Palette;
  shape: Shape;
  seed: number;
}

export type ProductBadge = "new" | "bestseller" | "limited" | "sale";

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CategorySlug;
  /** Whole rupees. */
  price: number;
  compareAtPrice?: number;
  tags: string[];
  badges?: ProductBadge[];
  art: ProductArt;
  variant?: ProductVariant;
  details: ProductDetail[];
  inStock: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  palette: Palette;
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export interface ProductQuery {
  category?: CategorySlug;
  sort?: SortKey;
  limit?: number;
  excludeSlug?: string;
  featuredOnly?: boolean;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  art: ProductArt;
  variant?: string;
}

export interface Address {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  createdAt: string;
  lines: CartLine[];
  address: Address;
  shippingMethod: ShippingMethod;
  totals: OrderTotals;
  paymentLast4: string;
}

export type OrderInput = Omit<Order, "id" | "createdAt">;
