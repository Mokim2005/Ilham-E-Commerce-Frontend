"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatusBadge, ORDER_STATUS_MAP } from "@/components/admin/shared/status-badge"
import { StatCard } from "@/components/admin/shared/stat-card"
import {
  getDashboardStats,
  getRecentOrders,
  getLowStockProducts,
  getSalesData,
} from "@/lib/data/admin/dashboard.data"
import { formatPrice } from "@/lib/utils/format-price"
import type { Order } from "@/lib/types/order"
import type { Product } from "@/lib/types/product"

interface DashboardStats {
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  pendingOrders: number
  completedOrders: number
  lowStockProducts: number
  totalRevenue: number
}

interface SalesDataPoint {
  date: string
  revenue: number
  orders: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([])
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [statsData, ordersData, lowStockData, sales] = await Promise.all([
        getDashboardStats(),
        getRecentOrders(5),
        getLowStockProducts(),
        getSalesData(),
      ])
      setStats(statsData)
      setRecentOrders(ordersData)
      setLowStockProducts(lowStockData)
      setSalesData(sales)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-80" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatPrice(stats?.totalRevenue ?? 0)}
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers ?? 0}
          icon={Users}
        />
        <StatCard
          title="Pending Orders"
          value={stats?.pendingOrders ?? 0}
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard
          title="Completed Orders"
          value={stats?.completedOrders ?? 0}
          icon={CheckCircle}
        />
        <StatCard
          title="Low Stock Products"
          value={stats?.lowStockProducts ?? 0}
          icon={AlertTriangle}
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={Package}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatPrice(value)}
                labelStyle={{ color: "#333" }}
              />
              <Bar dataKey="revenue" fill="#2F6F62" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
              <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent orders.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Order ID</th>
                      <th className="pb-2 font-medium">Customer</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium text-right">Total</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-2.5 font-medium">{order.id}</td>
                        <td className="py-2.5">{order.customerName}</td>
                        <td className="py-2.5 text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-2.5 text-right font-medium">
                          {formatPrice(order.total)}
                        </td>
                        <td className="py-2.5">
                          <StatusBadge
                            status={order.status}
                            statusMap={ORDER_STATUS_MAP}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                All products well stocked
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <span className="text-sm text-red-600 font-semibold">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
