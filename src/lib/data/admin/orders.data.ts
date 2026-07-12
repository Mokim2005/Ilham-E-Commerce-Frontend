// Admin orders data — re-exports from the shared orders data layer.
export {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  verifyPayment,
} from "@/lib/data/orders.data";
