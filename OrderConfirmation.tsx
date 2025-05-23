import React, { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShippingMethod } from "@shared/schema";

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  product?: {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
  };
}

interface Order {
  id: number;
  userId: number | null;
  status: string;
  total: string;
  shippingMethod: string;
  shippingCost: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  trackingNumber: string | null;
  paymentMethod: string;
  paymentId: string;
  email: string;
  phone: string | null;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderConfirmation() {
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute("/order-confirmation/:id");
  const { toast } = useToast();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["/api/orders", params?.id],
    enabled: !!params?.id,
    retry: false,
  });

  const { data: shippingMethods } = useQuery<ShippingMethod[]>({
    queryKey: ["/api/shipping-methods"],
    enabled: !!order?.shippingMethod,
  });

  // Find the shipping method details
  useEffect(() => {
    if (order?.shippingMethod && shippingMethods) {
      const method = shippingMethods.find(
        (method) => method.id.toString() === order.shippingMethod
      );
      if (method) {
        setShippingMethod(method);
      }
    }
  }, [order, shippingMethods]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-16 flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-2 border-foreground rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container max-w-4xl py-16">
        <Card>
          <CardHeader>
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>
              We couldn't find the order you're looking for.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              There may have been a problem processing your order, or you might have entered an
              incorrect order number.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setLocation("/products")}>Continue Shopping</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate totals
  const subtotal = order.items.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  const shippingCost = order.shippingCost ? parseFloat(order.shippingCost) : 0;
  const total = parseFloat(order.total);

  return (
    <div className="container max-w-4xl py-16">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-800 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-montserrat mb-2">Order Confirmed</h1>
        <p className="text-foreground/70">
          Thank you for your purchase! A confirmation email has been sent to{" "}
          <span className="font-medium">{order.email}</span>.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>
            Order #{order.id} - Placed on {orderDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 border border-border rounded-sm overflow-hidden mr-4 bg-background/50">
                      {item.product?.imageUrl && (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product?.name}</h4>
                      <p className="text-sm text-foreground/70">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-foreground/70">
                        ${parseFloat(item.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Shipping Information</h3>
                <div className="space-y-1 text-foreground/70">
                  <p>{order.shippingAddress}</p>
                  <p>
                    {order.shippingCity}, {order.shippingState}{" "}
                    {order.shippingPostalCode}
                  </p>
                  <p>{order.shippingCountry}</p>
                </div>
                {shippingMethod && (
                  <div className="mt-4">
                    <p className="font-medium">{shippingMethod.name}</p>
                    <p className="text-sm text-foreground/70">
                      {shippingMethod.estimatedDelivery}
                    </p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="mt-4">
                    <p className="font-medium">Tracking Number</p>
                    <p className="text-foreground/70">{order.trackingNumber}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-3">Payment Information</h3>
                <div className="space-y-1">
                  <p className="capitalize">
                    <span className="text-foreground/70">Method: </span>
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="text-foreground/70">Total: </span>
                    <span className="font-medium">${parseFloat(order.total).toFixed(2)}</span>
                  </p>
                  <p>
                    <span className="text-foreground/70">Status: </span>
                    <span className="capitalize font-medium text-green-600">
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setLocation("/")}>
            Continue Shopping
          </Button>
          <Button onClick={() => setLocation("/orders")}>
            View All Orders
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}