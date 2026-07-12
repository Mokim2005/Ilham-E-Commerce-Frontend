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

export async function deleteReview(id: string): Promise<boolean> {
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;
  reviews.splice(index, 1);
  return true;
}
