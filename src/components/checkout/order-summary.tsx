"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tag, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/format-price";
import { useCartStore } from "@/lib/store/cart-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validateCoupon } from "@/lib/data/admin/coupons.data";
import { getStoreSettings } from "@/lib/data/admin/settings.data";
import type { Coupon } from "@/lib/types/coupon";

interface OrderSummaryProps {
  onCouponChange?: (coupon: Coupon | null, discount: number) => void;
}

export function OrderSummary({ onCouponChange }: OrderSummaryProps) {
  const items = useCartStore((s) => s.items);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [validating, setValidating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [deliveryChargeFlat, setDeliveryChargeFlat] = useState(60);

  useEffect(() => {
    setMounted(true);
    getStoreSettings().then((s) => setDeliveryChargeFlat(s.deliveryChargeFlat));
  }, []);

  const subtotal = mounted
    ? items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : 0;

  const deliveryCharge = subtotal >= 2000 ? 0 : deliveryChargeFlat;

  const discount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percentage") {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    return Math.min(appliedCoupon.value, subtotal);
  })();

  const total = subtotal - discount + deliveryCharge;

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setValidating(true);
    setCouponError("");
    const result = await validateCoupon(couponCode.trim(), subtotal);
    setValidating(false);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponError("");
      onCouponChange?.(result.coupon, discount);
    } else {
      setAppliedCoupon(null);
      setCouponError(result.error || "Invalid coupon");
      onCouponChange?.(null, 0);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    onCouponChange?.(null, 0);
  }

  return (
    <div className="rounded-xl border border-rule bg-card p-5">
      <h3 className="mb-4 font-serif text-lg font-bold text-ink">Order Summary</h3>

      {/* Items list */}
      <div className="space-y-3">
        {mounted &&
          items.map((item) => (
            <div
              key={item.product.slug}
              className="flex items-center gap-3 text-sm"
            >
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-ink">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="font-medium text-ink">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
      </div>

      <Separator className="my-4" />

      {/* Coupon */}
      <div className="space-y-1.5 mb-4">
        <Label htmlFor="coupon">Coupon Code</Label>
        {appliedCoupon ? (
          <div className="flex items-center gap-2 rounded-lg border border-teal/20 bg-teal/5 px-3 py-2">
            <Tag className="h-4 w-4 text-teal" />
            <span className="flex-1 text-sm font-medium text-teal">
              {appliedCoupon.code}
              {appliedCoupon.type === "percentage"
                ? ` (${appliedCoupon.value}% off)`
                : ` (${formatPrice(appliedCoupon.value)} off)`}
            </span>
            <button
              type="button"
              onClick={handleRemoveCoupon}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              id="coupon"
              placeholder="Enter coupon"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyCoupon();
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="border-rule"
              onClick={handleApplyCoupon}
              disabled={validating || !couponCode.trim()}
            >
              {validating ? "..." : "Apply"}
            </Button>
          </div>
        )}
        {couponError && (
          <p className="text-xs text-destructive">{couponError}</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-teal">
            <span>Coupon Discount</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-muted-foreground">
            {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
