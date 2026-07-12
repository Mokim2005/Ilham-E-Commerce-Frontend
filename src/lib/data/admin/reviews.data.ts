import { reviews } from "@/lib/mock-data/reviews";
import type { Review } from "@/lib/types/review";

export async function getAllReviews(
  filters?: { rating?: number; productId?: string; search?: string },
): Promise<Review[]> {
  let results = [...reviews];
  if (filters?.rating) results = results.filter((r) => r.rating === filters.rating);
  if (filters?.productId) results = results.filter((r) => r.productId === filters.productId);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q),
    );
  }
  return results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  return reviews
    .filter((r) => r.productId === productId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function createReview(input: {
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
}): Promise<Review> {
  const review: Review = {
    id: `rev-${Date.now()}`,
    productId: input.productId,
    productName: input.productName,
    customerId: input.customerId,
    customerName: input.customerName,
    rating: input.rating,
    comment: input.comment,
    createdAt: new Date().toISOString(),
  };

  reviews.unshift(review);
  return review;
}

export async function updateReview(
  id: string,
  data: Partial<Pick<Review, "rating" | "comment">>,
): Promise<Review | null> {
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], ...data };
  return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;
  reviews.splice(index, 1);
  return true;
}
