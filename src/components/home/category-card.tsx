import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types/category";

export function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative block h-[400px] w-[300px] shrink-0 overflow-hidden rounded-xl sm:h-[420px] sm:w-[340px]"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="340px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6">
        <span className="mb-1 block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-serif text-2xl font-bold text-white">
          {category.name}
        </h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          {category.productCount} products
        </p>
      </div>
    </Link>
  );
}
