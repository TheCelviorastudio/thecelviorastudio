"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectSubtotal, useCartHydrated, useCartStore } from "@/lib/store/cart";
import { useCheckoutHydrated, useCheckoutStore } from "@/lib/store/checkout";
import { stepSlide } from "@/lib/transitions";
import { CheckoutStepper } from "./CheckoutStepper";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { InfoStep } from "./steps/InfoStep";
import { PaymentStep } from "./steps/PaymentStep";
import { ReviewStep } from "./steps/ReviewStep";
import { ShippingStep } from "./steps/ShippingStep";

export function CheckoutFlow() {
  const router = useRouter();
  const cartHydrated = useCartHydrated();
  const checkoutHydrated = useCheckoutHydrated();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore(selectSubtotal);
  const step = useCheckoutStore((s) => s.step);
  const direction = useCheckoutStore((s) => s.direction);
  const setStep = useCheckoutStore((s) => s.setStep);
  const shippingMethod = useCheckoutStore((s) => s.shippingMethod);
  const placing = useCheckoutStore((s) => s.placing);

  const ready = cartHydrated && checkoutHydrated;
  const empty = ready && lines.length === 0 && !placing;

  useEffect(() => {
    if (empty) router.replace("/shop");
  }, [empty, router]);

  if (!ready || empty) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
      <div className="flex flex-col gap-6">
        <CheckoutStepper step={step} onStep={setStep} />
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepSlide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 0 ? <InfoStep /> : null}
              {step === 1 ? <ShippingStep subtotal={subtotal} /> : null}
              {step === 2 ? <PaymentStep /> : null}
              {step === 3 ? <ReviewStep lines={lines} subtotal={subtotal} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <OrderSummaryCard
        lines={lines}
        subtotal={subtotal}
        shippingMethod={shippingMethod}
      />
    </div>
  );
}
