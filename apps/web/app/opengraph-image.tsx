import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const blobs = [
  { color: "#ffbdd3", x: 60, y: 90, s: 260, r: -14 },
  { color: "#cdbcff", x: 900, y: 40, s: 300, r: 22 },
  { color: "#ffe68f", x: 820, y: 360, s: 240, r: -8 },
  { color: "#c3ecdc", x: 180, y: 400, s: 200, r: 30 },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff8ee",
        position: "relative",
        fontFamily: "sans-serif",
        color: "#2b2140",
      }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            background: b.color,
            border: "6px solid #2b2140",
            borderRadius: "40% 60% 60% 40% / 55% 45% 55% 45%",
            transform: `rotate(${b.r}deg)`,
          }}
        />
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "48px 72px",
          background: "#ffffff",
          border: "6px solid #2b2140",
          borderRadius: 48,
          boxShadow: "0 12px 0 0 #2b2140",
        }}
      >
        <div
          style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -2 }}
        >
          <span>the</span>
          <span style={{ color: "#ff8fb6" }}>celviora</span>
          <span>studio</span>
        </div>
        <div style={{ fontSize: 34, color: "#5b5170" }}>{SITE.tagline}</div>
      </div>
    </div>,
    size,
  );
}
