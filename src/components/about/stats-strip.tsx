// Stats Strip — pulls real numbers from the data layer to stay consistent with the dashboard.
import { allProducts } from "@/lib/mock-data/products";
import { orders } from "@/lib/mock-data/orders";
import { customers } from "@/lib/mock-data/customers";

export function StatsStrip() {
  const totalProducts = allProducts.length;
  const totalCustomers = customers.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalOrders = orders.length;

  const stats = [
    { value: `${totalProducts}+`, label: "Products in Stock" },
    { value: `${totalCustomers}+`, label: "Happy Customers" },
    { value: `${completedOrders}`, label: "Orders Completed" },
    { value: `${totalOrders}+`, label: "Total Orders Placed" },
  ];

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
