// Shop loading state — skeleton grid matching the ProductCard layout.
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <Skeleton className="mb-2 h-3 w-16" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-28" />
        </div>

        {/* Toolbar skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>

        {/* Grid skeleton — matches ProductCard shape */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-rule bg-card"
            >
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
