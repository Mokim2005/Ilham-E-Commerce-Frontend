"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllProducts, updateProduct } from "@/lib/data/products.data"
import { getAllCategories } from "@/lib/data/categories.data"
import { toast } from "sonner"
import type { Category } from "@/lib/types/category"
import type { Product } from "@/lib/types/product"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [brand, setBrand] = useState("")
  const [categorySlug, setCategorySlug] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [stock, setStock] = useState("")
  const [unit, setUnit] = useState("")
  const [image, setImage] = useState("")
  const [inStock, setInStock] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [products, cats] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ])
      setCategories(cats)

      const product = products.find((p) => p.id === id)
      if (!product) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setName(product.name)
      setSku(product.sku ?? "")
      setBrand(product.brand ?? "")
      setCategorySlug(product.categorySlug)
      setDescription(product.description ?? "")
      setPrice(String(product.price))
      setOriginalPrice(product.originalPrice ? String(product.originalPrice) : "")
      setStock(product.stock != null ? String(product.stock) : "")
      setUnit(product.unit ?? "")
      setImage(product.image)
      setInStock(product.inStock)
      setLoading(false)
    }
    fetchData()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Product name is required")
      return
    }
    if (!sku.trim()) {
      toast.error("SKU is required")
      return
    }

    setSubmitting(true)
    try {
      const priceNum = parseFloat(price) || 0
      const originalPriceNum = parseFloat(originalPrice)
      const stockNum = parseInt(stock, 10) || 0
      const selectedCategory = categories.find((c) => c.slug === categorySlug)

      await updateProduct(id, {
        name: name.trim(),
        slug: name
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        sku: sku.trim(),
        brand: brand.trim() || undefined,
        category: selectedCategory?.name ?? "",
        categorySlug: categorySlug,
        description: description.trim() || undefined,
        price: priceNum,
        originalPrice: originalPriceNum > 0 ? originalPriceNum : undefined,
        discount:
          originalPriceNum > 0
            ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
            : undefined,
        stock: stockNum,
        unit: unit.trim() || undefined,
        image: image.trim() || "",
        inStock,
      })

      toast.success("Product updated successfully")
      router.push("/admin/products")
    } catch {
      toast.error("Failed to update product")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-lg font-medium">Product not found</p>
            <p className="text-muted-foreground mt-1">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild className="mt-4">
              <Link href="/admin/products">Back to Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update product details</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. INK-NB-001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand name"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categorySlug} onValueChange={setCategorySlug}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                rows={4}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Regular Price *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Discount Price</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Leave empty if no discount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="e.g. Piece, Set, Pack"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="inStock"
                checked={inStock}
                onCheckedChange={setInStock}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/products">Cancel</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
