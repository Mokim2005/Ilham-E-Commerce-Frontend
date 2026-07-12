"use client"

import { useEffect, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/admin/shared/data-table"
import { getAllProducts, updateProduct } from "@/lib/data/products.data"
import { toast } from "sonner"
import type { Product } from "@/lib/types/product"

type FilterType = "all" | "low" | "out"

function getStockStatus(stock: number, inStock: boolean): {
  label: string
  className: string
} {
  if (!inStock || stock === 0) {
    return { label: "Out of Stock", className: "bg-red-100 text-red-800 border-red-200" }
  }
  if (stock < 10) {
    return { label: "Low Stock", className: "bg-yellow-100 text-yellow-800 border-yellow-200" }
  }
  return { label: "In Stock", className: "bg-green-100 text-green-800 border-green-200" }
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>("all")
  const [stockEdits, setStockEdits] = useState<Record<string, number>>({})
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  function handleStockChange(id: string, value: string) {
    const num = parseInt(value, 10)
    setStockEdits((prev) => ({
      ...prev,
      [id]: isNaN(num) ? 0 : num,
    }))
  }

  async function saveStock(product: Product) {
    const newStock = stockEdits[product.id]
    if (newStock === undefined || newStock === (product.stock ?? 0)) {
      toast.info("No changes to save")
      return
    }

    setUpdatingId(product.id)
    try {
      const updated = await updateProduct(product.id, {
        stock: newStock,
        inStock: newStock > 0,
      })
      if (updated) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? updated : p))
        )
        setStockEdits((prev) => {
          const next = { ...prev }
          delete next[product.id]
          return next
        })
        toast.success(`Stock updated for "${product.name}"`)
      }
    } catch {
      toast.error("Failed to update stock")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredProducts = products.filter((p) => {
    const stock = p.stock ?? 0
    if (filter === "low") return stock > 0 && stock < 10
    if (filter === "out") return stock === 0 || !p.inStock
    return true
  })

  const columns: ColumnDef<Product, unknown>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-10 w-10 rounded object-cover"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => row.original.sku ?? "—",
    },
    {
      id: "currentStock",
      header: "Current Stock",
      cell: ({ row }) => {
        const product = row.original
        const currentEdit = stockEdits[product.id]
        const currentValue = currentEdit !== undefined ? currentEdit : (product.stock ?? 0)
        return (
          <Input
            type="number"
            min="0"
            value={currentValue}
            onChange={(e) => handleStockChange(product.id, e.target.value)}
            className="h-9 w-24"
          />
        )
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const product = row.original
        const stock = product.stock ?? 0
        const status = getStockStatus(stock, product.inStock)
        return (
          <Badge variant="outline" className={`border ${status.className}`}>
            {status.label}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original
        const hasChanges = stockEdits[product.id] !== undefined &&
          stockEdits[product.id] !== (product.stock ?? 0)
        return (
          <Button
            size="sm"
            disabled={!hasChanges || updatingId === product.id}
            onClick={() => saveStock(product)}
          >
            {updatingId === product.id ? "Saving..." : "Update Stock"}
          </Button>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">
          Manage product stock levels
        </p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList>
          <TabsTrigger value="all">
            All ({products.length})
          </TabsTrigger>
          <TabsTrigger value="low">
            Low Stock ({products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 10).length})
          </TabsTrigger>
          <TabsTrigger value="out">
            Out of Stock ({products.filter((p) => (p.stock ?? 0) === 0 || !p.inStock).length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredProducts}
          searchKey="name"
          searchPlaceholder="Search products..."
          pageSize={10}
        />
      )}
    </div>
  )
}
