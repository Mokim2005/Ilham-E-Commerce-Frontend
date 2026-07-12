import { coupons } from "@/lib/mock-data/coupons";
import type { Coupon } from "@/lib/types/coupon";

export async function getAllCoupons(): Promise<Coupon[]> {
  return [...coupons];
}

export async function getCouponById(id: string): Promise<Coupon | undefined> {
  return coupons.find((c) => c.id === id);
}

export async function createCoupon(data: Omit<Coupon, "id" | "usedCount">): Promise<Coupon> {
  const newCoupon: Coupon = {
    ...data,
    id: `coup-${String(Date.now()).slice(-6)}`,
    usedCount: 0,
  };
  coupons.push(newCoupon);
  return newCoupon;
}

export async function updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | null> {
  const index = coupons.findIndex((c) => c.id === id);
  if (index === -1) return null;
  coupons[index] = { ...coupons[index], ...data, id: coupons[index].id };
  return coupons[index];
}

export async function deleteCoupon(id: string): Promise<boolean> {
  const index = coupons.findIndex((c) => c.id === id);
  if (index === -1) return false;
  coupons.splice(index, 1);
  return true;
}

export async function toggleCouponActive(id: string): Promise<void> {
  const coupon = coupons.find((c) => c.id === id);
  if (coupon) {
    coupon.isActive = !coupon.isActive;
  }
}
