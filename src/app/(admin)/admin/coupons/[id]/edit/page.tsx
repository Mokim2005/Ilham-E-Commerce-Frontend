"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getCouponById, updateCoupon } from "@/lib/data/admin/coupons.data"
import { toast } from "sonner"
import { format } from "date-fns"

export default function EditCouponPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [code, setCode] = useState("")
  const [type, setType] = useState<"percentage" | "fixed">("percentage")
  const [value, setValue] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [maxUses, setMaxUses] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getCouponById(id).then((coupon) => {
      if (!coupon) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setCode(coupon.code)
      setType(coupon.type)
      setValue(String(coupon.value))
      setMinPurchase(String(coupon.minPurchase))
      setMaxUses(String(coupon.maxUses))
      setExpiryDate(format(new Date(coupon.expiryDate), "yyyy-MM-dd"))
      setIsActive(coupon.isActive)
      setLoading(false)
    })
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code || !value || !expiryDate) {
      toast.error("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    await updateCoupon(id, {
      code: code.toUpperCase(),
      type,
      value: Number(value),
      minPurchase: Number(minPurchase) || 0,
      maxUses: Number(maxUses) || 0,
      expiryDate: new Date(expiryDate).toISOString(),
      isActive,
    })
    toast.success("Coupon updated")
    router.push("/admin/coupons")
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading coupon...
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/coupons">
            <ArrowLeft className="mr-2 size-4" />
            Back to Coupons
          </Link>
        </Button>
        <p className="text-muted-foreground">Coupon not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/admin/coupons">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Coupon</h1>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Coupon Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER10"
                className="uppercase font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as "percentage" | "fixed")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                type="number"
                min="0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === "percentage" ? "e.g. 10 (%)" : "e.g. 100 (৳)"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPurchase">Minimum Purchase</Label>
              <Input
                id="minPurchase"
                type="number"
                min="0"
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUses">Maximum Uses</Label>
              <Input
                id="maxUses"
                type="number"
                min="0"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="0 for unlimited"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/coupons">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
