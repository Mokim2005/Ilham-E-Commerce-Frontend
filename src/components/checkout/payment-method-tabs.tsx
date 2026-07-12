"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentMethodTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentMethodTabs({ value, onChange }: PaymentMethodTabsProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-serif text-lg font-bold text-ink">Payment Method</h3>
      <Tabs value={value} onValueChange={onChange}>
        <TabsList className="w-full justify-start gap-1 rounded-full border border-rule bg-transparent p-1">
          <TabsTrigger
            value="bkash"
            className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
          >
            bKash
          </TabsTrigger>
          <TabsTrigger
            value="nagad"
            className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
          >
            Nagad
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
