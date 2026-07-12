"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/admin/shared/data-table"
import { getAllCustomers } from "@/lib/data/admin/customers.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Customer } from "@/lib/types/customer"

const columns: ColumnDef<Customer, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "joinDate",
    header: "Joined",
    cell: ({ row }) => format(new Date(row.original.joinDate), "MMM d, yyyy"),
  },
  {
    accessorKey: "orderCount",
    header: "Orders",
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => formatPrice(row.original.totalSpent),
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
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
          Disabled
        </Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="sm">
        <Link href={`/admin/customers/${row.original.id}`}>
          <Eye className="mr-1.5 size-4" />
          View
        </Link>
      </Button>
    ),
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Customers</h1>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading customers...
        </div>
      ) : (
        <DataTable columns={columns} data={customers} />
      )}
    </div>
  )
}
