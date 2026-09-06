"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import type { Address } from "@/lib/commerce/types";
import { useCheckoutStore } from "@/lib/store/checkout";
import { shake } from "@/lib/transitions";
import {
  compose,
  email,
  phoneIN,
  pincodeIN,
  required,
  validateAll,
} from "@/lib/validation";
import { StepShell } from "../StepShell";

const schema = {
  name: required("Name"),
  email: compose(required("Email"), email),
  phone: compose(required("Phone"), phoneIN),
  line1: required("Address"),
  city: required("City"),
  state: required("State"),
  pincode: compose(required("Pincode"), pincodeIN),
};

export function InfoStep() {
  const saved = useCheckoutStore((s) => s.address);
  const setAddress = useCheckoutStore((s) => s.setAddress);
  const setStep = useCheckoutStore((s) => s.setStep);
  const [values, setValues] = useState<Address>(saved);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [attempt, setAttempt] = useState(0);

  const update = (key: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
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
    setAddress(values);
    setStep(1);
  };

  const field = (
    key: keyof Address,
    label: string,
    props: React.ComponentProps<typeof Input> = {},
  ) => (
    <Field label={label} htmlFor={`info-${key}`} error={errors[key]}>
      <Input
        id={`info-${key}`}
        name={key}
        value={values[key]}
        onChange={update(key)}
        invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `info-${key}-error` : undefined}
        {...props}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepShell
        title="Where should we send it?"
        description="We'll email your tracking link and text you on dispatch."
      >
        <motion.div
          key={attempt}
          animate={attempt > 0 ? shake : undefined}
          className="grid gap-4 sm:grid-cols-2"
        >
          {field("name", "Full name", {
            autoComplete: "name",
            placeholder: "Priya Sharma",
          })}
          {field("email", "Email", {
            type: "email",
            autoComplete: "email",
            placeholder: "you@example.com",
          })}
          {field("phone", "Mobile", {
            type: "tel",
            autoComplete: "tel",
            inputMode: "numeric",
            placeholder: "98765 43210",
          })}
          {field("pincode", "Pincode", {
            inputMode: "numeric",
            autoComplete: "postal-code",
            placeholder: "560001",
          })}
          <div className="sm:col-span-2">
            {field("line1", "Address", {
              autoComplete: "address-line1",
              placeholder: "Flat, building, street",
            })}
          </div>
          <div className="sm:col-span-2">
            {field("line2", "Landmark (optional)", {
              autoComplete: "address-line2",
              placeholder: "Near the good chai place",
            })}
          </div>
          {field("city", "City", {
            autoComplete: "address-level2",
            placeholder: "Bengaluru",
          })}
          {field("state", "State", {
            autoComplete: "address-level1",
            placeholder: "Karnataka",
          })}
        </motion.div>
      </StepShell>
    </form>
  );
}
