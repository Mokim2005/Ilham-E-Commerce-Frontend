"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingCart, DollarSign } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge"
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog"
import {
  getCustomerById,
  toggleCustomerActive,
  getCustomerOrders,
} from "@/lib/data/admin/customers.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Customer } from "@/lib/types/customer"
import type { Order } from "@/lib/types/order"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CustomerDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    Promise.all([getCustomerById(id), getCustomerOrders(id)]).then(([c, o]) => {
      setCustomer(c ?? null)
      setOrders(o)
      setLoading(false)
    })
  }, [id])

  async function handleToggleActive() {
    if (!customer) return
    await toggleCustomerActive(customer.id)
    const updated = await getCustomerById(id)
    if (updated) setCustomer(updated)
    setConfirmOpen(false)
    toast.success(
      updated?.isActive ? "Account enabled" : "Account disabled"
    )
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading customer...
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/customers">
            <ArrowLeft className="mr-2 size-4" />
            Back to Customers
          </Link>
        </Button>
        <p className="text-muted-foreground">Customer not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/customers">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-muted-foreground" />
                <span>Joined {format(new Date(customer.joinDate), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingCart className="size-4 text-muted-foreground" />
                <span>{customer.orderCount} orders</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="size-4 text-muted-foreground" />
                <span>Total spent: {formatPrice(customer.totalSpent)}</span>
              </div>

              <div className="pt-2">
                <Button
                  variant={customer.isActive ? "destructive" : "default"}
                  className="w-full"
                  onClick={() => setConfirmOpen(true)}
                >
                  {customer.isActive ? "Disable Account" : "Enable Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id}</TableCell>
                          <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
                          <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} statusMap={ORDER_STATUS_MAP} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={customer.isActive ? "Disable Account" : "Enable Account"}
        description={
          customer.isActive
            ? `Are you sure you want to disable ${customer.name}'s account? They will not be able to place orders.`
            : `Are you sure you want to enable ${customer.name}'s account?`
        }
        confirmLabel={customer.isActive ? "Disable" : "Enable"}
        variant={customer.isActive ? "destructive" : "default"}
        onConfirm={handleToggleActive}
      />
    </div>
  )
}
