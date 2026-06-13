import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { money } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return <article className="group"><Link to="/product/$slug" params={{ slug: product.slug }} className="block overflow-hidden bg-muted"><img src={product.images[0]} alt={product.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"/></Link><div className="pt-4"><p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">{product.category}</p><Link to="/product/$slug" params={{ slug: product.slug }} className="mt-1 block font-display text-xl font-black uppercase">{product.name}</Link><p className="mt-2 font-bold text-primary">{money(product.price)}</p></div></article>;
}