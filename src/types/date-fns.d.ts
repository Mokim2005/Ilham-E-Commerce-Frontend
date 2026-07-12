declare module "date-fns" {
  export function format(date: Date | string | number, formatStr: string, options?: Record<string, unknown>): string;
  export function isPast(date: Date | number): boolean;
  export function subDays(date: Date | number, amount: number): Date;
  export function startOfDay(date: Date | number): Date;
  export function endOfDay(date: Date | number): Date;
  export function parseISO(dateString: string): Date;
  export function isValid(date: unknown): boolean;
}
