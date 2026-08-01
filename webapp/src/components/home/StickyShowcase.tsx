"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Product } from "@/data/products";
import { formatInr } from "@/lib/format";

const steps = [
  {
    title: "Chosen at the counter",
    body: "Every pack is picked by hand from the same shelves our neighbours have shopped from for years.",
  },
  {
    title: "Packed with care",
    body: "Fragile items are cushioned, cold items are bagged separately, and your bill is checked twice.",
  },
  {
    title: "At your door, same day",
    body: "Orders placed before 8 PM reach Krishna Nagar and nearby colonies the very same evening.",
  },
];

/**
 * Signature Apple-style pinned section: the product card stays fixed while the
 * accompanying copy scrolls and cross-fades through it.
 */
export function StickyShowcase({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.04, 0.96]);

  return (
    <section ref={ref} className="relative bg-ink text-white">
      <div className="container-page grid gap-12 py-24 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-36 lg:h-[70vh]">
          <div className="flex h-full flex-col justify-center">
            <p className="eyebrow text-accent-400">Featured this week</p>
            <motion.div
              style={reduceMotion ? undefined : { rotate, scale }}
              className="mx-auto mt-6 w-full max-w-sm overflow-hidden rounded-4xl bg-white/5 p-5 shadow-lift ring-1 ring-white/10"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-end justify-between px-1 pt-5">
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-white/60">{product.unit}</p>
                </div>
                <p className="text-lg font-semibold text-accent-400">{formatInr(product.price)}</p>
              </div>
            </motion.div>
            <Link href={`/product/${product.id}`} className="btn-primary mx-auto mt-8">
              View product
            </Link>
          </div>
        </div>

        <div className="space-y-[18vh] lg:py-[14vh]">
          <h2 className="text-headline font-semibold">
            The neighbourhood shop,
            <span className="block text-white/50">now a scroll away.</span>
          </h2>
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-30%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md"
            >
              <p className="text-sm font-semibold text-accent-400">0{index + 1}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/60">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
