"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Heart, Clock } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { getOrdersByCustomerId } from "@/lib/data/orders.data";
import { currentUser } from "@/lib/mock-data/current-user";
import { formatPrice } from "@/lib/utils/format-price";
import type { Order } from "@/lib/types/order";

export function DashboardSummary() {
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getOrdersByCustomerId(currentUser.id).then(setOrders);
  }, []);

  const activeOrders = orders.filter(
    (o) =>
      o.status !== "completed" &&
      o.status !== "cancelled" &&
      o.status !== "delivered",
  );

  const recentOrder = orders[0];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-rule bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
            <Package className="h-5 w-5 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-ink">{activeOrders.length}</p>
            <p className="text-xs text-muted-foreground">Active Orders</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose/10">
            <Heart className="h-5 w-5 text-rose" />
          </div>
          <div>
            <p className="text-2xl font-bold text-ink">
              {mounted ? wishlistCount : 0}
            </p>
            <p className="text-xs text-muted-foreground">Wishlist Items</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-rule bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-ink">{orders.length}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
        </div>
      </div>

      {recentOrder && (
        <div className="sm:col-span-3 rounded-xl border border-rule bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ink">Recent Order</p>
              <p className="text-xs text-muted-foreground">
                {recentOrder.id} — {formatPrice(recentOrder.total)}
              </p>
            </div>
            <Link
              href={`/orders/${recentOrder.id}`}
              className="text-xs font-medium text-teal hover:underline"
            >
              View
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
