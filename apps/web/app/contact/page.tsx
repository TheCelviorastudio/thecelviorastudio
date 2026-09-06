import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/brand/ContactForm";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Say hi to thecelviorastudio.",
};

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-10 sm:py-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <Reveal className="flex flex-col gap-8">
        <RevealItem>
          <SectionHeading
            as="h1"
            eyebrow="say hi"
            eyebrowPalette="lavender"
            title="We read everything"
            description="Questions about an order, a collab idea, or a picture of your desk setup. All welcome."
          />
        </RevealItem>
        <RevealItem as="div" className="flex flex-col gap-4">
          <Info icon={Mail} title="Email">
            <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
              {SITE.email}
            </a>
          </Info>
          <Info icon={Clock} title="Hours">
            Mon–Sat, 10am–6pm IST. We reply within two working days.
          </Info>
          <Info icon={MapPin} title="Studio">
            Bengaluru, India. Online only, no walk-ins (the cat insists).
          </Info>
        </RevealItem>
      </Reveal>
      <ContactForm />
    </Container>
  );
}

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-butter shadow-sticker outline-ink">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="font-display font-bold">{title}</p>
        <p className="text-sm text-ink-soft">{children}</p>
      </div>
    </div>
  );
}
