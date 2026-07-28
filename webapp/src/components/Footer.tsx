import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/data/site";
import { formatInr } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] bg-brand-50/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink">Madan Mohan</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-ink-muted">
            General Store
          </p>
          <p className="mt-4 max-w-xs text-sm text-ink-soft">{site.tagline}</p>
          <p className="mt-4 text-sm text-ink-soft">
            {site.address.line1}
            <br />
            {site.address.line2}, {site.address.city} {site.address.pincode}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Reach us</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className="hover:text-brand-700">
                  {phone.number}
                </a>
              </li>
            ))}
            <li>
              <a href={site.whatsapp.link} className="hover:text-brand-700">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand-700">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-ink">
              {site.hours.label}
              <br />
              <span className="text-ink-soft">{site.hours.days}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/category/${category.slug}`} className="hover:text-brand-700">
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-brand-700">
                Contact & store info
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Delivery areas</h3>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm text-ink-soft">
            {site.delivery.serviceAreas.map((area) => (
              <li key={area} className="rounded-full bg-white px-3 py-1 shadow-soft">
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            Free delivery above {formatInr(site.delivery.freeDeliveryThreshold)} across our service
            areas, and above {formatInr(site.delivery.nearbyFreeDeliveryThreshold)} within{" "}
            {site.delivery.nearbyRadiusKm} km of the shop.
          </p>
        </div>
      </div>

      <div className="border-t border-ink/[0.06]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Payments accepted: {site.paymentMethods.map((method) => method.label).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
