// Category Section — grid of category cards with icon + name + product count. Used on homepage.
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Pen,
  FileText,
  Printer,
  Palette,
  GraduationCap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/lib/mock-data/categories";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Pen,
  FileText,
  Printer,
  Palette,
  GraduationCap,
};

export function CategorySection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by Category"
          description="From everyday essentials to specialty art supplies — find exactly what you need."
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || FileText;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-rule bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
                </div>

                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-white/80" />
                    <h3 className="font-serif text-lg font-bold text-white">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {cat.productCount} products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
