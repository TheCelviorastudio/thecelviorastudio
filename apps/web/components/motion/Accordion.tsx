"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@repo/ui/cn";
import { accordion, spring } from "@/lib/transitions";

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  tone?: "white" | "cream";
}

/** Single-open accordion with height:auto animation and a rotating chevron. */
export function Accordion({
  items,
  defaultOpen = null,
  className,
  tone = "white",
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-lg outline-ink transition-shadow",
              tone === "white" ? "bg-white" : "bg-cream-deep",
              open ? "shadow-sticker-lg" : "shadow-sticker",
            )}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${item.id}-panel`}
              id={`${item.id}-trigger`}
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold sm:text-lg"
            >
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={spring.snappy}
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-full outline-ink",
                  open ? "bg-butter" : "bg-cream",
                )}
              >
                <ChevronDown className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="panel"
                  id={`${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${item.id}-trigger`}
                  variants={accordion}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
