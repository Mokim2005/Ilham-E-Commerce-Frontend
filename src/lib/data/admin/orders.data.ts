import { orders } from "@/lib/mock-data/orders";
import type { Order, OrderStatus } from "@/lib/types/order";

export async function getAllOrders(
  filters?: { status?: OrderStatus; search?: string },
): Promise<Order[]> {
  let results = [...orders];
  if (filters?.status) results = results.filter((o) => o.status === filters.status);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q),
    );
  }
  return results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return orders.find((o) => o.id === id);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
  }
}

export async function verifyPayment(id: string): Promise<void> {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = "confirmed";
    order.updatedAt = new Date().toISOString();
  }
}
