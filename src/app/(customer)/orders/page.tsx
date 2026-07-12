"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge";
import { getOrdersByCustomerId } from "@/lib/data/orders.data";
import { currentUser } from "@/lib/mock-data/current-user";
import { formatPrice } from "@/lib/utils/format-price";
import type { Order, OrderStatus } from "@/lib/types/order";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "waiting_payment", label: "Waiting for Payment" },
  { value: "processing", label: "Processing" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    getOrdersByCustomerId(currentUser.id).then((all) => {
      if (statusFilter !== "all") {
        setOrders(all.filter((o) => o.status === statusFilter));
      } else {
        setOrders(all);
      }
      setLoading(false);
    });
  }, [statusFilter]);

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            My Orders
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Order History
          </h1>
        </div>

        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[220px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-rule bg-card p-12 text-center">
            <p className="text-muted-foreground">No orders found.</p>
            <Button asChild className="mt-4 bg-teal text-white hover:bg-teal-light">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-xl border border-rule bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <p className="font-mono text-sm font-semibold text-ink">
                      {order.id}
                    </p>
                    <StatusBadge
                      status={order.status}
                      statusMap={ORDER_STATUS_MAP}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {" · "}
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                  <p className="font-medium text-ink">{formatPrice(order.total)}</p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/orders/${order.id}`}>
                    <Eye className="mr-1.5 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
