"use client";

import { OrderStatus } from "@/lib/types/order";

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "waiting_payment", label: "Payment" },
  { key: "payment_verification", label: "Verification" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "ready_for_delivery", label: "Ready" },
  { key: "delivered", label: "Delivered" },
  { key: "completed", label: "Completed" },
];

// Map of statuses to their step index (cancelled is not a step)
const STATUS_TO_INDEX: Record<string, number> = {};
STEPS.forEach((s, i) => {
  STATUS_TO_INDEX[s.key] = i;
});

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

export function OrderStatusTracker({ currentStatus }: OrderStatusTrackerProps) {
  if (currentStatus === "cancelled") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-800">
          This order has been cancelled.
        </p>
      </div>
    );
  }

  const currentIndex = STATUS_TO_INDEX[currentStatus] ?? 0;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-0 min-w-[600px]">
        {STEPS.map((step, i) => {
          const isActive = i === currentIndex;
          const isCompleted = i < currentIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    isCompleted
                      ? "border-teal bg-teal text-white"
                      : isActive
                        ? "border-teal bg-teal/10 text-teal"
                        : "border-rule bg-paper text-muted-foreground"
                  }`}
                >
                  {isCompleted ? "✓" : i + 1}
                </div>
                {/* Label */}
                <p
                  className={`mt-1.5 text-center text-[10px] leading-tight sm:text-xs ${
                    isActive
                      ? "font-semibold text-teal"
                      : isCompleted
                        ? "text-teal"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="mx-1 flex-1">
                  <div
                    className={`h-0.5 w-full ${
                      i < currentIndex ? "bg-teal" : "bg-rule"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
