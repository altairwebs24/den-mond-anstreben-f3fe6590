import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-context";
import logo from "@/assets/1781371216116.jpg.asset.json";

export function SiteHeader() {
  const [open, setOpen] = useState(false); const { count } = useCart();
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6">
      <Link to="/" className="flex items-center gap-3"><img src={logo.url} alt="Den Mond Anstreben" className="h-12 w-12 rounded-full object-cover"/><span className="font-display text-xl font-black uppercase tracking-tight">Den Mond</span></Link>
      <nav className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider md:flex"><Link to="/">Home</Link><Link to="/shop">Shop</Link><Link to="/admin">Admin</Link></nav>
      <div className="flex items-center gap-1"><Button asChild variant="ghost" size="icon"><Link to="/cart" aria-label={`Cart with ${count} items`} className="relative"><ShoppingBag/><span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">{count}</span></Link></Button><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</Button></div>
    </div>
    {open && <nav className="grid border-t border-border px-4 py-4 text-lg font-black uppercase md:hidden"><Link onClick={() => setOpen(false)} to="/" className="py-3">Home</Link><Link onClick={() => setOpen(false)} to="/shop" className="py-3">Shop</Link><Link onClick={() => setOpen(false)} to="/admin" className="py-3">Admin</Link></nav>}
  </header>;
}