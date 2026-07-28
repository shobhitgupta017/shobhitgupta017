"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";
import { formatInr } from "@/lib/format";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const glyphY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      <motion.div
        style={reduceMotion ? undefined : { scale }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,#dcfce9_0%,#ffffff_60%)]"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: glyphY }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 flex justify-center gap-10 text-[120px] opacity-15 blur-[1px] sm:text-[180px]"
      >
        <span>🥬</span>
        <span className="hidden sm:inline">🍎</span>
        <span>🥛</span>
        <span className="hidden sm:inline">🌾</span>
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="container-page relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow"
        >
          Krishna Nagar · Delhi 110051
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="mt-5 max-w-4xl text-display font-semibold text-ink"
        >
          Madan Mohan
          <span className="block bg-gradient-to-r from-brand-700 via-brand-600 to-accent-500 bg-clip-text text-transparent">
            General Store
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease }}
          className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl"
        >
          {site.tagline} Everyday groceries, staples and household essentials — delivered across
          Krishna Nagar and nearby colonies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link href="/category/fruits-vegetables" className="btn-primary">
            Start shopping
          </Link>
          <a href={site.whatsapp.link} className="btn-secondary">
            Order on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 text-sm sm:grid-cols-3"
        >
          {[
            {
              title: `Free delivery above ${formatInr(site.delivery.freeDeliveryThreshold)}`,
              detail: "Across all our service areas",
            },
            {
              title: `Free above ${formatInr(site.delivery.nearbyFreeDeliveryThreshold)} nearby`,
              detail: `Within ${site.delivery.nearbyRadiusKm} km of the shop`,
            },
            { title: site.hours.label, detail: site.hours.days },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/70 px-4 py-3 shadow-soft backdrop-blur">
              <p className="font-semibold text-ink">{item.title}</p>
              <p className="text-ink-muted">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
