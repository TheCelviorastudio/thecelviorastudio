# thecelviorastudio

Storefront for **thecelviorastudio**, a fashion accessories brand selling curated scoops of aesthetic jewelry and stationery. Playful-pastel design, GSAP scroll choreography, Framer Motion micro-interactions, and a mock checkout that needs no backend.

## Workspace

pnpm + Turborepo monorepo.

| Path                         | What it is                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `apps/web`                   | Next.js 16 App Router storefront (Tailwind v4, GSAP, Framer Motion, zustand)                            |
| `packages/ui`                | Shared, motion-free UI primitives (`Button`, `Input`, `Field`, `Badge`, `Card`, …) styled with Tailwind |
| `packages/eslint-config`     | Shared flat ESLint config (typescript-eslint, react-hooks, next)                                        |
| `packages/typescript-config` | Shared `tsconfig` bases                                                                                 |

## Commands

```sh
pnpm install
pnpm dev            # http://localhost:3000
pnpm build
pnpm lint           # every warning fails (eslint --max-warnings 0)
pnpm check-types
pnpm format         # prettier + tailwind class sorting
pnpm format:check
```

## How the storefront is put together

- **Catalog and orders** go through the `CommerceProvider` interface in `apps/web/lib/commerce/provider.ts`. The default implementation reads `apps/web/data/products.ts`. Point `apps/web/lib/commerce/index.ts` at a Shopify/Stripe-backed provider to go live without touching pages.
- **Product imagery** is generated inline SVG (`apps/web/components/art/ProductArt.tsx`) driven by each product's `art` descriptor. Add an `images` field when real photography exists.
- **Cart** is a persisted zustand store (`apps/web/lib/store/cart.ts`) with a hydration guard so server and client markup match. Checkout drafts and demo orders live in `sessionStorage`.
- **Motion** is split by responsibility. GSAP (`apps/web/lib/gsap.ts`) owns scroll choreography, SplitText reveals, marquees and the product gallery. Framer Motion (`apps/web/lib/transitions.ts`) owns presence, layout and gesture animation: drawer, toasts, filter pills, accordions, page enter. Both respect `prefers-reduced-motion`.
- **Design tokens** are Tailwind v4 `@theme` variables in `apps/web/app/globals.css`.

## Notes

- No payment is taken. The checkout is a demo flow that ends on `/order/[id]`.
- `typescript-eslint` does not yet support TypeScript 7, so `packages/eslint-config` pins TypeScript 6 for linting only. The app itself compiles with TypeScript 7.
- Agent skills for GSAP and Framer Motion are installed in `.claude/skills/`.
