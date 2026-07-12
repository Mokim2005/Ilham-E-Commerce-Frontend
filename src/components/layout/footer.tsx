// Footer — site-wide footer with links, contact info, and payment methods. Used in layout.tsx.
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
];

const categoryLinks = [
  { label: "Notebooks", href: "/category/notebooks" },
  { label: "Pens & Pencils", href: "/category/pens" },
  { label: "Paper", href: "/category/paper" },
  { label: "Art Supplies", href: "/category/art-supplies" },
  { label: "Office Supplies", href: "/category/office-supplies" },
  { label: "School Essentials", href: "/category/school-essentials" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight">
                Inkwell
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Premium stationery for thinkers, dreamers, and doers. Crafted with
              care, delivered with love.
            </p>
            <div className="mt-5 flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <Link
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs text-white/50 transition-colors hover:border-teal hover:text-white"
                  aria-label={social}
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-sm text-white/60">
                info@inkwellstationery.com
              </p>
              <p className="mt-1 text-sm text-white/60">+880 1XXX-XXXXXX</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Inkwell Stationery. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
              We accept
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-white/60">
              bKash
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-white/60">
              Nagad
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-white/60">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
