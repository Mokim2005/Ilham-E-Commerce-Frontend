// Contact Info — static address, phone, email, hours. Server component.
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "42/2 Dhanmondi Road No. 27,\nDhaka 1205, Bangladesh",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+880 1XXX-XXXXXX",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@inkwellstationery.com",
    href: "mailto:info@inkwellstationery.com",
  },
  {
    icon: Clock,
    label: "Store Hours",
    value: "Sat–Thu: 10 AM – 8 PM\nFriday: Closed",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
          Get in Touch
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          We&apos;d Love to Hear From You
        </h2>
        <p className="mt-3 max-w-lg text-base text-muted-foreground">
          Whether you have a question about an order, need help choosing the
          right product, or just want to say hello — reach out. We usually
          respond within a few hours.
        </p>
      </div>

      <div className="space-y-5">
        {contactDetails.map((item) => (
          <div key={item.label} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-0.5 block text-sm text-muted-foreground hover:text-teal transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-0.5 whitespace-pre-line text-sm text-muted-foreground">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
