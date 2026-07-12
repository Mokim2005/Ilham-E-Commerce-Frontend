"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge"
import { getOrderById, updateOrderStatus, verifyPayment } from "@/lib/data/admin/orders.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Order, OrderStatus } from "@/lib/types/order"
import { toast } from "sonner"

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "waiting_payment",
  "payment_verification",
  "confirmed",
  "processing",
  "ready_for_delivery",
  "delivered",
  "completed",
  "cancelled",
]

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  waiting_payment: "Waiting for Payment",
  payment_verification: "Payment Verification",
  confirmed: "Confirmed",
  processing: "Processing",
  ready_for_delivery: "Ready for Delivery",
  delivered: "Delivered",
  completed: "Completed",
  cancelled: "Cancelled",
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("")

  useEffect(() => {
    getOrderById(id).then((o) => {
      if (o) {
        setOrder(o)
        setSelectedStatus(o.status)
      }
      setLoading(false)
    })
  }, [id])

  async function handleUpdateStatus() {
    if (!order || selectedStatus === order.status) return
    setUpdatingStatus(true)
    await updateOrderStatus(order.id, selectedStatus as OrderStatus)
    const updated = await getOrderById(id)
    if (updated) setOrder(updated)
    setUpdatingStatus(false)
    toast.success("Order status updated")
  }

  async function handleVerifyPayment() {
    if (!order) return
    await verifyPayment(order.id)
    const updated = await getOrderById(id)
    if (updated) setOrder(updated)
    toast.success("Payment verified and order confirmed")
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading order...
      </div>
    )
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="mr-2 size-4" />
            Back to Orders
          </Link>
        </Button>
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Order #{order.id}</h1>
        </div>
        <StatusBadge status={order.status} statusMap={ORDER_STATUS_MAP} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Item</th>
                      <th className="pb-2 font-medium text-right">Price</th>
                      <th className="pb-2 font-medium text-right">Qty</th>
                      <th className="pb-2 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 overflow-hidden rounded bg-muted">
                              <Image
                                src={item.productImage}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium">{item.productName}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">{formatPrice(item.price)}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{order.deliveryAddress}</p>
              <p className="text-muted-foreground">Phone: {order.phone}</p>
              {order.notes && (
                <p className="mt-2 rounded bg-muted p-2 text-muted-foreground">
                  Note: {order.notes}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span className="capitalize font-medium">{order.paymentMethod}</span>
              </div>
              {order.transactionId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-xs">{order.transactionId}</span>
                </div>
              )}
              {order.paymentScreenshot && (
                <div className="mt-2">
                  <span className="text-muted-foreground text-xs">Payment Screenshot</span>
                  <div className="mt-1 relative aspect-video overflow-hidden rounded bg-muted">
                    <Image
                      src={order.paymentScreenshot}
                      alt="Payment screenshot"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              {order.status === "payment_verification" && (
                <Button className="mt-2 w-full" onClick={handleVerifyPayment}>
                  <CheckCircle className="mr-2 size-4" />
                  Verify Payment
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="w-full"
                onClick={handleUpdateStatus}
                disabled={updatingStatus || selectedStatus === order.status}
              >
                {updatingStatus ? "Updating..." : "Update Status"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span>{formatPrice(order.deliveryCharge)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
