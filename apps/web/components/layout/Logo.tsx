import Link from "next/link";
import { cn } from "@repo/ui/cn";
import { SITE } from "@/lib/config";

export function ScoopMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-9", className)}>
      <path
        d="M14 24h20l-8 18c-.8 1.8-3.2 1.8-4 0z"
        fill="var(--color-butter)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle
        cx="17"
        cy="19"
        r="8"
        fill="var(--color-pink)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />
      <circle
        cx="31"
        cy="19"
        r="8"
        fill="var(--color-lavender)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />
      <circle
        cx="24"
        cy="12"
        r="8"
        fill="var(--color-mint)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
      />
      <circle cx="21" cy="10" r="1.6" fill="#fff" />
      <path
        d="M24 4v3"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} home`}
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <ScoopMark className="transition-transform duration-300 ease-bounce group-hover:-rotate-12" />
      {!compact ? (
        <span className="font-display text-xl font-bold tracking-tight">
          the<span className="text-pink-deep">celviora</span>studio
        </span>
      ) : null}
    </Link>
  );
}
