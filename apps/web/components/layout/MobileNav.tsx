"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FOOTER_LINKS, NAV_LINKS, SITE } from "@/lib/config";
import { useUiStore } from "@/lib/store/ui";
import { fadeUp, overlayMenu } from "@/lib/transitions";

export function MobileNav() {
  const open = useUiStore((s) => s.menuOpen);
  const toggleMenu = useUiStore((s) => s.toggleMenu);
  const pathname = usePathname();

  useEffect(() => {
    toggleMenu(false);
  }, [pathname, toggleMenu]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleMenu(false);
    };
    document.documentElement.classList.add("cart-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("cart-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, toggleMenu]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          variants={overlayMenu}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-40 flex flex-col bg-lavender dots-bg px-6 pt-24 pb-10 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <motion.div key={l.href} variants={fadeUp}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 font-display text-display-sm font-bold hover:bg-white/50"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div variants={fadeUp} className="mt-auto flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {FOOTER_LINKS.studio.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <a href={`mailto:${SITE.email}`} className="text-sm text-ink-soft">
              {SITE.email}
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
