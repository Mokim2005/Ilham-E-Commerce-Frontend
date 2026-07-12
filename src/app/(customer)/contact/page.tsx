// Contact page — composes contact info and form. Server Component.
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = {
  title: "Contact — Inkwell",
  description:
    "Get in touch with Inkwell Stationery. We're here to help with orders, product questions, and more.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          description="Have a question or just want to say hello? We're here to help."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <ContactInfo />

          <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
            <h3 className="mb-6 text-lg font-semibold text-ink">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
