import { allProducts } from "@/lib/mock-data/products";
import { orders } from "@/lib/mock-data/orders";
import { customers } from "@/lib/mock-data/customers";

export async function getDashboardStats() {
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "waiting_payment" ||
      o.status === "payment_verification",
  ).length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const lowStockProducts = allProducts.filter(
    (p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 10,
  ).length;

  return {
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalProducts: allProducts.length,
    pendingOrders,
    completedOrders,
    lowStockProducts,
    totalRevenue,
  };
}

export async function getRecentOrders(limit = 5) {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getLowStockProducts(threshold = 10) {
  return allProducts.filter(
    (p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < threshold,
  );
}

export async function getSalesData() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 15) + 3,
    });
  }
  return data;
}
