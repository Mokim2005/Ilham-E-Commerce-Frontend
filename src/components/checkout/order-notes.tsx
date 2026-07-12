"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrderNotesProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrderNotes({ value, onChange }: OrderNotesProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="order-notes">Order Notes (optional)</Label>
      <Textarea
        id="order-notes"
        placeholder="Gift wrap, delivery instructions, etc."
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
