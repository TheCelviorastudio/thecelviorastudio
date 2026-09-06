import { Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, SITE } from "@/lib/config";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-butter dots-bg">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-sm text-sm text-ink-soft">
            {SITE.tagline}. Small batches, gentle paper, skin-friendly sparkle.
          </p>
          <div className="flex gap-2">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sticker outline-ink transition-colors hover:bg-pink"
            >
              <InstagramIcon />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email us"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sticker outline-ink transition-colors hover:bg-lavender"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
        <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
        <FooterColumn title="Studio" links={FOOTER_LINKS.studio} />
      </Container>
      <div className="border-t-2 border-ink bg-cream">
        <Container className="flex flex-col gap-2 py-4 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Made with too many stickers.
          </p>
          <p>Demo storefront. No real orders are placed.</p>
        </Container>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly {
    href:
      | "/shop"
      | "/shop?sort=newest"
      | "/about"
      | "/contact"
      | "/faq"
      | "/shipping-returns";
    label: string;
  }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold tracking-wide uppercase">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm font-medium underline-offset-4 transition-colors hover:text-pink-deep hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
