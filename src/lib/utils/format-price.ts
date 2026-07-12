// Centralised price formatter — every price display in the app should use this.

const CURRENCY = "\u09F3";

export function formatPrice(amount: number): string {
  return `${CURRENCY}${amount.toLocaleString("en-IN")}`;
}

export function getDiscountPercent(regularPrice: number, salePrice: number): number {
  if (regularPrice <= 0 || salePrice >= regularPrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}
