import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItemWithProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartItemProps {
  item: CartItemWithProduct;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateCartItem, removeCartItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || isUpdating) return;
    
    setIsUpdating(true);
    await updateCartItem(item.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    await removeCartItem(item.id);
    setIsUpdating(false);
  };

  const price = parseFloat(item.product.price);
  const totalPrice = price * item.quantity;

  return (
    <div className="py-6">
      <div className="flex items-start">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{item.product.name}</h3>
              <p className="ml-4">${totalPrice.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {item.product.category}
            </p>
          </div>

          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center mt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2 w-8 text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                disabled={isUpdating}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-primary hover:text-primary/80"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
      <Separator className="mt-6" />
    </div>
  );
};

export default CartItem;
