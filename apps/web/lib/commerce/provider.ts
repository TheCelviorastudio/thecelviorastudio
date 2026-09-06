import type { Category, Order, OrderInput, Product, ProductQuery } from "./types";

/**
 * The storefront talks to commerce only through this interface.
 * Swap `lib/commerce/index.ts` to point at a Shopify/Medusa/Stripe-backed
 * implementation without touching pages or components.
 */
export interface CommerceProvider {
  listProducts(query?: ProductQuery): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  listCategories(): Promise<Category[]>;
  createOrder(input: OrderInput): Promise<Order>;
}
