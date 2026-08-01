# Madan Mohan General Store — web app

A premium, mobile-first grocery storefront for **Madan Mohan General Store** (Krishna Nagar, Delhi),
built with Next.js App Router, TypeScript, Tailwind CSS and Framer Motion. Product data, business
details and delivery rules are static/mock — there is no backend or payment gateway yet.

_From our shelves to your home._

## Run locally

```bash
cd webapp
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint
node scripts/generate-product-images.mjs   # regenerate the placeholder product artwork
```

## What is in here

| Path | Purpose |
| --- | --- |
| `src/data/site.ts` | Single source of truth for business details, hours, phones, delivery rules, payment methods |
| `src/data/products.ts` | Categories and mock products (name, brand, price, unit, variants, description) |
| `src/lib/delivery.ts` | Free-delivery / delivery-charge logic used by Cart and Checkout |
| `src/context/CartContext.tsx` | Cart state, persisted to `localStorage` |
| `src/context/AuthContext.tsx` + `src/services/auth.ts` | Mock auth (accounts + session in `localStorage`) |
| `src/components/motion/*` | `ScrollReveal`, `StaggerGroup`/`StaggerItem`, `Parallax` animation helpers |
| `src/components/home/*` | Hero and the pinned "sticky showcase" section |
| `public/products/*.svg` | Generated placeholder artwork, one per product |

Routes: `/`, `/category/[slug]`, `/product/[id]`, `/search?q=`, `/cart`, `/checkout`, `/login`,
`/signup`, `/account`, `/contact`.

## Delivery rules

Configured in `src/data/site.ts` under `delivery` and applied in `src/lib/delivery.ts`:

- `freeDeliveryThreshold: 3000` — free delivery above ₹3,000 anywhere in the service areas
  (Krishna Nagar, Ram Nagar, Jagatpuri, AGCR Enclave, Hargobind Enclave, Patparganj and nearby).
- `nearbyFreeDeliveryThreshold: 500` with `nearbyRadiusKm: 1` — free delivery above ₹500 within
  1 km of the shop.
- `deliveryCharge: 49` — flat charge applied when neither free-delivery rule is met.
- `minimumOrderValue: 200` — minimum basket value before checkout is allowed.

The Cart and Checkout let the shopper pick which zone applies and show a progress bar towards the
relevant threshold.

## Placeholders to update before going live

These are assumptions/demo values, not confirmed business rules:

1. **Delivery charge below the thresholds** — `deliveryCharge: 49` in `src/data/site.ts`.
2. **Minimum order value** — `minimumOrderValue: 200` in `src/data/site.ts`.
3. **Product list** — everything in `src/data/products.ts` (names, brands, prices, pack sizes,
   descriptions, stock flags) is realistic mock data and should be replaced with the shop's actual
   catalogue and prices.
4. **Product photography** — `public/products/*.svg` are generated placeholders. Replace each file
   (or point `image` in `products.ts` at real photos) when photography is available.
5. **Brand colours** — the `brand` / `accent` / `ink` palettes in `tailwind.config.ts`.
6. **Map** — the contact page has a map placeholder; drop in a Google Maps embed for
   A-83 Radheypuri, Krishna Nagar, Delhi 110051.
7. **Same-day delivery copy** — the "orders before 8 PM" line in
   `src/components/home/StickyShowcase.tsx` needs to be confirmed.

## Known limitations (by design, for this demo)

- **Auth is mock and client-side.** Accounts and sessions live in `localStorage`; passwords are only
  obfuscated, never hashed. `src/services/auth.ts` isolates every storage call, so swapping in real
  API calls should not require UI changes.
- **Checkout is mock.** Cash on Delivery and UPI are shown as choices, no payment is processed and
  no order is transmitted anywhere. Order confirmation is rendered client-side.
- **No logo.** The brand is set in text in `Header`/`Footer`; a logo image can be added later.
- **No social links** anywhere, as requested.

## Accessibility & motion

All scroll animations go through the helpers in `src/components/motion/`, which respect
`prefers-reduced-motion` (heavy transforms are skipped and `globals.css` neutralises transitions).
