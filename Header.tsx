import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSidebar from "@/components/cart/CartSidebar";
import MobileMenu from "@/components/layout/MobileMenu";
import UserAccountButton from "@/components/layout/UserAccountButton";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const [location] = useLocation();

  const totalItems = cart?.items?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40">
      <nav className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/assets/elixie-logo.jpg" alt="Elixíe Cosmetics" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              <Link href="/our-story" className="font-nunito text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Our Story
              </Link>
              
              <Link href="/ingredients" className="font-nunito text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Ingredient Index
              </Link>
              
              <Link href="/blog" className="font-nunito text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              
              <Link href="/contact" className="font-nunito text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Shop button and Cart */}
          <div className="flex items-center space-x-4">
            <Link href="/products" className="hidden md:inline-block">
              <Button variant="outline" className="border-foreground/80 text-foreground font-normal text-sm">
                Shop
              </Button>
            </Link>
            
            <UserAccountButton />

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/80 hover:text-foreground relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground/80 hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
