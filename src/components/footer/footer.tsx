import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { BrandWordmark } from "./brand-wordmark";
import {
  quickLinks,
  categoryLinks,
  supportLinks,
  legalLinks,
  socialLinks,
  paymentMethods,
} from "./footer.data";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <ul>
      <li className="pb-2 text-2xl font-semibold text-background">{title}</li>
      {links.map((link) => (
        <li
          key={link.href}
          className="text-xl font-medium text-background/70"
        >
          <Link
            href={link.href}
            className="transition-colors hover:text-background"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="relative h-full bg-foreground text-background pt-8 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Top: headline + newsletter | link columns */}
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <h2 className="text-2xl font-serif font-semibold md:text-4xl">
              Stationery made for thinkers, dreamers, and doers
            </h2>
            <NewsletterForm />
          </div>

          <div className="flex gap-10">
            <LinkColumn title="Shop" links={quickLinks} />
            <LinkColumn title="Categories" links={categoryLinks} />
            <LinkColumn title="Support" links={supportLinks} />

            <ul>
              <li className="pb-2 text-2xl font-semibold text-background">
                Social
              </li>
              {socialLinks.map((link) => (
                <li key={link.label} className="text-xl font-medium">
                  <a
                    href={link.href}
                    className="underline text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 text-xl font-medium text-background/70">
                <a
                  href="mailto:info@ilhamstationery.com"
                  className="transition-colors hover:text-background"
                >
                  info@ilhamstationery.com
                </a>
              </li>
              <li className="text-xl font-medium text-background/70">
                +880 1XXX-XXXXXX
              </li>
            </ul>
          </div>
        </div>

        {/* Middle: animated brand wordmark */}
        <BrandWordmark />

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
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-background/60"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
