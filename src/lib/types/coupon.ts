export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase: number;
  maxUses: number;
  usedCount: number;
  expiryDate: string;
  isActive: boolean;
}
