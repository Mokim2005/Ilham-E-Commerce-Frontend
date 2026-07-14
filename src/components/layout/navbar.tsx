// Navbar — desktop nav + mobile Sheet menu. Used in layout.tsx as site-wide header.
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, BookOpen, LogOut, LayoutDashboard, Package } from "lucide-react";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { useUiStore } from "@/lib/store/ui-store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const scrollHidden = useHideOnScroll();
  const hidden = scrollHidden && !mobileOpen;

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartTotalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const openCart = useUiStore((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayWishlistCount = mounted ? wishlistCount : 0;
  const displayCartCount = mounted ? cartTotalItems : 0;

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" as const }}
        className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-md"
      >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-teal" />
          <span className="font-serif text-2xl font-bold tracking-tight text-ink">
            Ilham
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            Stationery
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 text-ink/60 hover:text-ink sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Wishlist with live count badge */}
          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden h-9 w-9 text-ink/60 hover:text-ink sm:inline-flex"
              aria-label={`Wishlist (${displayWishlistCount} items)`}
            >
              <Heart className="h-4 w-4" />
              {displayWishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
                >
                  {displayWishlistCount}
                </Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-9 w-9 text-ink/60 hover:text-ink sm:inline-flex"
                aria-label="Account"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/orders")}>
                <Package className="mr-2 h-4 w-4" />
                My Orders
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/login");
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart with live count badge */}
          <m.button
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={openCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink/60 transition-colors hover:bg-accent hover:text-ink"
            aria-label={`Cart (${displayCartCount} items)`}
          >
            <ShoppingBag className="h-4 w-4" />
            {displayCartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
              >
                {displayCartCount}
              </Badge>
            )}
          </m.button>

          {/* Mobile menu toggle */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-9 w-9 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-paper p-0">
              <SheetHeader className="border-b border-rule px-6 py-4">
                <SheetTitle className="text-left">
                  <span className="flex items-center gap-2 font-serif text-xl font-bold text-ink">
                    <BookOpen className="h-5 w-5 text-teal" />
                    Ilham
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4 py-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <Separator className="my-3" />
                <SheetClose asChild>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/orders"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
                  >
                    <Package className="h-4 w-4" />
                    My Orders
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
                  >
                    <Heart className="h-4 w-4" />
                    Wishlist
                    {displayWishlistCount > 0 && (
                      <Badge variant="destructive" className="ml-auto text-[10px]">
                        {displayWishlistCount}
                      </Badge>
                    )}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openCart();
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-accent hover:text-ink"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Cart
                    {displayCartCount > 0 && (
                      <Badge variant="destructive" className="ml-auto text-[10px]">
                        {displayCartCount}
                      </Badge>
                    )}
                  </button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </m.header>
    </LazyMotion>
  );
}
