"use client"

import { useState } from "react"
import { Plus, Trash2, GripVertical, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { banners } from "@/lib/mock-data/banners"
import { allProducts } from "@/lib/mock-data/products"
import type { Banner } from "@/lib/types/banner"
import type { Product } from "@/lib/types/product"

interface Announcement {
  id: string
  text: string
  isActive: boolean
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: "ann-1", text: "Free delivery on orders over ৳2000!", isActive: true },
  { id: "ann-2", text: "New arrivals every Friday", isActive: true },
  { id: "ann-3", text: "Eid sale: Up to 30% off on all art supplies", isActive: false },
]

function BannersTab() {
  const [bannerList, setBannerList] = useState<Banner[]>([...banners])

  const toggleVisibility = (id: string) => {
    setBannerList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isVisible: !b.isVisible } : b))
    )
    toast.success("Banner visibility updated")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage homepage banners and promotional slides.
        </p>
        <Button
          size="sm"
          onClick={() => toast.info("Coming soon")}
        >
          <Plus className="mr-1.5 size-4" />
          Add Banner
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-20">Position</TableHead>
              <TableHead className="w-28">Active</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannerList.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <GripVertical className="size-4 text-muted-foreground" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded border bg-muted">
                      <ImageIcon className="size-4 text-muted-foreground" />
                    </div>
                    <span className="max-w-[120px] truncate text-xs text-muted-foreground">
                      {banner.image.split("/").pop()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{banner.title}</TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{banner.link}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{banner.position}</Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={banner.isVisible}
                    onCheckedChange={() => toggleVisibility(banner.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Coming soon")}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Coming soon")}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function FeaturedProductsTab() {
  const [products, setProducts] = useState<Product[]>([...allProducts])

  const updateBadge = (productId: string, badge: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, badge: badge as Product["badge"] || undefined }
          : p
      )
    )
    toast.success("Product badge updated")
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Manage featured products, best sellers, and new arrivals by setting product badges.
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-40">Current Badge</TableHead>
              <TableHead className="w-48">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.badge ? (
                    <Badge
                      variant="outline"
                      className={
                        product.badge === "bestseller"
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : product.badge === "new"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {product.badge === "bestseller"
                        ? "Best Seller"
                        : product.badge === "new"
                          ? "New"
                          : "Sale"}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={product.badge ?? "none"}
                    onValueChange={(value) =>
                      updateBadge(product.id, value === "none" ? "" : value)
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Set badge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Badge</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="bestseller">Best Seller</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS)
  const [newText, setNewText] = useState("")

  const toggleActive = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    )
    toast.success("Announcement updated")
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    toast.success("Announcement deleted")
  }

  const addAnnouncement = () => {
    if (!newText.trim()) {
      toast.error("Please enter announcement text")
      return
    }
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      text: newText.trim(),
      isActive: true,
    }
    setAnnouncements((prev) => [...prev, newAnnouncement])
    setNewText("")
    toast.success("Announcement added")
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Manage site-wide announcements displayed to customers.
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Announcement</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-28">Active</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((ann, index) => (
              <TableRow key={ann.id}>
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium">{ann.text}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      ann.isActive
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }
                  >
                    {ann.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={ann.isActive}
                    onCheckedChange={() => toggleActive(ann.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAnnouncement(ann.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Add Announcement</h3>
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1">
            <Label htmlFor="new-announcement" className="sr-only">
              Announcement text
            </Label>
            <Input
              id="new-announcement"
              placeholder="Enter announcement text..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addAnnouncement()
              }}
            />
          </div>
          <Button onClick={addAnnouncement}>
            <Plus className="mr-1.5 size-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
      </div>

      <Tabs defaultValue="banners">
        <TabsList>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="featured">Featured Products</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="banners">
          <BannersTab />
        </TabsContent>

        <TabsContent value="featured">
          <FeaturedProductsTab />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
