"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { OrderStatusTracker } from "@/components/orders/order-status-tracker";
import { getOrderById, cancelOrder } from "@/lib/data/orders.data";
import { formatPrice } from "@/lib/utils/format-price";
import { toast } from "sonner";
import type { Order } from "@/lib/types/order";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    getOrderById(id).then((o) => {
      setOrder(o ?? null);
      setLoading(false);
    });
  }, [id]);

  async function handleCancel() {
    await cancelOrder(id);
    const updated = await getOrderById(id);
    if (updated) setOrder(updated);
    setCancelDialogOpen(false);
    toast.success("Order cancelled");
  }

  if (loading) {
    return (
      <section className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Loading order...
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-muted-foreground">Order not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link href="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-2xl font-bold text-ink">{order.id}</h1>
          <StatusBadge status={order.status} statusMap={ORDER_STATUS_MAP} />
        </div>

        {/* Status tracker */}
        <div className="mb-8 rounded-xl border border-rule bg-card p-6">
          <OrderStatusTracker currentStatus={order.status} />
        </div>

        {/* Items */}
        <div className="mb-6 rounded-xl border border-rule bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold text-ink">Items</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded bg-muted">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-ink">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium text-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.couponDiscount > 0 && (
              <div className="flex justify-between text-teal">
                <span>Coupon Discount</span>
                <span className="font-medium">-{formatPrice(order.couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>{order.deliveryCharge === 0 ? "Free" : formatPrice(order.deliveryCharge)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-rule bg-card p-5">
            <h3 className="mb-2 font-serif text-sm font-bold text-ink">Delivery</h3>
            <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
            <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
          </div>
          <div className="rounded-xl border border-rule bg-card p-5">
            <h3 className="mb-2 font-serif text-sm font-bold text-ink">Payment</h3>
            <p className="text-sm capitalize text-muted-foreground">{order.paymentMethod}</p>
            {order.transactionId && (
              <p className="font-mono text-xs text-muted-foreground">TXN: {order.transactionId}</p>
            )}
          </div>
        </div>

        {/* Cancel button — only for pending orders */}
        {order.status === "pending" && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setCancelDialogOpen(true)}
          >
            Cancel Order
          </Button>
        )}

        <ConfirmDialog
          open={cancelDialogOpen}
          onOpenChange={setCancelDialogOpen}
          title="Cancel Order"
          description="Are you sure you want to cancel this order? This action cannot be undone."
          confirmLabel="Yes, Cancel Order"
          onConfirm={handleCancel}
          variant="destructive"
        />
      </div>
    </section>
  );
}
