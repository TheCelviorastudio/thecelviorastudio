"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useCheckoutStore } from "@/lib/store/checkout";
import { useOrdersStore } from "@/lib/store/orders";

/** Rehydrates persisted stores after mount so server and first client render match. */
export function StoreHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useCheckoutStore.persist.rehydrate();
    void useOrdersStore.persist.rehydrate();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "tcs.cart.v1") void useCartStore.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return null;
}
