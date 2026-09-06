"use client";

import { LayoutGroup, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/config";
import { useUiStore } from "@/lib/store/ui";
import { press, spring } from "@/lib/transitions";
import { CartButton } from "./CartButton";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

function isActive(href: string, pathname: string, search: string) {
  const [path, query] = href.split("?");
  if (path !== pathname) return false;
  if (!query) return !search || path !== "/shop";
  return query === search;
}

export function Header() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255,248,238,0)", "rgba(255,248,238,0.92)"],
  );
  const border = useTransform(scrollY, [0, 60], ["rgba(43,33,64,0)", "rgba(43,33,64,1)"]);
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const menuOpen = useUiStore((s) => s.menuOpen);
  const toggleMenu = useUiStore((s) => s.toggleMenu);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, borderColor: border }}
        className="sticky top-0 z-50 border-b-2 backdrop-blur-md"
      >
        <Container className="flex h-18 items-center justify-between gap-4">
          <Logo />
          <LayoutGroup id="nav">
            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => {
                const active = isActive(l.href, pathname, search);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors hover:text-pink-deep"
                    aria-current={active ? "page" : undefined}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        transition={spring.snappy}
                        className="absolute inset-0 -z-10 rounded-full bg-butter outline-ink"
                      />
                    ) : null}
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>
          <div className="flex items-center gap-2">
            <CartButton />
            <motion.button
              type="button"
              whileTap={press}
              onClick={() => toggleMenu()}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sticker outline-ink md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.button>
          </div>
        </Container>
      </motion.header>
      <MobileNav />
    </>
  );
}
