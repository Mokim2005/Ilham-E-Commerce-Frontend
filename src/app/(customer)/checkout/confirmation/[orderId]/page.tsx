// Order Confirmation page — shows success message and order summary after placing an order.
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/lib/data/orders.data";
import { formatPrice } from "@/lib/utils/format-price";

interface ConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: ConfirmationPageProps) {
  const { orderId } = await params;
  return { title: `Order ${orderId} — Ilham` };
}

export default async function OrderConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) notFound();

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Success header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
            <CheckCircle className="h-8 w-8 text-teal" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ink">Order Placed!</h1>
          <p className="mt-2 text-muted-foreground">
            Your order <span className="font-mono font-medium text-ink">{order.id}</span> has been
            received.
          </p>
        </div>

        {/* Status note */}
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p>
            <strong>Status: Waiting for Payment</strong> — Your order will be confirmed once our
            team verifies the transaction. This usually takes a few hours during business hours.
          </p>
        </div>

        {/* Order details */}
        <div className="rounded-xl border border-rule bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold text-ink">Order Summary</h2>

          {/* Items */}
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-ink">
                    {item.productName} <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                </div>
                <span className="font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
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

          <Separator className="my-4" />

          {/* Delivery + Payment info */}
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="mb-1 font-medium text-ink">Delivery Address</p>
              <p className="text-muted-foreground">{order.deliveryAddress}</p>
              <p className="text-muted-foreground">Phone: {order.phone}</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">Payment</p>
              <p className="text-muted-foreground capitalize">{order.paymentMethod}</p>
              {order.transactionId && (
                <p className="font-mono text-xs text-muted-foreground">
                  TXN: {order.transactionId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="border-rule">
            <Link href={`/orders/${order.id}`}>Track This Order</Link>
          </Button>
          <Button asChild className="bg-teal text-white hover:bg-teal-light">
            <Link href="/shop">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
