import { Link } from "wouter";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-50 md:hidden">
      <div className="fixed inset-0 bg-black/10" onClick={onClose} />
      <div className="relative w-full max-w-xs bg-background p-6 h-full">
        <div className="flex items-center justify-end mb-8">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 space-y-6">
          <Link href="/" onClick={onClose} className="block py-2 text-foreground text-lg font-montserrat font-normal">
            Home
          </Link>
          
          <Link href="/products" onClick={onClose} className="block py-2 text-foreground text-lg font-montserrat font-normal">
            Products
          </Link>
          
          <Link href="/our-story" onClick={onClose} className="block py-2 text-foreground text-lg font-nunito font-semibold">
            Our Story
          </Link>
          
          <Link href="/ingredients" onClick={onClose} className="block py-2 text-foreground text-lg font-nunito font-semibold">
            Ingredient Index
          </Link>
          
          <Link href="/contact" onClick={onClose} className="block py-2 text-foreground text-lg font-nunito font-semibold">
            Contact
          </Link>
          
          <div className="pt-6 mt-6 border-t border-border">
            <Button variant="outline" className="w-full text-sm border-foreground/80 text-foreground" onClick={onClose}>
              <Link href="/products" className="w-full">
                Shop All
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
