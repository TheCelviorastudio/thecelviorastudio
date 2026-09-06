"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Address } from "@/lib/commerce/types";
import type { ShippingMethod } from "@/lib/config";
import { useHydrated } from "./hydration";

export type CheckoutStep = 0 | 1 | 2 | 3;

export interface PaymentDraft {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
}

export const emptyAddress: Address = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export const emptyPayment: PaymentDraft = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
};

interface CheckoutState {
  step: CheckoutStep;
  direction: 1 | -1;
  address: Address;
  shippingMethod: ShippingMethod;
  payment: PaymentDraft;
  giftNote: string;
  /** True while an order is being placed, so the empty-cart redirect stands down. Not persisted. */
  placing: boolean;
  setPlacing: (placing: boolean) => void;
  setStep: (step: CheckoutStep) => void;
  setAddress: (address: Address) => void;
  setShippingMethod: (m: ShippingMethod) => void;
  setPayment: (p: PaymentDraft) => void;
  setGiftNote: (note: string) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      step: 0,
      direction: 1,
      address: emptyAddress,
      shippingMethod: "standard",
      payment: emptyPayment,
      giftNote: "",
      placing: false,
      setPlacing: (placing) => set({ placing }),
      setStep: (step) => set((s) => ({ step, direction: step >= s.step ? 1 : -1 })),
      setAddress: (address) => set({ address }),
      setShippingMethod: (shippingMethod) => set({ shippingMethod }),
      setPayment: (payment) => set({ payment }),
      setGiftNote: (giftNote) => set({ giftNote }),
      reset: () =>
        set({
          step: 0,
          direction: 1,
          address: emptyAddress,
          shippingMethod: "standard",
          payment: emptyPayment,
          giftNote: "",
          placing: false,
        }),
    }),
    {
      name: "tcs.checkout.v1",
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      // Never persist card details, even fake ones.
      partialize: (s) => ({
        step: s.step,
        address: s.address,
        shippingMethod: s.shippingMethod,
        giftNote: s.giftNote,
      }),
    },
  ),
);

export const useCheckoutHydrated = () => useHydrated(useCheckoutStore.persist);
