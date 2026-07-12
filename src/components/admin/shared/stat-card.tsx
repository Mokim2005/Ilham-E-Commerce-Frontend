"use client"

import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("gap-3", className)}>
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {trend && (
            <div className="flex items-center gap-1 text-xs font-medium">
              {trend.isPositive ? (
                <TrendingUp className="size-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="size-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  trend.isPositive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-muted p-3">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}
