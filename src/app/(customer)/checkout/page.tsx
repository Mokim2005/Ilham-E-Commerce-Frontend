// TODO: guard this page so only authenticated users can access it once auth is wired
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryForm, type DeliveryFormData } from "@/components/checkout/delivery-form";
import { OrderNotes } from "@/components/checkout/order-notes";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentMethodTabs } from "@/components/checkout/payment-method-tabs";
import { PaymentInstructions } from "@/components/checkout/payment-instructions";
import { PaymentForm } from "@/components/checkout/payment-form";
import { PlaceOrderButton } from "@/components/checkout/place-order-button";
import { useCartStore } from "@/lib/store/cart-store";
import { getStoreSettings } from "@/lib/data/admin/settings.data";
import type { Coupon } from "@/lib/types/coupon";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [transactionId, setTransactionId] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryChargeFlat, setDeliveryChargeFlat] = useState(60);

  useEffect(() => {
    getStoreSettings().then((s) => setDeliveryChargeFlat(s.deliveryChargeFlat));
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const deliveryCharge = subtotal >= 2000 ? 0 : deliveryChargeFlat;
  const total = subtotal - couponDiscount + deliveryCharge;

  const isValid = deliveryInfo !== null && transactionId.trim().length > 0;

  function handleScreenshotChange(file: File | null) {
    setScreenshotFile(file);
    if (file) {
      setScreenshotPreview(URL.createObjectURL(file));
    } else {
      setScreenshotPreview(null);
    }
  }

  if (items.length === 0) {
    return (
      <section className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-ink">Checkout</h1>
          <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-light">
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 -ml-2">
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Checkout
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Complete Your Order
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Forms */}
          <div className="space-y-8">
            <div className="rounded-xl border border-rule bg-card p-6">
              <DeliveryForm onChange={setDeliveryInfo} />
            </div>

            <div className="rounded-xl border border-rule bg-card p-6">
              <OrderNotes value={orderNote} onChange={setOrderNote} />
            </div>

            <div className="rounded-xl border border-rule bg-card p-6 space-y-6">
              <PaymentMethodTabs value={paymentMethod} onChange={setPaymentMethod} />
              <PaymentInstructions method={paymentMethod} amount={total} />
              <PaymentForm
                transactionId={transactionId}
                onTransactionIdChange={setTransactionId}
                screenshotPreview={screenshotPreview}
                onScreenshotChange={handleScreenshotChange}
              />
            </div>
          </div>

          {/* Right: Summary + Place Order */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <OrderSummary
              onCouponChange={(coupon, discount) => {
                setAppliedCoupon(coupon);
                setCouponDiscount(discount);
              }}
            />
            <PlaceOrderButton
              deliveryInfo={deliveryInfo}
              paymentMethod={paymentMethod}
              transactionId={transactionId}
              orderNote={orderNote}
              screenshotFile={screenshotFile}
              isValid={isValid}
              couponDiscount={couponDiscount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
