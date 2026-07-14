// Value Props Strip — icons + short text for delivery, payment, quality, returns.
import { Truck, ShieldCheck, RotateCcw, CreditCard } from "lucide-react";
import { MotionSection, StaggerItem } from "@/components/shared/motion-wrapper";

const props = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Dhaka same-day, nationwide 2-3 days",
  },
  {
    icon: CreditCard,
    title: "bKash & Nagad",
    desc: "Mobile payment made easy",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    desc: "100% authentic stationery",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free returns",
  },
];

export function ValuePropsSection() {
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <MotionSection stagger className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {props.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </MotionSection>
      </div>
    </section>
  );
}
