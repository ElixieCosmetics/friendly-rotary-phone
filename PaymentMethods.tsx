import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PayPalButton from "@/components/PayPalButton";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodsProps {
  total: number;
  onPaymentSuccess: (
    paymentMethod: string,
    paymentId: string,
    paymentDetails?: any
  ) => void;
  onPaymentError: (error: string) => void;
  disabled?: boolean;
}

export default function PaymentMethods({
  total,
  onPaymentSuccess,
  onPaymentError,
  disabled = false,
}: PaymentMethodsProps) {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      onPaymentError("Stripe has not been properly initialized");
      return;
    }

    setProcessing(true);

    try {
      // Create a PaymentIntent on your server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount: total,
          metadata: {
            orderType: "cosmetics_purchase",
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = await response.json();
      
      // Display processing feedback to user
      toast({
        title: "Processing Payment",
        description: "Please do not refresh the page while we process your payment.",
      });

      // Confirm the payment with the card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card Element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // These details are filled automatically based on the card
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        toast({
          title: "Payment Successful",
          description: "Your order is being processed.",
        });
        onPaymentSuccess("stripe", paymentIntent.id, paymentIntent);
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error: any) {
      onPaymentError(error.message);
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message,
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePayPalSuccess = (details: any) => {
    onPaymentSuccess("paypal", details.id, details);
  };

  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="card">Credit Card</TabsTrigger>
        <TabsTrigger value="paypal">PayPal</TabsTrigger>
        <TabsTrigger value="apple-google-pay">Apple/Google Pay</TabsTrigger>
      </TabsList>
      
      <TabsContent value="card" className="pt-4">
        <form onSubmit={handleStripePayment}>
          <div className="mb-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={!stripe || processing || disabled}
            className="w-full bg-foreground text-background py-3 rounded-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </TabsContent>
      
      <TabsContent value="paypal" className="pt-4">
        <div className="flex justify-center">
          <PayPalButton
            amount={total.toString()}
            currency="USD"
            intent="capture"
            onSuccess={handlePayPalSuccess}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="apple-google-pay" className="pt-4">
        <div className="text-center py-4 text-foreground/70">
          <p>Apple Pay and Google Pay will be available soon!</p>
          <p className="text-sm mt-2">Please use Credit Card or PayPal for now.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}