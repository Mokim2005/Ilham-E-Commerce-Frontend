"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Pencil, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import {
  getReviewsByProductId,
  updateReview,
  deleteReview,
} from "@/lib/data/admin/reviews.data";
import { currentUser } from "@/lib/mock-data/current-user";
import { WriteReviewForm } from "./write-review-form";
import { toast } from "sonner";
import type { Review } from "@/lib/types/review";

interface ProductTabsProps {
  productId: string;
  productName: string;
  description?: string;
  reviewCount: number;
  rating: number;
}

export function ProductTabs({
  productId,
  productName,
  description,
  reviewCount,
  rating,
}: ProductTabsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const loadReviews = useCallback(() => {
    setLoading(true);
    getReviewsByProductId(productId).then((r) => {
      setReviews(r);
      setLoading(false);
    });
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  function startEdit(review: Review) {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  }

  async function handleEditSubmit() {
    if (!editingReview) return;
    if (editRating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (!editComment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    await updateReview(editingReview.id, {
      rating: editRating,
      comment: editComment.trim(),
    });
    setEditingReview(null);
    toast.success("Review updated");
    loadReviews();
  }

  function confirmDelete(id: string) {
    setDeletingReviewId(id);
    setDeleteDialogOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!deletingReviewId) return;
    await deleteReview(deletingReviewId);
    setDeleteDialogOpen(false);
    setDeletingReviewId(null);
    toast.success("Review deleted");
    loadReviews();
  }

  return (
    <>
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="mb-6 h-auto w-full justify-start gap-1 rounded-full border border-rule bg-transparent p-1 sm:w-auto">
        <TabsTrigger
          value="description"
          className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
        >
          Reviews ({reviews.length || reviewCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        <div className="prose prose-sm max-w-none text-ink/70">
          {description ? (
            <p className="leading-relaxed">{description}</p>
          ) : (
            <p className="text-muted-foreground">
              No description available for this product.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="reviews">
        <div className="space-y-6">
          {/* Review summary */}
          <div className="flex items-center gap-4 rounded-xl border border-rule bg-card p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-ink">{rating}</p>
              <div className="mt-1 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {reviews.length || reviewCount} reviews
              </p>
            </div>
            <div className="h-12 w-px bg-rule" />
            <p className="text-sm text-muted-foreground">
              Reviews are verified and collected from real customers.
            </p>
          </div>

          {/* Write a review */}
          <WriteReviewForm
            productId={productId}
            productName={productName}
            onReviewSubmitted={loadReviews}
          />

          {/* Individual reviews */}
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-rule pb-5 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-xs font-semibold text-teal">
                    {review.customerName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">
                      {review.customerName}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {review.customerId === currentUser.id && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => startEdit(review)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        onClick={() => confirmDelete(review.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Edit form or comment display */}
                {editingReview?.id === review.id ? (
                  <div className="mt-3 space-y-3 rounded-lg border border-teal/20 bg-teal/5 p-3">
                    <div className="space-y-1.5">
                      <Label>Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="p-0.5"
                            onClick={() => setEditRating(star)}
                          >
                            <Star
                              className={`h-4 w-4 transition-colors ${
                                star <= editRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-teal text-white hover:bg-teal-light"
                        onClick={handleEditSubmit}
                      >
                        Save Changes
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingReview(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
                    {review.comment}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>

    <ConfirmDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      title="Delete Review"
      description="Are you sure you want to delete this review? This action cannot be undone."
      confirmLabel="Delete"
      onConfirm={handleDeleteConfirm}
      variant="destructive"
    />
    </>
  );
}
