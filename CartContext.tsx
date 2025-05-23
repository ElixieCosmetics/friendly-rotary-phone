import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { apiRequest } from "@/lib/queryClient";
import { CartWithItems, CartItemWithProduct } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface CartContextProps {
  cart: CartWithItems | null;
  isLoading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextProps>({
  cart: null,
  isLoading: false,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeCartItem: async () => {},
  clearCart: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize cart on component mount
  useEffect(() => {
    const initializeCart = async () => {
      try {
        setIsLoading(true);

        // Get session ID from cookie or create a new cart
        const sessionId = getCookie("sessionId");
        
        let cartId;
        if (sessionId) {
          // Try to get existing cart by session ID
          const response = await apiRequest("POST", "/api/cart", { sessionId });
          const data = await response.json();
          cartId = data.id;
        } else {
          // Create a new cart
          const response = await apiRequest("POST", "/api/cart", {});
          const data = await response.json();
          cartId = data.id;
        }

        // Fetch cart with items
        await fetchCart(cartId);
      } catch (error) {
        console.error("Failed to initialize cart:", error);
        toast({
          title: "Error",
          description: "Failed to load your shopping cart",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, [toast]);

  // Fetch cart with items
  const fetchCart = async (cartId: number) => {
    try {
      const response = await apiRequest("GET", `/api/cart/${cartId}`, undefined);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      throw error;
    }
  };

  // Add item to cart
  const addToCart = async (productId: number, quantity: number) => {
    try {
      if (!cart) {
        throw new Error("Cart not initialized");
      }

      setIsLoading(true);
      const response = await apiRequest("POST", `/api/cart/${cart.id}/items`, {
        productId,
        quantity,
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Refresh cart data
      await fetchCart(cart.id);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId: number, quantity: number) => {
    try {
      if (!cart) {
        throw new Error("Cart not initialized");
      }

      setIsLoading(true);
      const response = await apiRequest("PUT", `/api/cart/${cart.id}/items/${itemId}`, {
        quantity,
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      // Refresh cart data
      await fetchCart(cart.id);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId: number) => {
    try {
      if (!cart) {
        throw new Error("Cart not initialized");
      }

      setIsLoading(true);
      const response = await apiRequest("DELETE", `/api/cart/${cart.id}/items/${itemId}`, undefined);

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Refresh cart data
      await fetchCart(cart.id);
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      if (!cart) return;

      setIsLoading(true);
      
      // Remove all items one by one
      const itemPromises = cart.items.map((item) => 
        apiRequest("DELETE", `/api/cart/${cart.id}/items/${item.id}`, undefined)
      );
      
      await Promise.all(itemPromises);
      
      // Refresh cart data
      await fetchCart(cart.id);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() || null : null;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to access cart context
export const useCart = () => useContext(CartContext);
