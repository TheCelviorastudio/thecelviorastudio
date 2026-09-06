"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { StickerBadge } from "@/components/art/StickerBadge";
import { useCheckoutStore, type PaymentDraft } from "@/lib/store/checkout";
import { shake } from "@/lib/transitions";
import {
  cardCvc,
  cardExpiry,
  cardNumber,
  compose,
  formatCardNumber,
  formatExpiry,
  required,
  validateAll,
} from "@/lib/validation";
import { StepShell } from "../StepShell";

const schema = {
  cardNumber: cardNumber,
  cardName: required("Name on card"),
  expiry: compose(required("Expiry"), cardExpiry),
  cvc: cardCvc,
};

export function PaymentStep() {
  const saved = useCheckoutStore((s) => s.payment);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const setStep = useCheckoutStore((s) => s.setStep);
  const [values, setValues] = useState<PaymentDraft>(saved);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentDraft, string>>>({});
  const [attempt, setAttempt] = useState(0);

  const set = (key: keyof PaymentDraft, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateAll(values, schema);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setAttempt((n) => n + 1);
      return;
    }
    setPayment(values);
    setStep(3);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepShell title="Pretend to pay" onBack={() => setStep(1)}>
        <div className="flex items-start gap-3 rounded-lg bg-mint p-4 outline-ink">
          <StickerBadge palette="white" rotate={-6} size="sm">
            demo
          </StickerBadge>
          <p className="text-sm">
            This is a demo storefront. <strong>No payment is taken</strong> and nothing is
            stored. Use{" "}
            <code className="rounded bg-white px-1 font-mono">4242 4242 4242 4242</code>{" "}
            with any future date.
          </p>
        </div>
        <motion.div
          key={attempt}
          animate={attempt > 0 ? shake : undefined}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <Field label="Card number" htmlFor="pay-number" error={errors.cardNumber}>
              <div className="relative">
                <Input
                  id="pay-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  value={values.cardNumber}
                  onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
                  invalid={Boolean(errors.cardNumber)}
                  className="pr-12"
                />
                <CreditCard
                  className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-mute"
                  aria-hidden
                />
              </div>
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Name on card" htmlFor="pay-name" error={errors.cardName}>
              <Input
                id="pay-name"
                autoComplete="cc-name"
                placeholder="As printed"
                value={values.cardName}
                onChange={(e) => set("cardName", e.target.value)}
                invalid={Boolean(errors.cardName)}
              />
            </Field>
          </div>
          <Field label="Expiry" htmlFor="pay-expiry" error={errors.expiry}>
            <Input
              id="pay-expiry"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={values.expiry}
              onChange={(e) => set("expiry", formatExpiry(e.target.value))}
              invalid={Boolean(errors.expiry)}
            />
          </Field>
          <Field label="CVC" htmlFor="pay-cvc" error={errors.cvc}>
            <Input
              id="pay-cvc"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="123"
              maxLength={4}
              value={values.cvc}
              onChange={(e) => set("cvc", e.target.value.replace(/\D/g, ""))}
              invalid={Boolean(errors.cvc)}
            />
          </Field>
        </motion.div>
      </StepShell>
    </form>
  );
}
