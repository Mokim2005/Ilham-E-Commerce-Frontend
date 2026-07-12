import { orders } from "@/lib/mock-data/orders";
import type { Order, OrderStatus } from "@/lib/types/order";
import type { CartItem } from "@/lib/store/cart-store";
import { getStoreSettings } from "@/lib/data/admin/settings.data";
import { allProducts } from "@/lib/mock-data/products";

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

export async function getOrdersByCustomerId(customerId: string): Promise<Order[]> {
  return orders
    .filter((o) => o.customerId === customerId)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
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

export async function cancelOrder(id: string): Promise<void> {
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = "cancelled";
    order.updatedAt = new Date().toISOString();
  }
}

export async function createOrder(input: {
  items: CartItem[];
  deliveryInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    deliveryOption: "standard" | "express";
  };
  orderNote?: string;
  paymentMethod: "bkash" | "nagad";
  transactionId: string;
  paymentAmount: number;
  screenshotUrl?: string;
  couponDiscount?: number;
}): Promise<Order> {
  const subtotal = input.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const settings = await getStoreSettings();
  const deliveryCharge = input.deliveryInfo.deliveryOption === "express" ? 120 : subtotal >= 2000 ? 0 : settings.deliveryChargeFlat;
  const discount = input.couponDiscount ?? 0;

  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(orders.length + 1).padStart(3, "0");

  const order: Order = {
    id: `ORD-${datePart}-${seq}`,
    customerId: "cust-mock",
    customerName: input.deliveryInfo.name,
    customerEmail: "mock@example.com",
    items: input.items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    })),
    subtotal,
    couponDiscount: discount,
    deliveryCharge,
    total: subtotal - discount + deliveryCharge,
    status: "waiting_payment",
    paymentMethod: input.paymentMethod,
    transactionId: input.transactionId,
    paymentScreenshot: input.screenshotUrl,
    deliveryAddress: `${input.deliveryInfo.address}, ${input.deliveryInfo.city}`,
    phone: input.deliveryInfo.phone,
    notes: input.orderNote,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  orders.unshift(order);

  // Decrease stock for each product
  for (const item of input.items) {
    const product = allProducts.find((p) => p.id === item.product.id);
    if (product) {
      const newStock = Math.max(0, (product.stock ?? 0) - item.quantity);
      product.stock = newStock;
      product.inStock = newStock > 0;
    }
  }

  return order;
}
