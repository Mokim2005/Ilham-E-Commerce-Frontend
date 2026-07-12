"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const ORDER_STATUS_MAP: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  waiting_payment: { label: "Waiting for Payment", className: "bg-blue-100 text-blue-800 border-blue-200" },
  payment_verification: { label: "Payment Verification", className: "bg-purple-100 text-purple-800 border-purple-200" },
  confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800 border-green-200" },
  processing: { label: "Processing", className: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  ready_for_delivery: { label: "Ready for Delivery", className: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  delivered: { label: "Delivered", className: "bg-teal-100 text-teal-800 border-teal-200" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 border-red-200" },
}

interface StatusBadgeProps {
  status: string
  statusMap: Record<string, { label: string; className: string }>
}

export function StatusBadge({ status, statusMap }: StatusBadgeProps) {
  const config = statusMap[status]

  if (!config) {
    return <Badge variant="outline">{status}</Badge>
  }

  return (
    <Badge variant="outline" className={cn("border", config.className)}>
      {config.label}
    </Badge>
  )
}
