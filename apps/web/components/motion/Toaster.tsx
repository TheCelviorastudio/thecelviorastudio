"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@repo/ui/cn";
import { useUiStore, type Toast } from "@/lib/store/ui";
import { toast as toastVariants } from "@/lib/transitions";

const tones = {
  butter: "bg-butter",
  pink: "bg-pink",
  lavender: "bg-lavender",
  mint: "bg-mint",
} as const;

function ToastCard({ toast }: { toast: Toast }) {
  const dismiss = useUiStore((s) => s.dismissToast);
  useEffect(() => {
    const t = setTimeout(() => dismiss(toast.id), 3400);
    return () => clearTimeout(t);
  }, [toast.id, dismiss]);

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      role="status"
      className={cn(
        "pointer-events-auto flex w-[min(92vw,22rem)] items-start gap-3 rounded-lg border-2 border-ink px-4 py-3 shadow-sticker-lg",
        tones[toast.tone],
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold">{toast.title}</p>
        {toast.description ? (
          <p className="mt-0.5 text-sm text-ink-soft">{toast.description}</p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => dismiss(toast.id)}
        className="rounded-full p-1 transition-colors hover:bg-ink/10"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useUiStore((s) => s.toasts);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 sm:bottom-6">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
