// ProductCard — displays a single product with image, name, price, badge, and hover lift effect.
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock-data/products";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

function badgeVariant(badge: Product["badge"]) {
  switch (badge) {
    case "new":
      return "default";
    case "sale":
      return "destructive";
    case "bestseller":
      return "secondary";
    default:
      return "outline";
  }
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className={cn("group block", className)}>
      <div className="card-lift overflow-hidden rounded-xl border border-rule bg-card">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <Badge
              variant={badgeVariant(product.badge)}
              className="absolute left-2 top-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            >
              {product.badge === "bestseller" ? "Best Seller" : product.badge}
            </Badge>
          )}
          {product.discount && (
            <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose text-[10px] font-bold text-white">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-ink line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-ink">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
