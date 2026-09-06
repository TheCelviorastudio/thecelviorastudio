"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "@/lib/commerce/types";
import { MAX_QTY } from "@/lib/config";
import { useHydrated } from "./hydration";

export interface CartState {
  lines: CartLine[];
  add: (line: CartLine) => void;
  setQty: (productId: string, variant: string | undefined, qty: number) => void;
  remove: (productId: string, variant?: string) => void;
  clear: () => void;
}

const sameLine = (a: CartLine, productId: string, variant?: string) =>
  a.productId === productId && a.variant === variant;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (line) =>
        set((s) => {
          const i = s.lines.findIndex((l) => sameLine(l, line.productId, line.variant));
          if (i === -1)
            return { lines: [...s.lines, { ...line, qty: Math.min(line.qty, MAX_QTY) }] };
          const next = [...s.lines];
          const cur = next[i];
          if (cur) next[i] = { ...cur, qty: Math.min(cur.qty + line.qty, MAX_QTY) };
          return { lines: next };
        }),
      setQty: (productId, variant, qty) =>
        set((s) => {
          if (qty <= 0)
            return { lines: s.lines.filter((l) => !sameLine(l, productId, variant)) };
          return {
            lines: s.lines.map((l) =>
              sameLine(l, productId, variant) ? { ...l, qty: Math.min(qty, MAX_QTY) } : l,
            ),
          };
        }),
      remove: (productId, variant) =>
        set((s) => ({ lines: s.lines.filter((l) => !sameLine(l, productId, variant)) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "tcs.cart.v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export const selectCount = (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0);
export const selectSubtotal = (s: CartState) =>
  s.lines.reduce((n, l) => n + l.qty * l.price, 0);

export const useCartHydrated = () => useHydrated(useCartStore.persist);
