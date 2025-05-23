import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutContactSchema, checkoutShippingSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import ShippingOptions from "@/components/checkout/ShippingOptions";
import PaymentMethods from "@/components/checkout/PaymentMethods";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

// Combined checkout form schema
const checkoutFormSchema = z.object({
  ...checkoutContactSchema.shape,
  ...checkoutShippingSchema.shape,
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const [_, setLocation] = useLocation();
  const [match] = useRoute("/checkout");
  const { toast } = useToast();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { cart, isLoading: isCartLoading } = useCart();
  const [activeStep, setActiveStep] = useState<"contact" | "shipping" | "payment">("contact");
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  // Redirect if not on checkout route
  useEffect(() => {
    if (!match) {
      setLocation("/checkout");
    }
  }, [match, setLocation]);

  // Initialize the form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: user?.email || "",
      phone: user?.phone || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      postalCode: user?.postalCode || "",
      country: user?.country || "United States",
      shippingMethod: "",
    },
  });

  // Calculate totals
  const subtotal = cart?.items.reduce((sum: number, item: any) => {
    return sum + (parseFloat(item.product?.price.toString() || "0") * item.quantity);
  }, 0) || 0;
  
  const total = subtotal + shippingCost;

  // Update form when user data is loaded
  useEffect(() => {
    if (user && !isAuthLoading) {
      form.setValue("email", user.email || "");
      form.setValue("phone", user.phone || "");
      form.setValue("firstName", user.firstName || "");
      form.setValue("lastName", user.lastName || "");
      form.setValue("address", user.address || "");
      form.setValue("city", user.city || "");
      form.setValue("state", user.state || "");
      form.setValue("postalCode", user.postalCode || "");
      form.setValue("country", user.country || "United States");
    }
  }, [user, isAuthLoading, form]);

  // Update shipping method in form when selected
  useEffect(() => {
    if (selectedShippingMethodId) {
      form.setValue("shippingMethod", selectedShippingMethodId);
    }
  }, [selectedShippingMethodId, form]);

  const handleSelectShippingMethod = (methodId: string, cost: number) => {
    setSelectedShippingMethodId(methodId);
    setShippingCost(cost);
  };

  const handleContactSubmit = (data: Partial<CheckoutFormValues>) => {
    if (form.formState.errors.email || form.formState.errors.phone) {
      return;
    }
    setActiveStep("shipping");
  };

  const handleShippingSubmit = (data: Partial<CheckoutFormValues>) => {
    if (
      form.formState.errors.firstName ||
      form.formState.errors.lastName ||
      form.formState.errors.address ||
      form.formState.errors.city ||
      form.formState.errors.state ||
      form.formState.errors.postalCode ||
      form.formState.errors.country ||
      form.formState.errors.shippingMethod
    ) {
      return;
    }
    setActiveStep("payment");
  };

  const handlePaymentSuccess = async (
    paymentMethod: string,
    paymentId: string,
    paymentDetails: any
  ) => {
    const formData = form.getValues();
    setProcessing(true);

    try {
      // Validate that we have everything needed for the order
      if (!cart || cart.items.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      if (!selectedShippingMethodId) {
        throw new Error("Please select a shipping method");
      }

      // Generate an order number for tracking
      const orderNumber = `ELIXIE-${Date.now().toString().slice(-6)}`;
      
      // Create the order with all necessary details
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id || null,
          status: "paid",
          total: total.toString(),
          shippingMethod: selectedShippingMethodId,
          shippingCost: shippingCost.toString(),
          shippingAddress: formData.address + (formData.apartment ? `, ${formData.apartment}` : ""),
          shippingCity: formData.city,
          shippingState: formData.state,
          shippingPostalCode: formData.postalCode,
          shippingCountry: formData.country,
          paymentMethod: paymentMethod,
          paymentId: paymentId,
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          trackingNumber: orderNumber,
          items: cart?.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product?.price || "0",
          })),
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderData = await orderResponse.json();

      // Clear the cart after successful order creation
      if (cart) {
        try {
          // Call the clearCart function from CartContext
          await fetch(`/api/cart/${cart.id}`, {
            method: "DELETE",
          });
          
          // Show success message
          toast({
            title: "Order Placed Successfully!",
            description: `Order #${orderData.id} has been confirmed. You will receive a confirmation email shortly.`,
            duration: 5000,
          });
          
          // Redirect to order confirmation page with a slight delay to allow toast to be seen
          setTimeout(() => {
            setLocation(`/order-confirmation/${orderData.id}`);
          }, 1500);
          
        } catch (cartError) {
          console.error("Failed to clear cart:", cartError);
          // Still redirect to order confirmation even if cart clearing fails
          setLocation(`/order-confirmation/${orderData.id}`);
        }
      } else {
        // Redirect immediately if there's no cart to clear
        setLocation(`/order-confirmation/${orderData.id}`);
      }
    } catch (error: any) {
      console.error("Order processing error:", error);
      toast({
        variant: "destructive",
        title: "Order Processing Failed",
        description: error.message || "There was an error processing your order. Please try again.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: error,
    });
  };

  if (isCartLoading || !cart || cart.items.length === 0) {
    return (
      <div className="container max-w-7xl py-16">
        <div className="text-center py-12">
          <h1 className="text-2xl font-montserrat mb-4">Your Cart is Empty</h1>
          <p className="mb-6 text-foreground/70">Add some products to your cart before checking out.</p>
          <Button onClick={() => setLocation("/products")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-12">
      <h1 className="text-3xl font-montserrat mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-sm mr-2">
                      1
                    </span>
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    We'll use these details to keep you informed about your purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={activeStep !== "contact" ? "opacity-50" : ""}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your@email.com" 
                                {...field} 
                                disabled={activeStep !== "contact" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(555) 555-5555" 
                                {...field} 
                                disabled={activeStep !== "contact" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  {activeStep === "contact" && (
                    <Button
                      onClick={() => handleContactSubmit(form.getValues())}
                      disabled={processing}
                    >
                      Continue to Shipping
                    </Button>
                  )}
                  {activeStep !== "contact" && (
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep("contact")}
                      disabled={processing}
                    >
                      Edit
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-sm mr-2">
                      2
                    </span>
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Enter your shipping address and select a shipping method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={activeStep !== "shipping" ? "opacity-50" : ""}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Street address" 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  disabled={activeStep !== "shipping" || processing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  disabled={activeStep !== "shipping" || processing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={activeStep !== "shipping" || processing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-6" />

                    <FormField
                      control={form.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem>
                          <ShippingOptions
                            onSelect={handleSelectShippingMethod}
                            selectedShippingMethodId={selectedShippingMethodId}
                            disabled={activeStep !== "shipping" || processing}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                  {activeStep === "shipping" && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep("contact")}
                        disabled={processing}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => handleShippingSubmit(form.getValues())}
                        disabled={!selectedShippingMethodId || processing}
                      >
                        Continue to Payment
                      </Button>
                    </>
                  )}
                  {activeStep !== "shipping" && activeStep !== "contact" && (
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep("shipping")}
                      disabled={processing}
                    >
                      Edit
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-sm mr-2">
                      3
                    </span>
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    All transactions are secure and encrypted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={activeStep !== "payment" ? "opacity-50" : ""}>
                    {activeStep === "payment" && (
                      <Elements stripe={stripePromise}>
                        <PaymentMethods
                          total={total}
                          onPaymentSuccess={handlePaymentSuccess}
                          onPaymentError={handlePaymentError}
                          disabled={processing}
                        />
                      </Elements>
                    )}
                    {activeStep !== "payment" && (
                      <div className="py-4 text-center text-foreground/70">
                        Complete the previous steps to proceed to payment
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  {activeStep === "payment" && (
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep("shipping")}
                      disabled={processing}
                    >
                      Back
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                >
                  {orderSummaryOpen ? "Hide Order Summary" : "Show Order Summary"}
                  <span className="text-right font-bold">${total.toFixed(2)}</span>
                </Button>
              </div>

              <div className={`space-y-4 ${orderSummaryOpen ? "" : "hidden lg:block"}`}>
                <div className="space-y-3">
                  {cart.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex">
                        <div className="w-12 h-12 border border-border rounded-sm overflow-hidden mr-3 bg-background/50">
                          {item.product?.imageUrl && (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{item.product?.name}</p>
                          <p className="text-foreground/70">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(
                          parseFloat(item.product?.price.toString() || "0") * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}