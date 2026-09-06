import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { generateOrderId } from "@/lib/order-id";
import { applyQuery } from "./filters";
import type { CommerceProvider } from "./provider";

/** In-repo catalog. Orders are echoed back with an id; persistence is the caller's job. */
export const localProvider: CommerceProvider = {
  async listProducts(query) {
    return applyQuery(products, query);
  },
  async getProduct(slug) {
    return products.find((p) => p.slug === slug) ?? null;
  },
  async listCategories() {
    return categories;
  },
  async createOrder(input) {
    return { ...input, id: generateOrderId(), createdAt: new Date().toISOString() };
  },
};
