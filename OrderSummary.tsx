import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingBag } from "lucide-react";

interface OrderSummaryProps {
  shippingCost?: string;
  className?: string;
}

const OrderSummary = ({ shippingCost = "0", className = "" }: OrderSummaryProps) => {
  const { cart, isLoading } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart?.items) {
      const newSubtotal = cart.items.reduce(
        (sum, item) => 
          sum + parseFloat(item.product.price) * item.quantity,
        0
      );
      setSubtotal(newSubtotal);
      setTotal(newSubtotal + parseFloat(shippingCost || "0"));
    }
  }, [cart, shippingCost]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <ul className="-my-4 divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.id} className="py-4 flex">
                <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between text-sm font-medium">
                    <h3 className="text-gray-700">{item.product.name}</h3>
                    <p className="text-gray-700 ml-4">
                      ${parseFloat(item.product.price).toFixed(2)}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Qty {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Subtotal</p>
            <p className="text-gray-700 font-medium">
              ${subtotal.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Shipping</p>
            <p className="text-gray-700">
              {parseFloat(shippingCost) > 0
                ? `$${parseFloat(shippingCost).toFixed(2)}`
                : "Calculated at next step"}
            </p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-sm font-medium">
            <p className="text-gray-900">Total</p>
            <p className="text-[#424242]">${total.toFixed(2)} USD</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
