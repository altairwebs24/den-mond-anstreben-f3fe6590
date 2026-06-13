import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; color: string; size: string; quantity: number };
type CartContextValue = { items: CartItem[]; add: (item: CartItem) => void; remove: (index: number) => void; setQuantity: (index: number, quantity: number) => void; clear: () => void; count: number };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("denmond-cart") ?? "[]")); } catch { setItems([]); } }, []);
  useEffect(() => { localStorage.setItem("denmond-cart", JSON.stringify(items)); }, [items]);
  const add = (item: CartItem) => setItems((current) => {
    const found = current.findIndex((entry) => entry.product.id === item.product.id && entry.color === item.color && entry.size === item.size);
    if (found < 0) return [...current, item];
    return current.map((entry, index) => index === found ? { ...entry, quantity: entry.quantity + item.quantity } : entry);
  });
  return <CartContext.Provider value={{ items, add, remove: (index) => setItems((items) => items.filter((_, i) => i !== index)), setQuantity: (index, quantity) => setItems((items) => items.map((item, i) => i === index ? { ...item, quantity: Math.max(1, quantity) } : item)), clear: () => setItems([]), count: items.reduce((sum, item) => sum + item.quantity, 0) }}>{children}</CartContext.Provider>;
}

export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("CartProvider missing"); return value; }