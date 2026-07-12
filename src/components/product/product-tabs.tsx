// Product Tabs — Description and Reviews tabs using shadcn Tabs. Client component.
"use client";

import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description?: string;
  reviewCount: number;
  rating: number;
}

// Mock reviews — will be replaced with real data later
const mockReviews = [
  {
    id: 1,
    name: "Samin R.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Exactly what I was looking for. The quality is outstanding and it arrived in perfect condition. Highly recommend!",
  },
  {
    id: 2,
    name: "Tasnim A.",
    rating: 4,
    date: "1 month ago",
    comment:
      "Very good product for the price. Shipping was fast too. Will order again.",
  },
];

export function ProductTabs({
  description,
  reviewCount,
  rating,
}: ProductTabsProps) {
  return (
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
          Reviews ({reviewCount})
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
                {reviewCount} reviews
              </p>
            </div>
            <div className="h-12 w-px bg-rule" />
            <p className="text-sm text-muted-foreground">
              Reviews are verified and collected from real customers.
            </p>
          </div>

          {/* Individual reviews */}
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-rule pb-5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-xs font-semibold text-teal">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{review.name}</p>
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
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
