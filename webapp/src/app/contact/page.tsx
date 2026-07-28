import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/data/site";
import { formatInr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact & store info",
  description: `Visit ${site.name} at ${site.address.full}. Open ${site.hours.label}, ${site.hours.days}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-ink/[0.06] bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-16 sm:py-24">
          <ScrollReveal>
            <p className="eyebrow">Visit us</p>
            <h1 className="mt-3 max-w-2xl text-headline font-semibold text-ink">
              We are on the corner in Radheypuri — and on the phone all day.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">{site.tagline}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <ScrollReveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Address</h2>
            <p className="mt-3 text-xl text-ink">
              {site.address.line1}
              <br />
              {site.address.line2}, {site.address.city} {site.address.pincode}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Phone</h2>
            <ul className="mt-3 space-y-1 text-xl">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="text-ink hover:text-brand-700">
                    {phone.number}
                  </a>
                  <span className="ml-2 text-sm text-ink-muted">{phone.label}</span>
                </li>
              ))}
            </ul>
            <a href={site.whatsapp.link} className="btn-secondary mt-4">
              Message us on WhatsApp
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Email</h2>
            <p className="mt-3 text-xl">
              <a href={`mailto:${site.email}`} className="text-ink hover:text-brand-700">
                {site.email}
              </a>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Hours</h2>
            <p className="mt-3 text-xl text-ink">{site.hours.label}</p>
            <p className="text-ink-soft">{site.hours.days}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">
              Delivery areas
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {site.delivery.serviceAreas.map((area) => (
                <li key={area} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm text-brand-800">
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-md text-sm text-ink-soft">
              Free delivery on orders above {formatInr(site.delivery.freeDeliveryThreshold)} in these
              areas, and above {formatInr(site.delivery.nearbyFreeDeliveryThreshold)} within{" "}
              {site.delivery.nearbyRadiusKm} km of the shop. Orders below the free-delivery threshold
              carry a {formatInr(site.delivery.deliveryCharge)} charge.
            </p>
          </ScrollReveal>
        </div>

        <Parallax distance={50}>
          <div className="flex aspect-square w-full flex-col items-center justify-center rounded-4xl border border-dashed border-ink/15 bg-brand-50/50 p-10 text-center">
            <p className="text-5xl">🗺️</p>
            <p className="mt-6 text-lg font-semibold text-ink">Map placeholder</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              Drop a Google Maps embed for {site.address.full} here — replace this block in
              src/app/contact/page.tsx.
            </p>
          </div>
        </Parallax>
      </section>
    </>
  );
}
