import { storeSettings as initialSettings } from "@/lib/mock-data/settings";
import type { StoreSettings } from "@/lib/types/settings";

let settings: StoreSettings = { ...initialSettings };

export async function getStoreSettings(): Promise<StoreSettings> {
  return { ...settings };
}

export async function updateStoreSettings(data: Partial<StoreSettings>): Promise<StoreSettings> {
  settings = { ...settings, ...data };
  return { ...settings };
}
