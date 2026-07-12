"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { createOrder } from "@/lib/data/orders.data";
import { toast } from "sonner";
import type { DeliveryFormData } from "./delivery-form";

interface PlaceOrderButtonProps {
  deliveryInfo: DeliveryFormData | null;
  paymentMethod: string;
  transactionId: string;
  orderNote: string;
  screenshotFile: File | null;
  isValid: boolean;
  couponDiscount?: number;
}

export function PlaceOrderButton({
  deliveryInfo,
  paymentMethod,
  transactionId,
  orderNote,
  screenshotFile,
  isValid,
  couponDiscount = 0,
}: PlaceOrderButtonProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [loading, setLoading] = useState(false);

  async function handlePlaceOrder() {
    if (!deliveryInfo || items.length === 0) return;

    setLoading(true);
    try {
      const order = await createOrder({
        items,
        deliveryInfo: {
          name: deliveryInfo.name,
          phone: deliveryInfo.phone,
          address: deliveryInfo.address,
          city: deliveryInfo.city,
          deliveryOption: deliveryInfo.deliveryOption,
        },
        orderNote: orderNote || undefined,
        paymentMethod: paymentMethod as "bkash" | "nagad",
        transactionId,
        paymentAmount: items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
        screenshotUrl: screenshotFile
          ? URL.createObjectURL(screenshotFile)
          : undefined,
        couponDiscount,
      });

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/checkout/confirmation/${order.id}`);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      className="w-full bg-teal text-white hover:bg-teal-light"
      disabled={!isValid || loading || items.length === 0}
      onClick={handlePlaceOrder}
    >
      {loading ? "Placing Order..." : "Place Order"}
    </Button>
  );
}
