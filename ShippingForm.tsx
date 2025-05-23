import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutShippingSchema, CheckoutShipping } from "@shared/schema";
import { useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShippingRate } from "@/types";

interface ShippingFormProps {
  defaultValues?: Partial<CheckoutShipping>;
  onSubmit: (data: CheckoutShipping) => void;
  onShippingMethodChange: (method: string, cost: string) => void;
}

const ShippingForm = ({
  defaultValues,
  onSubmit,
  onShippingMethodChange,
}: ShippingFormProps) => {
  const form = useForm<CheckoutShipping>({
    resolver: zodResolver(checkoutShippingSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      address: defaultValues?.address || "",
      apartment: defaultValues?.apartment || "",
      city: defaultValues?.city || "",
      state: defaultValues?.state || "",
      postalCode: defaultValues?.postalCode || "",
      country: defaultValues?.country || "US",
      shippingMethod: defaultValues?.shippingMethod || "",
    },
  });

  const { data: shippingMethods, isLoading } = useQuery({
    queryKey: ["/api/shipping-methods"],
    staleTime: Infinity,
  });

  // Update shipping cost when shipping method changes
  const watchShippingMethod = form.watch("shippingMethod");
  useEffect(() => {
    if (watchShippingMethod && shippingMethods) {
      const selectedMethod = shippingMethods.find(
        (method: ShippingRate) => method.id.toString() === watchShippingMethod
      );
      if (selectedMethod) {
        onShippingMethodChange(selectedMethod.name, selectedMethod.price);
      }
    }
  }, [watchShippingMethod, shippingMethods, onShippingMethodChange]);

  if (isLoading) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
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
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apartment, suite, etc." {...field} />
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
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Province</FormLabel>
                <FormControl>
                  <Input placeholder="State / Province" {...field} />
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
                <FormLabel>ZIP / Postal code</FormLabel>
                <FormControl>
                  <Input placeholder="ZIP / Postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-medium text-lg mb-4">Shipping Method</h4>
          <div className="space-y-3">
            {shippingMethods?.map((method: ShippingRate) => (
              <FormField
                key={method.id}
                control={form.control}
                name="shippingMethod"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                    <FormControl>
                      <input
                        type="radio"
                        className="h-4 w-4 text-primary focus:ring-primary"
                        checked={field.value === method.id.toString()}
                        onChange={() => field.onChange(method.id.toString())}
                      />
                    </FormControl>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <FormLabel className="font-medium">
                          {method.name}
                        </FormLabel>
                        <span className="font-bold">
                          ${parseFloat(method.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {method.description}
                        {method.estimatedDelivery && (
                          <span> • {method.estimatedDelivery}</span>
                        )}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button type="submit">Continue to Payment</Button>
        </div>
      </form>
    </Form>
  );
};

export default ShippingForm;
