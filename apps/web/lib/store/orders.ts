"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Order } from "@/lib/commerce/types";
import { useHydrated } from "./hydration";

interface OrdersState {
  byId: Record<string, Order>;
  add: (order: Order) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      byId: {},
      add: (order) => set((s) => ({ byId: { ...s.byId, [order.id]: order } })),
    }),
    {
      name: "tcs.orders.v1",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);

export const useOrdersHydrated = () => useHydrated(useOrdersStore.persist);
