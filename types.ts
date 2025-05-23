import { Product, Order, OrderItem } from "@shared/schema";

export interface OrderItemWithProduct extends OrderItem {
  product?: Product;
}

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[];
}

export interface CartItemWithProduct {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: string;
  product?: Product;
}

export interface CartWithItems {
  id: number;
  userId: number | null;
  sessionId: string | null;
  createdAt: Date | null;
  items: CartItemWithProduct[];
}