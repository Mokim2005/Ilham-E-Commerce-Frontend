"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format-price";
import { getStoreSettings } from "@/lib/data/admin/settings.data";

interface PaymentInstructionsProps {
  method: string;
  amount: number;
}

export function PaymentInstructions({ method, amount }: PaymentInstructionsProps) {
  const [merchantNumber, setMerchantNumber] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  useEffect(() => {
    getStoreSettings().then((s) => {
      setMerchantNumber(method === "bkash" ? s.bkashNumber : s.nagadNumber);
      setQrCodeImage(s.qrCodeImage);
    });
  }, [method]);

  return (
    <div className="rounded-lg border border-rule bg-muted/50 p-4 text-sm space-y-2">
      <p className="font-medium text-ink">Send {formatPrice(amount)} to:</p>
      <div className="flex items-center gap-3">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded bg-white border border-rule">
          {qrCodeImage ? (
            <Image
              src={qrCodeImage}
              alt="QR Code"
              fill
              className="object-contain p-1"
            />
          ) : (
            <span className="text-[10px] text-muted-foreground text-center leading-tight">
              QR
              <br />
              Code
            </span>
          )}
        </div>
        <div>
          <p className="font-mono text-base font-semibold text-ink">{merchantNumber}</p>
          <p className="text-xs text-muted-foreground">Ilham Stationery</p>
          <p className="text-xs text-muted-foreground">
            Send Money → Enter Amount → Confirm
          </p>
        </div>
      </div>
    </div>
  );
}
