import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <a className="block">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-[#f9f5f1] relative">
              <div className="absolute top-2 right-2 w-16 h-16">
                <img 
                  src="/assets/Dewdrop Cosmetics Logo no words.png" 
                  alt="Dewdrop Cosmetics" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full max-w-[200px] p-4 flex flex-col items-center">
                <p className="text-[#596b56] font-medium text-center">{product.name}</p>
                <div className="mt-2 text-xs text-center text-[#596b56]/80">
                  <p>Handcrafted Botanical Formula</p>
                </div>
              </div>
            </div>
          )}
          <div className="p-4">
            <h3 className="font-montserrat font-semibold text-lg mb-2 text-[#424242]">
              {product.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#424242]">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <Button
                size="sm"
                className="bg-[#4DD0E1] hover:bg-[#4DD0E1]/90 text-white"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
