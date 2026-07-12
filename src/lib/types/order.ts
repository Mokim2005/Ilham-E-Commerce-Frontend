export type OrderStatus =
  | "pending"
  | "waiting_payment"
  | "payment_verification"
  | "confirmed"
  | "processing"
  | "ready_for_delivery"
  | "delivered"
  | "completed"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "bkash" | "nagad" | "cod";
  transactionId?: string;
  paymentScreenshot?: string;
  deliveryAddress: string;
  phone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
