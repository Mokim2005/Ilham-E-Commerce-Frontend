import { customers } from "@/lib/mock-data/customers";
import { orders } from "@/lib/mock-data/orders";
import type { Customer } from "@/lib/types/customer";
import type { Order } from "@/lib/types/order";

export async function getAllCustomers(search?: string): Promise<Customer[]> {
  let results = [...customers];
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }
  return results.sort(
    (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime(),
  );
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
  return customers.find((c) => c.id === id);
}

export async function toggleCustomerActive(id: string): Promise<void> {
  const customer = customers.find((c) => c.id === id);
  if (customer) {
    customer.isActive = !customer.isActive;
  }
}

export async function getCustomerOrders(customerId: string): Promise<Order[]> {
  return orders
    .filter((o) => o.customerId === customerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
