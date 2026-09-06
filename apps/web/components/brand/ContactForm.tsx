"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { buttonStyles } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { StickerBadge } from "@/components/art/StickerBadge";
import { useUiStore } from "@/lib/store/ui";
import { pop, press, shake, spring } from "@/lib/transitions";
import { compose, email, required, validateAll } from "@/lib/validation";

interface Values {
  name: string;
  email: string;
  message: string;
}

const schema = {
  name: required("Name"),
  email: compose(required("Email"), email),
  message: required("Message"),
};

export function ContactForm() {
  const pushToast = useUiStore((s) => s.pushToast);
  const [values, setValues] = useState<Values>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState(false);

  const set = (key: keyof Values, value: string) => {
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
    setSent(true);
    pushToast({
      title: "Message sent",
      description: "We'll reply within a day or two.",
      tone: "lavender",
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sticker-lg outline-ink sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            variants={pop}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col items-center gap-3 py-8 text-center"
          >
            <StickerBadge palette="mint" rotate={-4} size="lg">
              sent!
            </StickerBadge>
            <h3 className="font-display text-display-sm font-bold">
              Thanks, {values.name.split(" ")[0]}
            </h3>
            <p className="max-w-sm text-ink-soft">
              This is a demo, so nothing actually left your browser. But the vibe was
              received.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setValues({ name: "", email: "", message: "" });
              }}
              className="text-sm font-semibold underline underline-offset-4"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring.soft}
          >
            <motion.div
              key={attempt}
              animate={attempt > 0 ? shake : undefined}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Field label="Name" htmlFor="contact-name" error={errors.name}>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  invalid={Boolean(errors.name)}
                />
              </Field>
              <Field label="Email" htmlFor="contact-email" error={errors.email}>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  invalid={Boolean(errors.email)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  htmlFor="contact-message"
                  error={errors.message}
                  hint="Order questions, collab ideas, or just say hi."
                >
                  <Textarea
                    id="contact-message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    invalid={Boolean(errors.message)}
                  />
                </Field>
              </div>
            </motion.div>
            <motion.button
              type="submit"
              whileTap={press}
              whileHover={{ y: -2 }}
              className={buttonStyles({
                variant: "lavender",
                size: "lg",
                className: "mt-6",
              })}
            >
              <Send className="size-4" aria-hidden />
              Send message
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
