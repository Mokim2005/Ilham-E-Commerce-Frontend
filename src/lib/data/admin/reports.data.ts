import { allProducts } from "@/lib/mock-data/products";
import { orders } from "@/lib/mock-data/orders";
import { customers } from "@/lib/mock-data/customers";
import { formatPrice } from "@/lib/utils/format-price";

export async function getSalesReport() {
  const completedOrders = orders.filter((o) => o.status !== "cancelled");
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = completedOrders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const monthlySales: { month: string; revenue: number; orders: number }[] = [];
  const monthMap = new Map<string, { revenue: number; orders: number }>();

  for (const order of completedOrders) {
    const date = new Date(order.createdAt);
    const key = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const existing = monthMap.get(key);
    if (existing) {
      existing.revenue += order.total;
      existing.orders += 1;
    } else {
      monthMap.set(key, { revenue: order.total, orders: 1 });
    }
  }

  monthMap.forEach((value, key) => {
    monthlySales.push({ month: key, revenue: value.revenue, orders: value.orders });
  });

  const paymentMethodBreakdown = {
    bkash: completedOrders.filter((o) => o.paymentMethod === "bkash").reduce((s, o) => s + o.total, 0),
    nagad: completedOrders.filter((o) => o.paymentMethod === "nagad").reduce((s, o) => s + o.total, 0),
    cod: completedOrders.filter((o) => o.paymentMethod === "cod").reduce((s, o) => s + o.total, 0),
  };

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    formattedRevenue: formatPrice(totalRevenue),
    formattedAverage: formatPrice(averageOrderValue),
    monthlySales,
    paymentMethodBreakdown,
    cancelledOrders: orders.filter((o) => o.status === "cancelled").length,
    totalCustomers: customers.length,
  };
}

export async function getBestSellingProducts() {
  const productSales = new Map<string, { name: string; quantity: number; revenue: number }>();

  for (const order of orders.filter((o) => o.status !== "cancelled")) {
    for (const item of order.items) {
      const existing = productSales.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.revenue += item.price * item.quantity;
      } else {
        productSales.set(item.productId, {
          name: item.productName,
          quantity: item.quantity,
          revenue: item.price * item.quantity,
        });
      }
    }
  }

  return [...productSales.entries()]
    .map(([productId, data]) => ({
      productId,
      ...data,
      formattedRevenue: formatPrice(data.revenue),
    }))
    .sort((a, b) => b.quantity - a.quantity);
}

export async function getInventoryReport() {
  return allProducts.map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku ?? "N/A",
    stock: p.stock ?? 0,
    inStock: p.inStock,
    status: (p.stock ?? 0) === 0
      ? "out_of_stock"
      : (p.stock ?? 0) < 10
        ? "low_stock"
        : "in_stock",
    category: p.category,
  }));
}
