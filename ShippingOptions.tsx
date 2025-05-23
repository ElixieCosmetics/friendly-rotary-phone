import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShippingMethod } from "@shared/schema";

interface ShippingOptionsProps {
  onSelect: (shippingMethodId: string, cost: number) => void;
  selectedShippingMethodId?: string;
  disabled?: boolean;
}

export default function ShippingOptions({
  onSelect,
  selectedShippingMethodId,
  disabled = false,
}: ShippingOptionsProps) {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShippingMethods() {
      try {
        setLoading(true);
        const response = await fetch("/api/shipping-methods");
        if (!response.ok) {
          throw new Error("Failed to load shipping methods");
        }
        const data = await response.json();
        setShippingMethods(data);
        
        // Auto-select the first shipping method if none is selected
        if (!selectedShippingMethodId && data.length > 0) {
          onSelect(data[0].id.toString(), parseFloat(data[0].price.toString()));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShippingMethods();
  }, []);

  const handleShippingMethodChange = (value: string) => {
    const selectedMethod = shippingMethods.find(
      (method) => method.id.toString() === value
    );
    if (selectedMethod) {
      onSelect(value, parseFloat(selectedMethod.price.toString()));
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="animate-spin h-5 w-5 border-2 border-foreground rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-destructive text-center">
        <p>Error loading shipping options: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Shipping Options</h3>
      <RadioGroup
        value={selectedShippingMethodId}
        onValueChange={handleShippingMethodChange}
        disabled={disabled}
      >
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border border-border rounded-sm mb-2 hover:bg-background/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value={method.id.toString()} id={`shipping-${method.id}`} />
              <div>
                <Label htmlFor={`shipping-${method.id}`} className="font-medium cursor-pointer">
                  {method.name}
                </Label>
                <p className="text-foreground/70 text-sm">{method.estimatedDelivery}</p>
              </div>
            </div>
            <div className="text-foreground font-medium">${parseFloat(method.price.toString()).toFixed(2)}</div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}