import type { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;

export const money = (value: number | null) =>
  value == null ? "Price coming soon" : new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);

export const splitList = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);