import type { Shape } from "@/lib/commerce/types";

export interface DoodleProps {
  shape: Shape;
  /** Fill colour for the doodle body. */
  fill: string;
  /** Accent colour (gems, highlights). */
  accent: string;
  stroke?: string;
  strokeWidth?: number;
}

const common = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Hand-drawn style product doodles, all centred at (200, 200) in a 400×400 viewBox. */
export function Doodle({
  shape,
  fill,
  accent,
  stroke = "var(--color-ink)",
  strokeWidth = 9,
}: DoodleProps) {
  const p = { stroke, strokeWidth, ...common };

  switch (shape) {
    case "hoop":
      return (
        <g className="art-shape">
          <circle
            cx="200"
            cy="205"
            r="82"
            fill="none"
            {...p}
            strokeWidth={strokeWidth + 14}
          />
          <circle
            cx="200"
            cy="205"
            r="82"
            fill="none"
            stroke={fill}
            strokeWidth={strokeWidth + 2}
          />
          <circle cx="200" cy="112" r="16" fill={accent} {...p} />
          <path
            d="M150 160c10-18 28-30 50-34"
            fill="none"
            stroke="#fff"
            strokeWidth={6}
            {...common}
          />
        </g>
      );
    case "star":
      return (
        <g className="art-shape">
          <path
            d="M200 92l30 62 68 9-49 48 12 68-61-33-61 33 12-68-49-48 68-9z"
            fill={fill}
            {...p}
          />
          <circle cx="200" cy="205" r="14" fill={accent} {...p} strokeWidth={6} />
          <path
            d="M176 140l10-12"
            fill="none"
            stroke="#fff"
            strokeWidth={6}
            {...common}
          />
        </g>
      );
    case "heart":
      return (
        <g className="art-shape">
          <path
            d="M200 300c-60-42-110-84-110-140 0-34 26-60 58-60 22 0 40 12 52 30 12-18 30-30 52-30 32 0 58 26 58 60 0 56-50 98-110 140z"
            fill={fill}
            {...p}
          />
          <path
            d="M132 150c2-20 16-34 34-38"
            fill="none"
            stroke="#fff"
            strokeWidth={7}
            {...common}
          />
          <circle cx="200" cy="200" r="16" fill={accent} {...p} strokeWidth={6} />
        </g>
      );
    case "ring":
      return (
        <g className="art-shape">
          <circle
            cx="200"
            cy="220"
            r="70"
            fill="none"
            {...p}
            strokeWidth={strokeWidth + 16}
          />
          <circle
            cx="200"
            cy="220"
            r="70"
            fill="none"
            stroke={fill}
            strokeWidth={strokeWidth + 4}
          />
          <path d="M170 130l30-40 30 40-30 30z" fill={accent} {...p} />
          <path d="M176 130h48" fill="none" {...p} strokeWidth={6} />
          <path
            d="M148 185c6-16 18-28 34-34"
            fill="none"
            stroke="#fff"
            strokeWidth={6}
            {...common}
          />
        </g>
      );
    case "beads":
      return (
        <g className="art-shape">
          <path d="M96 236c20-60 60-96 104-96s84 36 104 96" fill="none" {...p} />
          {[96, 132, 168, 200, 232, 268, 304].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={
                i === 0 || i === 6 ? 236 : i === 1 || i === 5 ? 178 : i === 3 ? 140 : 150
              }
              r="24"
              fill={i % 2 ? accent : fill}
              {...p}
              strokeWidth={7}
            />
          ))}
        </g>
      );
    case "pearl":
      return (
        <g className="art-shape">
          <circle cx="150" cy="200" r="52" fill={fill} {...p} />
          <circle cx="258" cy="200" r="52" fill={fill} {...p} />
          <circle cx="132" cy="182" r="12" fill="#fff" />
          <circle cx="240" cy="182" r="12" fill="#fff" />
          <circle cx="150" cy="200" r="8" fill={accent} />
          <circle cx="258" cy="200" r="8" fill={accent} />
        </g>
      );
    case "pen":
      return (
        <g className="art-shape" transform="rotate(-40 200 200)">
          <rect x="170" y="70" width="60" height="200" rx="30" fill={fill} {...p} />
          <path d="M170 270h60l-30 56z" fill={accent} {...p} />
          <path d="M200 326v-30" fill="none" {...p} strokeWidth={6} />
          <rect
            x="170"
            y="70"
            width="60"
            height="44"
            rx="22"
            fill={accent}
            {...p}
            strokeWidth={6}
          />
          <path d="M186 130v100" fill="none" stroke="#fff" strokeWidth={7} {...common} />
        </g>
      );
    case "notebook":
      return (
        <g className="art-shape">
          <rect x="118" y="84" width="176" height="232" rx="22" fill={fill} {...p} />
          <path d="M150 84v232" fill="none" {...p} strokeWidth={6} />
          {[120, 160, 200, 240, 280].map((y) => (
            <circle key={y} cx="118" cy={y} r="9" fill={accent} {...p} strokeWidth={5} />
          ))}
          <rect
            x="184"
            y="150"
            width="76"
            height="76"
            rx="14"
            fill={accent}
            {...p}
            strokeWidth={6}
          />
          <path d="M204 176h36M204 200h20" fill="none" {...p} strokeWidth={6} />
        </g>
      );
    case "tape":
      return (
        <g className="art-shape">
          <circle cx="200" cy="200" r="96" fill={fill} {...p} />
          <circle cx="200" cy="200" r="30" fill="#fff" {...p} />
          <path
            d="M296 200c0 22-6 44-18 60l60 40c18-28 28-62 28-100z"
            fill={accent}
            {...p}
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx={200 + 62 * Math.cos((deg * Math.PI) / 180)}
              cy={200 + 62 * Math.sin((deg * Math.PI) / 180)}
              r="8"
              fill="#fff"
            />
          ))}
        </g>
      );
    case "sticker":
      return (
        <g className="art-shape">
          <path
            d="M200 76l26 30 38-10 8 38 36 16-20 34 20 34-36 16-8 38-38-10-26 30-26-30-38 10-8-38-36-16 20-34-20-34 36-16 8-38 38 10z"
            fill={fill}
            {...p}
          />
          <path
            d="M160 236c8 22 24 34 40 34s32-12 40-34"
            fill="none"
            {...p}
            strokeWidth={7}
          />
          <circle cx="176" cy="186" r="9" fill={stroke} />
          <circle cx="224" cy="186" r="9" fill={stroke} />
          <circle cx="152" cy="212" r="10" fill={accent} />
          <circle cx="248" cy="212" r="10" fill={accent} />
        </g>
      );
    case "clip":
      return (
        <g className="art-shape">
          <path
            d="M120 300V150c0-28 22-50 50-50h60c28 0 50 22 50 50v150z"
            fill={fill}
            {...p}
          />
          <path
            d="M160 300V180c0-14 10-24 24-24h32c14 0 24 10 24 24v120"
            fill="#fff"
            {...p}
            strokeWidth={7}
          />
          <path
            d="M186 100v-26c0-14 12-26 28-26s28 12 28 26"
            fill="none"
            {...p}
            strokeWidth={8}
          />
          <path d="M120 300h180" fill="none" {...p} />
          <circle cx="200" cy="130" r="10" fill={accent} />
        </g>
      );
    case "note":
      return (
        <g className="art-shape">
          <rect
            x="130"
            y="130"
            width="160"
            height="160"
            rx="12"
            fill={accent}
            {...p}
            transform="rotate(-8 210 210)"
          />
          <rect x="118" y="112" width="160" height="160" rx="12" fill={fill} {...p} />
          <path
            d="M148 158h100M148 192h72M148 226h88"
            fill="none"
            {...p}
            strokeWidth={7}
          />
          <path d="M238 272l40-40" fill="none" {...p} strokeWidth={6} />
        </g>
      );
    default:
      return null;
  }
}
