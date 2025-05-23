import { useCart } from "@/hooks/useCart";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import { Loader2, ShoppingBag, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cart, isLoading } = useCart();
  const [_, navigate] = useLocation();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const subtotal = cart?.items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  ) || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-montserrat font-medium text-gray-900">
                    Shopping Cart
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !cart || cart.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <ShoppingBag className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="divide-y divide-gray-200">
                        {cart.items.map((item) => (
                          <li key={item.id}>
                            <CartItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {!isLoading && cart && cart.items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button 
                      className="w-full" 
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{" "}
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/80 p-0"
                        onClick={onClose}
                      >
                        Continue Shopping
                      </Button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
