import type { SVGProps } from "react";

export const BLOB_PATHS = [
  "M200 34c52-6 118 20 140 70s2 118-38 154-118 48-168 24S8 190 30 130 148 40 200 34z",
  "M212 28c60 2 118 44 132 100s-10 128-64 158-134 22-176-18S40 148 62 96 152 26 212 28z",
  "M180 40c66-16 140 22 160 84s-8 128-66 160-140 26-176-24S40 138 72 92 114 56 180 40z",
] as const;

export interface BlobProps extends SVGProps<SVGPathElement> {
  variant?: 0 | 1 | 2;
}

/** A soft blob path inside a 400×400 viewBox. */
export function Blob({ variant = 0, ...rest }: BlobProps) {
  return <path d={BLOB_PATHS[variant]} {...rest} />;
}
