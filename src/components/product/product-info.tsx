// Product Info — name, brand, SKU, price, stock, description. Server component.
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/types/product";

interface ProductInfoProps {
  product: Product;
}

function formatPrice(amount: number): string {
  return `\u09F3${amount.toLocaleString("en-IN")}`;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-5">
      {/* Breadcrumb-style category */}
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {product.category}
      </p>

      {/* Name + badges */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {product.name}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {product.badge === "new" && (
            <Badge className="bg-teal text-white">New</Badge>
          )}
          {product.badge === "bestseller" && (
            <Badge className="bg-ink text-white">Best Seller</Badge>
          )}
          {product.badge === "sale" && (
            <Badge className="bg-rose text-white">Sale</Badge>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-ink">{product.rating}</span>
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <Separator />

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-ink">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <Badge variant="destructive" className="text-xs">
              -{product.discount}%
            </Badge>
          </>
        )}
      </div>

      {/* Unit */}
      {product.unit && (
        <p className="text-sm text-muted-foreground">
          Sold per {product.unit}
        </p>
      )}

      <Separator />

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {product.brand && (
          <div>
            <span className="text-muted-foreground">Brand: </span>
            <span className="font-medium text-ink">{product.brand}</span>
          </div>
        )}
        {product.sku && (
          <div>
            <span className="text-muted-foreground">SKU: </span>
            <span className="font-medium text-ink">{product.sku}</span>
          </div>
        )}
        <div>
          <span className="text-muted-foreground">Availability: </span>
          <span
            className={`font-medium ${
              product.inStock ? "text-teal" : "text-rose"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-sm leading-relaxed text-ink/70">
          {product.description}
        </p>
      )}
    </div>
  );
}
