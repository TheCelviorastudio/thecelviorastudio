"use client";

import { motion } from "framer-motion";
import { cn } from "@repo/ui/cn";
import { paletteBg } from "@/components/art/palette";
import { team } from "@/data/story";
import { fadeUp, spring, stagger } from "@/lib/transitions";

export function TeamStickers() {
  return (
    <motion.ul
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px 0px" }}
      className="grid gap-5 sm:grid-cols-3"
    >
      {team.map((member, i) => (
        <motion.li
          key={member.name}
          variants={fadeUp}
          whileHover={{ rotate: i % 2 ? 3 : -3, y: -6, scale: 1.03 }}
          transition={spring.bouncy}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl p-6 text-center shadow-sticker-lg outline-ink",
            paletteBg[member.palette],
          )}
          style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
        >
          <span
            className="inline-flex size-20 items-center justify-center rounded-full bg-white text-4xl outline-ink"
            aria-hidden
          >
            {member.emoji}
          </span>
          <p className="font-display text-xl font-bold">{member.name}</p>
          <p className="text-sm text-ink-soft">{member.role}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
