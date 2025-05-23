import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Loader2 } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import { PaymentIntentResponse } from "@/types";
import { apiRequest } from "@/lib/queryClient";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_placeholder");

interface PaymentFormProps {
  totalAmount: string;
  onPaymentComplete: (paymentId: string, method: string) => void;
  shippingData: any;
}

const PaymentFormContent = ({
  totalAmount,
  onPaymentComplete,
  shippingData,
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe");
  const { toast } = useToast();
  const { clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          payment_method_data: {
            billing_details: {
              name: `${shippingData.firstName} ${shippingData.lastName}`,
              email: shippingData.email,
              phone: shippingData.phone,
              address: {
                line1: shippingData.address,
                line2: shippingData.apartment,
                city: shippingData.city,
                state: shippingData.state,
                postal_code: shippingData.postalCode,
                country: shippingData.country,
              },
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Payment failed",
          description: error.message || "Something went wrong with your payment",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast({
          title: "Payment successful",
          description: "Thank you for your purchase!",
        });
        onPaymentComplete(paymentIntent.id, "stripe");
        clearCart();
      }
    } catch (err: any) {
      toast({
        title: "Payment error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPalSuccess = (paymentId: string) => {
    onPaymentComplete(paymentId, "paypal");
    clearCart();
    toast({
      title: "Payment successful",
      description: "Thank you for your purchase!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <Button
          type="button"
          variant={paymentMethod === "stripe" ? "default" : "outline"}
          onClick={() => setPaymentMethod("stripe")}
          className="flex-1"
        >
          Credit Card
        </Button>
        <Button
          type="button"
          variant={paymentMethod === "paypal" ? "default" : "outline"}
          onClick={() => setPaymentMethod("paypal")}
          className="flex-1"
        >
          PayPal
        </Button>
      </div>

      {paymentMethod === "stripe" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button
            disabled={!stripe || isLoading}
            className="w-full"
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${parseFloat(totalAmount).toFixed(2)}`
            )}
          </Button>
        </form>
      ) : (
        <div className="mt-6">
          <PayPalButton
            amount={totalAmount}
            currency="USD"
            intent="CAPTURE"
          />
        </div>
      )}
    </div>
  );
};

const PaymentForm = ({
  totalAmount,
  onPaymentComplete,
  shippingData,
}: PaymentFormProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await apiRequest(
          "POST",
          "/api/create-payment-intent",
          { amount: totalAmount, currency: "usd" }
        );
        
        const data = await response.json() as PaymentIntentResponse;
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (parseFloat(totalAmount) > 0) {
      fetchPaymentIntent();
    }
  }, [totalAmount, toast]);

  if (!clientSecret) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#4DD0E1",
          },
        },
      }}
    >
      <PaymentFormContent
        totalAmount={totalAmount}
        onPaymentComplete={onPaymentComplete}
        shippingData={shippingData}
      />
    </Elements>
  );
};

export default PaymentForm;
