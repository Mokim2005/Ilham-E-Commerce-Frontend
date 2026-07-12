"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createReview } from "@/lib/data/admin/reviews.data";
import { currentUser } from "@/lib/mock-data/current-user";
import { toast } from "sonner";

interface WriteReviewFormProps {
  productId: string;
  productName: string;
  onReviewSubmitted: () => void;
}

export function WriteReviewForm({
  productId,
  productName,
  onReviewSubmitted,
}: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // TODO: only allow if user has actually purchased this product, once auth + orders are real
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    await createReview({
      productId,
      productName,
      customerId: currentUser.id,
      customerName: currentUser.name,
      rating,
      comment: comment.trim(),
    });
    setSubmitting(false);
    setRating(0);
    setComment("");
    toast.success("Review submitted!");
    onReviewSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-rule bg-muted/30 p-4">
      <h4 className="font-serif text-sm font-bold text-ink">Write a Review</h4>

      {/* Star rating */}
      <div className="space-y-1.5">
        <Label>Rating</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-0.5"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              {rating}/5
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-1.5">
        <Label htmlFor="review-comment">Your Review</Label>
        <Textarea
          id="review-comment"
          placeholder="Share your experience with this product..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        size="sm"
        className="bg-teal text-white hover:bg-teal-light"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
