"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStoreSettings, updateStoreSettings } from "@/lib/data/admin/settings.data"
import type { StoreSettings } from "@/lib/types/settings"

function StoreInfoTab({ settings }: { settings: StoreSettings }) {
  const [storeName, setStoreName] = useState(settings.storeName)
  const [contactEmail, setContactEmail] = useState(settings.contactEmail)
  const [contactPhone, setContactPhone] = useState(settings.contactPhone)
  const [address, setAddress] = useState(settings.address)

  const handleSave = async () => {
    await updateStoreSettings({ storeName, contactEmail, contactPhone, address })
    toast.success("Store info updated successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Information</CardTitle>
        <CardDescription>Update your store's basic information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Contact Phone</Label>
          <Input
            id="contact-phone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-1.5 size-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentSettingsTab({ settings }: { settings: StoreSettings }) {
  const [bkashNumber, setBkashNumber] = useState(settings.bkashNumber)
  const [nagadNumber, setNagadNumber] = useState(settings.nagadNumber)
  const [qrCodeImage, setQrCodeImage] = useState(settings.qrCodeImage)

  const handleSave = async () => {
    await updateStoreSettings({ bkashNumber, nagadNumber, qrCodeImage })
    toast.success("Payment settings updated successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>Configure payment methods and details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bkash-number">bKash Number</Label>
            <Input
              id="bkash-number"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nagad-number">Nagad Number</Label>
            <Input
              id="nagad-number"
              value={nagadNumber}
              onChange={(e) => setNagadNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="qr-code">QR Code Image URL</Label>
          <Input
            id="qr-code"
            value={qrCodeImage}
            onChange={(e) => setQrCodeImage(e.target.value)}
            placeholder="/images/qr-code.png"
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-1.5 size-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DeliverySettingsTab({ settings }: { settings: StoreSettings }) {
  const [deliveryChargeFlat, setDeliveryChargeFlat] = useState(
    String(settings.deliveryChargeFlat)
  )

  const handleSave = async () => {
    await updateStoreSettings({ deliveryChargeFlat: Number(deliveryChargeFlat) || 0 })
    toast.success("Delivery settings updated successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Settings</CardTitle>
        <CardDescription>Configure delivery charges and options.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="delivery-charge">Delivery Charge (flat amount)</Label>
          <Input
            id="delivery-charge"
            type="number"
            min={0}
            value={deliveryChargeFlat}
            onChange={(e) => setDeliveryChargeFlat(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Fixed delivery charge applied to all orders (in ৳).
          </p>
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-1.5 size-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SocialLinksTab({ settings }: { settings: StoreSettings }) {
  const [socialFacebook, setSocialFacebook] = useState(settings.socialFacebook)
  const [socialInstagram, setSocialInstagram] = useState(settings.socialInstagram)
  const [socialYoutube, setSocialYoutube] = useState(settings.socialYoutube)

  const handleSave = async () => {
    await updateStoreSettings({ socialFacebook, socialInstagram, socialYoutube })
    toast.success("Social links updated successfully")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>Add your social media profile URLs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook URL</Label>
          <Input
            id="facebook"
            value={socialFacebook}
            onChange={(e) => setSocialFacebook(e.target.value)}
            placeholder="https://facebook.com/your-page"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram URL</Label>
          <Input
            id="instagram"
            value={socialInstagram}
            onChange={(e) => setSocialInstagram(e.target.value)}
            placeholder="https://instagram.com/your-profile"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube URL</Label>
          <Input
            id="youtube"
            value={socialYoutube}
            onChange={(e) => setSocialYoutube(e.target.value)}
            placeholder="https://youtube.com/your-channel"
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-1.5 size-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStoreSettings().then((data) => {
      setSettings(data)
      setLoading(false)
    })
  }, [])

  if (loading || !settings) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading settings...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store Info</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <StoreInfoTab settings={settings} />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentSettingsTab settings={settings} />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliverySettingsTab settings={settings} />
        </TabsContent>

        <TabsContent value="social">
          <SocialLinksTab settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
