"use client"

import { useEffect, useState, useCallback } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/admin/shared/data-table"
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog"
import { getAllReviews, deleteReview } from "@/lib/data/admin/reviews.data"
import type { Review } from "@/lib/types/review"
import { toast } from "sonner"

const RATING_FILTERS = [
  { value: "all", label: "All Ratings" },
  { value: "5", label: "5 Stars" },
  { value: "4", label: "4 Stars" },
  { value: "3", label: "3 Stars" },
  { value: "2", label: "2 Stars" },
  { value: "1", label: "1 Star" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
    </div>
  )
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    const filters = ratingFilter !== "all" ? { rating: Number(ratingFilter) } : undefined
    const data = await getAllReviews(filters)
    setReviews(data)
    setLoading(false)
  }, [ratingFilter])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleDelete = async () => {
    if (!deleteTarget) return
    const success = await deleteReview(deleteTarget.id)
    if (success) {
      toast.success("Review deleted successfully")
      setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id))
    } else {
      toast.error("Failed to delete review")
    }
    setConfirmOpen(false)
    setDeleteTarget(null)
  }

  const columns: ColumnDef<Review, unknown>[] = [
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.productName}</span>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <StarRating rating={row.original.rating} />,
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => (
        <span
          className="text-sm text-muted-foreground"
          title={row.original.comment}
        >
          {truncateText(row.original.comment, 80)}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setDeleteTarget(row.original)
            setConfirmOpen(true)
          }}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
      </div>

      <div className="flex items-center gap-3">
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            {RATING_FILTERS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading reviews...
        </div>
      ) : (
        <DataTable columns={columns} data={reviews} />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Review"
        description={`Are you sure you want to delete this review by ${deleteTarget?.customerName}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </div>
  )
}
