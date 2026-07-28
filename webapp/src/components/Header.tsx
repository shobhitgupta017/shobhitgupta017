"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { formatInr } from "@/lib/format";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, isLoggedIn, logOut } = useAuth();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink text-white">
        <div className="container-page flex flex-col items-center justify-between gap-1 py-2 text-center text-[12px] sm:flex-row sm:text-left sm:text-[13px]">
          <p>
            Free delivery above{" "}
            <span className="font-semibold text-accent-400">
              {formatInr(site.delivery.freeDeliveryThreshold)}
            </span>{" "}
            in our service areas · above{" "}
            <span className="font-semibold text-accent-400">
              {formatInr(site.delivery.nearbyFreeDeliveryThreshold)}
            </span>{" "}
            within {site.delivery.nearbyRadiusKm} km of the store
          </p>
          <p className="text-white/70">
            Open {site.hours.label} · {site.hours.days}
          </p>
        </div>
      </div>

      <div
        className={`border-b border-ink/[0.06] bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <div className="container-page flex items-center gap-4 py-3.5">
          <Link href="/" className="group shrink-0">
            <span className="block text-[15px] font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-brand-700 sm:text-lg">
              Madan Mohan
              <span className="block text-[10px] font-medium uppercase tracking-[0.32em] text-ink-muted sm:text-[11px]">
                General Store
              </span>
            </span>
          </Link>

          <form onSubmit={onSearch} className="hidden flex-1 md:block">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for atta, milk, snacks…"
                aria-label="Search products"
                className="field h-11 rounded-full py-0 pl-11"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
                ⌕
              </span>
            </div>
          </form>

          <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 lg:inline-flex">
            📍 {site.address.line2}, Delhi {site.address.pincode}
          </span>

          {isLoggedIn ? (
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Link href="/account" className="text-sm font-medium text-ink hover:text-brand-700">
                Hi, {user?.name.split(" ")[0]}
              </Link>
              <button onClick={logOut} className="text-sm font-medium text-ink-muted hover:text-ink">
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden shrink-0 text-sm font-medium text-ink hover:text-brand-700 sm:block"
            >
              Login / Sign up
            </Link>
          )}

          <Link
            href="/cart"
            className="relative shrink-0 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Cart
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-ink"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="shrink-0 rounded-full border border-ink/10 px-3 py-2 text-sm md:hidden"
          >
            ☰
          </button>
        </div>

        <nav className="container-page hidden gap-6 overflow-x-auto pb-3 text-sm text-ink-soft md:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap transition-colors hover:text-brand-700"
            >
              {category.name}
            </Link>
          ))}
          <Link href="/contact" className="whitespace-nowrap transition-colors hover:text-brand-700">
            Contact
          </Link>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-ink/[0.06] bg-white md:hidden"
          >
            <div className="container-page space-y-4 py-4">
              <form onSubmit={onSearch}>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="field h-11 rounded-full py-0"
                />
              </form>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="rounded-2xl bg-brand-50/60 px-3 py-2 text-ink"
                  >
                    {category.emoji} {category.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-ink/[0.06] pt-3 text-sm">
                <Link href="/contact" className="text-ink-soft">
                  Contact
                </Link>
                {isLoggedIn ? (
                  <button onClick={logOut} className="font-medium text-ink">
                    Logout ({user?.name.split(" ")[0]})
                  </button>
                ) : (
                  <Link href="/login" className="font-medium text-ink">
                    Login / Sign up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
