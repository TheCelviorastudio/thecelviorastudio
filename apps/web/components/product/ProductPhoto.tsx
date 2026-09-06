import Image from "next/image";
import { cn } from "@repo/ui/cn";
import { ProductArt } from "@/components/art/ProductArt";
import type { ProductArt as ProductArtSpec } from "@/lib/commerce/types";

export interface ProductPhotoProps {
  /** Photo src under `/public`. Falls back to generated art when missing. */
  src?: string;
  alt: string;
  art: ProductArtSpec;
  /** `sizes` hint for next/image, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Square, cover-cropped product photo. The parent decides the frame (rounded corners,
 * outline, shadow); this only fills it. Server-safe.
 */
export function ProductPhoto({
  src,
  alt,
  art,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
  imgClassName,
}: ProductPhotoProps) {
  if (!src) {
    return (
      <div className={cn("relative aspect-square overflow-hidden bg-white", className)}>
        <ProductArt art={art} title={alt} className="p-3" />
      </div>
    );
  }
  return (
    <div className={cn("relative aspect-square overflow-hidden bg-cream", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
