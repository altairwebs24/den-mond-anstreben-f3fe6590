import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const productSchema = z.object({
  id: z.string().uuid().optional(), name: z.string().trim().min(2).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().max(2000),
  category: z.string().min(2).max(80), price: z.number().min(0).nullable(),
  images: z.array(z.string().max(1000)).max(12), colors: z.array(z.string().max(50)).max(30),
  sizes: z.array(z.string().max(30)).max(30), in_stock: z.boolean(), featured: z.boolean(), published: z.boolean(),
});

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("products").select("*").eq("published", true).order("featured", { ascending: false });
  if (error) throw new Error("Could not load the collection.");
  return data;
});

export const listAdminProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  let { data: role } = await context.supabase.from("user_roles").select("id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  const email = typeof context.claims.email === "string" ? context.claims.email.toLowerCase() : "";
  if (!role && email === "simbinikhalaza@gmail.com") {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("user_roles").upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });
    role = { id: context.userId };
  }
  if (!role) throw new Error("This account is not authorised to manage the store.");
  const { data, error } = await context.supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const saveProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => productSchema.parse(input)).handler(async ({ data, context }) => {
  const { data: role } = await context.supabase.from("user_roles").select("id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Not authorised.");
  const { id, ...values } = data;
  const result = id ? await context.supabase.from("products").update(values).eq("id", id).select().single() : await context.supabase.from("products").insert(values).select().single();
  if (result.error) throw new Error(result.error.message);
  return result.data;
});

export const deleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input)).handler(async ({ data, context }) => {
  const { data: role } = await context.supabase.from("user_roles").select("id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Not authorised.");
  const { error } = await context.supabase.from("products").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return { ok: true };
});