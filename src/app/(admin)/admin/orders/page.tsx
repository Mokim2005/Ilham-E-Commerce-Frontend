"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/admin/shared/data-table"
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge"
import { getAllOrders } from "@/lib/data/admin/orders.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Order, OrderStatus } from "@/lib/types/order"

const ALL_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "waiting_payment", label: "Waiting for Payment" },
  { value: "payment_verification", label: "Payment Verification" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "ready_for_delivery", label: "Ready for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

const columns: ColumnDef<Order, unknown>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm">{row.original.id}</span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.customerName}</div>
        <div className="text-xs text-muted-foreground">{row.original.customerEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
  },
  {
    id: "items",
    header: "Items",
    cell: ({ row }) => row.original.items.length,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatPrice(row.original.total),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} statusMap={ORDER_STATUS_MAP} />,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.paymentMethod}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="sm">
        <Link href={`/admin/orders/${row.original.id}`}>
          <Eye className="mr-1.5 size-4" />
          View
        </Link>
      </Button>
    ),
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    setLoading(true)
    getAllOrders(statusFilter !== "all" ? { status: statusFilter as OrderStatus } : undefined)
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            {ALL_STATUSES.map((s) => (
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
      ) : (
        <DataTable columns={columns} data={orders} />
      )}
    </div>
  )
}
