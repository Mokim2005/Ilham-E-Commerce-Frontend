// Footer — Ilham Stationery content, NextCodez-style layout.
"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const socialLinks = [
  { label: "Facebook", href: "#facebook" },
  { label: "Instagram", href: "#instagram" },
  { label: "Twitter", href: "#twitter" },
];

// Brand wordmark letters, animated in on scroll (replaces NextCodez's custom SVG paths,
// since we don't have a traced logo path for "Ilham")
const brandLetters = "ILHAM".split("");

const letterVariants = {
  hidden: { y: 200 },
  visible: (i: number) => ({
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      duration: 0.4,
      delay: i * 0.05,
    },
  }),
};

export function Footer() {
  const wordmarkRef = useRef(null);
  const isInView = useInView(wordmarkRef, { once: true });

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative h-full bg-foreground text-background pt-8 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <LazyMotion features={domAnimation}>
          {/* Top: headline + newsletter  |  link columns */}
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <h2 className="text-2xl font-serif font-semibold md:text-4xl">
                Stationery made for thinkers, dreamers, and doers
              </h2>
              <div className="pb-6 pt-2 md:w-[26rem]">
                <p className="py-4 text-xl md:text-2xl">Subscribe for updates*</p>
                <div className="hover-button relative flex items-center justify-between overflow-hidden rounded-full border-2 border-white/15 bg-white/10 text-background md:text-2xl">
                  <form
                    onSubmit={handleSubscribe}
                    className="relative z-[2] grid w-full grid-cols-6"
                  >
                    <input
                      type="email"
                      name="newsletter_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-5 border-none bg-transparent px-6 py-3 text-background placeholder:text-background/40 focus:outline-none"
                      placeholder="Your Email *"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      className="cols-span-1 h-full w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="mx-auto h-[45%] w-full" />
                    </button>
                  </form>
                </div>
                {subscribed && (
                  <p className="mt-2 text-xs text-emerald-400">
                    Thanks for subscribing!
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-10">
              <ul>
                <li className="pb-2 text-2xl font-semibold text-background">
                  Shop
                </li>
                {quickLinks.map((link) => (
                  <li key={link.href} className="text-xl font-medium text-background/70">
                    <Link href={link.href} className="transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul>
                <li className="pb-2 text-2xl font-semibold text-background">
                  Categories
                </li>
                {categoryLinks.map((link) => (
                  <li key={link.href} className="text-xl font-medium text-background/70">
                    <Link href={link.href} className="transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul>
                <li className="pb-2 text-2xl font-semibold text-background">
                  Support
                </li>
                {supportLinks.map((link) => (
                  <li key={link.href} className="text-xl font-medium text-background/70">
                    <Link href={link.href} className="transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="text-xl font-medium text-background/70">
                  <a href="mailto:info@ilhamstationery.com" className="transition-colors hover:text-background">
                    info@ilhamstationery.com
                  </a>
                </li>
                <li className="text-xl font-medium text-background/70">+880 1XXX-XXXXXX</li>
              </ul>

              <ul>
                <li className="pb-2 text-2xl font-semibold text-background">
                  Social
                </li>
                {socialLinks.map((link) => (
                  <li key={link.href} className="text-xl font-medium">
                    <a
                      href={link.href}
                      className="underline text-background/70 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle: animated brand wordmark, scroll-triggered reveal */}
          <div className="border-y border-white/10 py-6 md:py-10" ref={wordmarkRef}>
            <m.div
              className="flex justify-center overflow-hidden"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {brandLetters.map((letter, i) => (
                <m.span
                  key={`${letter}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  className="font-serif text-[16vw] font-bold leading-none tracking-tight text-primary sm:text-[10rem] md:text-[12rem]"
                >
                  {letter}
                </m.span>
              ))}
            </m.div>
          </div>

          {/* Bottom: copyright, legal links, payment badges */}
          <div className="flex flex-col-reverse items-center justify-between gap-4 py-4 sm:flex-row">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-background/40">
              <span>&copy; {new Date().getFullYear()} Ilham Stationery. All Rights Reserved.</span>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-semibold transition-colors hover:text-background/70"
                >
                  {link.label}
                </Link>
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
        </LazyMotion>
      </div>
    </footer>
  );
}