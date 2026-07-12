// Stats Strip — horizontal number highlights. Used on the About page.
const stats = [
  { value: "500+", label: "Products in Stock" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "5+", label: "Years of Service" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function StatsStrip() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-teal sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
