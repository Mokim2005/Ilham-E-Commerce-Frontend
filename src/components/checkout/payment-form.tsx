"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  transactionId: string;
  onTransactionIdChange: (value: string) => void;
  screenshotPreview: string | null;
  onScreenshotChange: (file: File | null) => void;
}

export function PaymentForm({
  transactionId,
  onTransactionIdChange,
  screenshotPreview,
  onScreenshotChange,
}: PaymentFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="txn-id">Transaction ID</Label>
        <Input
          id="txn-id"
          placeholder="e.g. BK8745123690"
          value={transactionId}
          onChange={(e) => onTransactionIdChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Enter the transaction ID from your {`${"`"}Send Money${"`"}`} confirmation SMS.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label>Payment Screenshot (optional)</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onScreenshotChange(file);
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-dashed border-rule bg-muted/50 px-4 py-3 text-sm text-muted-foreground hover:bg-muted transition-colors w-full text-left"
        >
          {screenshotPreview ? "Screenshot selected ✓" : "Click to upload screenshot"}
        </button>
        {screenshotPreview && (
          <div className="relative mt-2 aspect-video w-48 overflow-hidden rounded border border-rule">
            <img
              src={screenshotPreview}
              alt="Payment screenshot preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
