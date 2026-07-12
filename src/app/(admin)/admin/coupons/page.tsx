"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { format, isPast } from "date-fns"
import { Plus, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DataTable } from "@/components/admin/shared/data-table"
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog"
import { getAllCoupons, deleteCoupon, toggleCouponActive } from "@/lib/data/admin/coupons.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Coupon } from "@/lib/types/coupon"
import { toast } from "sonner"

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null)

  function refetch() {
    setLoading(true)
    getAllCoupons()
      .then(setCoupons)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    refetch()
  }, [])

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteCoupon(deleteTarget.id)
    toast.success("Coupon deleted")
    setDeleteTarget(null)
    refetch()
  }

  async function handleToggleActive(id: string) {
    await toggleCouponActive(id)
    refetch()
  }

  const columns: ColumnDef<Coupon, unknown>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => (
        <span className="font-mono font-bold uppercase">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.type === "percentage" ? "Percentage" : "Fixed"}
        </Badge>
      ),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) =>
        row.original.type === "percentage"
          ? `${row.original.value}%`
          : formatPrice(row.original.value),
    },
    {
      accessorKey: "minPurchase",
      header: "Min Purchase",
      cell: ({ row }) => formatPrice(row.original.minPurchase),
    },
    {
      accessorKey: "expiryDate",
      header: "Expiry",
      cell: ({ row }) => {
        const expired = isPast(new Date(row.original.expiryDate))
        return (
          <span className={expired ? "text-red-600 font-medium" : ""}>
            {format(new Date(row.original.expiryDate), "MMM d, yyyy")}
            {expired && " (Expired)"}
          </span>
        )
      },
    },
    {
      id: "usage",
      header: "Usage",
      cell: ({ row }) => `${row.original.usedCount} / ${row.original.maxUses}`,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) =>
        row.original.isActive ? (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Active
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Inactive
          </Badge>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const coupon = row.original
        return (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/admin/coupons/${coupon.id}/edit`}>
                <Pencil className="size-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteTarget(coupon)}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
            <Switch
              checked={coupon.isActive}
              onCheckedChange={() => handleToggleActive(coupon.id)}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
        <Button asChild>
          <Link href="/admin/coupons/new">
            <Plus className="mr-2 size-4" />
            Add Coupon
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading coupons...
        </div>
      ) : (
        <DataTable columns={columns} data={coupons} />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Coupon"
        description={`Are you sure you want to delete coupon "${deleteTarget?.code}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  )
}
