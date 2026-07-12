"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getSalesData } from "@/lib/data/admin/dashboard.data"
import { getAllProducts } from "@/lib/data/products.data"
import { customers } from "@/lib/mock-data/customers"
import { formatPrice } from "@/lib/utils/format-price"
import type { Product } from "@/lib/types/product"

const DATE_RANGES = ["This Week", "This Month", "Last 30 Days"]

function SalesReportTab() {
  const [dateRange, setDateRange] = useState("This Week")
  const [salesData, setSalesData] = useState<{ date: string; revenue: number; orders: number }[]>([])

  useEffect(() => {
    getSalesData().then(setSalesData)
  }, [])

  const filteredData = (() => {
    switch (dateRange) {
      case "This Week":
        return salesData.slice(-7)
      case "This Month":
        return salesData.slice(-30)
      default:
        return salesData
    }
  })()

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = filteredData.reduce((sum, d) => sum + d.orders, 0)
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Daily revenue overview for the selected period.
        </p>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
              <RechartsTooltip
                formatter={(value: number) => [formatPrice(value), "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ fill: "#0d9488" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(avgOrderValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BestSellingTab() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getAllProducts().then((data) => {
      const sorted = [...data].sort((a, b) => b.reviewCount - a.reviewCount)
      setProducts(sorted)
    })
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Top products ranked by number of orders (review count used as proxy).
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-muted-foreground">
                  #{index + 1}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">{formatPrice(product.price)}</TableCell>
                <TableCell className="text-right">{product.stock ?? 0}</TableCell>
                <TableCell className="text-right font-medium">{product.reviewCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const monthlyRevenueData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 167000 },
  { month: "Mar", revenue: 142000 },
  { month: "Apr", revenue: 198000 },
  { month: "May", revenue: 210000 },
  { month: "Jun", revenue: 235000 },
]

function RevenueReportTab() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Monthly revenue breakdown for the current year.
      </p>

      <Card>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} />
              <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
              <RechartsTooltip
                formatter={(value: number) => [formatPrice(value), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyRevenueData.map((row) => (
              <TableRow key={row.month}>
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell className="text-right">{formatPrice(row.revenue)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                {formatPrice(monthlyRevenueData.reduce((s, r) => s + r.revenue, 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function CustomerReportTab() {
  const sortedCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Customers ranked by total spending.
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="text-right">{customer.orderCount}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(customer.totalSpent)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function InventoryReportTab() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getAllProducts().then((data) => {
      const sorted = [...data].sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
      setProducts(sorted)
    })
  }, [])

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", className: "bg-red-100 text-red-800 border-red-200" }
    if (stock < 10)
      return { label: "Low Stock", className: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    return { label: "In Stock", className: "bg-green-100 text-green-800 border-green-200" }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Inventory status for all products. Low-stock items shown first.
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="w-32">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const stock = product.stock ?? 0
              const status = getStockStatus(stock)
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {product.sku ?? "N/A"}
                  </TableCell>
                  <TableCell className="text-right">{stock}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="bestselling">Best Selling</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesReportTab />
        </TabsContent>

        <TabsContent value="bestselling">
          <BestSellingTab />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueReportTab />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerReportTab />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryReportTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
