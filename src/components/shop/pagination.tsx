// Pagination — page-number links driven by URL search params. Client component.
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function pageHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    return `/shop?${params.toString()}`;
  }

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1"
    >
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule text-ink/60 transition-colors hover:bg-accent hover:text-ink"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
              p === currentPage
                ? "border-ink bg-ink text-white"
                : "border-rule text-ink/60 hover:bg-accent hover:text-ink",
            )}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-rule text-ink/60 transition-colors hover:bg-accent hover:text-ink"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
