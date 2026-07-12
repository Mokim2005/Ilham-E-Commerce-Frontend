"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationBarProps {
  pageIndex: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function PaginationBar({
  pageIndex,
  pageCount,
  onPageChange,
}: PaginationBarProps) {
  const getVisiblePages = (): (number | "...")[] => {
    const pages: (number | "...")[] = []
    const delta = 2

    const left = Math.max(0, pageIndex - delta)
    const right = Math.min(pageCount - 1, pageIndex + delta)

    pages.push(0)

    if (left > 1) {
      pages.push("...")
    }

    for (let i = left; i <= right; i++) {
      if (i !== 0 && i !== pageCount - 1) {
        pages.push(i)
      }
    }

    if (right < pageCount - 2) {
      pages.push("...")
    }

    if (pageCount > 1) {
      pages.push(pageCount - 1)
    }

    return pages
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {getVisiblePages().map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex size-8 items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === pageIndex ? "default" : "outline"}
            size="icon-sm"
            onClick={() => onPageChange(page)}
            className={cn("text-xs")}
          >
            {page + 1}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(pageIndex + 1)}
        disabled={pageIndex >= pageCount - 1}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
