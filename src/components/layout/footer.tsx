// Footer — site-wide footer with newsletter, links, contact, payment, and legal row.
"use client";

import { useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { BookOpen, Mail, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <LazyMotion features={domAnimation}>
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-12"
          >
            {/* Brand + Newsletter column */}
            <m.div variants={fadeUp} className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <span className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Ilham
                </span>
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/60">
                Premium stationery for thinkers, dreamers, and doers. Crafted with
                care, delivered with love.
              </p>

              {/* Newsletter inline */}
              <div className="mt-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-background/40">
                  Subscribe for updates
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-background/30" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 rounded-full border-white/15 bg-white/10 pl-9 pr-4 text-sm text-background placeholder:text-background/30 focus-visible:ring-primary"
                      aria-label="Email address"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
                {subscribed && (
                  <p className="mt-2 text-xs text-emerald-400">
                    Thanks for subscribing!
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-3">
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <m.div key={social} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`#${social.toLowerCase()}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs text-background/50 transition-colors hover:border-primary hover:text-background"
                      aria-label={social}
                    >
                      {social[0]}
                    </Link>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Quick Links */}
            <m.div variants={fadeUp} className="lg:col-span-2">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-background/40">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Categories */}
            <m.div variants={fadeUp} className="lg:col-span-3">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-background/40">
                Categories
              </h3>
              <ul className="mt-4 space-y-2.5">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Support + Contact */}
            <m.div variants={fadeUp} className="lg:col-span-3">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-background/40">
                Support
              </h3>
              <ul className="mt-4 space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <p className="text-sm text-background/60">
                  info@ilhamstationery.com
                </p>
                <p className="mt-1 text-sm text-background/60">+880 1XXX-XXXXXX</p>
              </div>
            </m.div>
          </m.div>
        </LazyMotion>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar with legal links + payment */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-background/40">
            <span>&copy; {new Date().getFullYear()} Ilham Stationery.</span>
            {legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4">
                {i === 0 && <span className="hidden sm:inline">&middot;</span>}
                <Link href={link.href} className="transition-colors hover:text-background/70">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-background/30">
              We accept
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-background/60">
              bKash
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-background/60">
              Nagad
            </span>
            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-background/60">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
