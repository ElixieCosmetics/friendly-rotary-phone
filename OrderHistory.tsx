import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { OrderWithItems } from "@/types";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, PackageOpen, ExternalLink } from "lucide-react";

// Helper function for order status badge
const OrderStatusBadge = ({ status }: { status: string }) => {
  let variantClass = "";
  
  switch (status.toLowerCase()) {
    case "processing":
      variantClass = "bg-yellow-500 hover:bg-yellow-600";
      break;
    case "shipped":
      variantClass = "bg-blue-500 hover:bg-blue-600";
      break;
    case "delivered":
      variantClass = "bg-green-500 hover:bg-green-600";
      break;
    case "cancelled":
      variantClass = "bg-red-500 hover:bg-red-600";
      break;
    default:
      variantClass = "bg-gray-500 hover:bg-gray-600";
  }
  
  return (
    <Badge className={variantClass}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const OrderHistory = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  // Fetch order history
  const { data: orders, isLoading: ordersLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/user/orders"],
    enabled: isAuthenticated,
  });
  
  if (authLoading || ordersLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null; // Redirect handled by useEffect
  }
  
  return (
    <>
      <Helmet>
        <title>Order History | Elixíe</title>
        <meta 
          name="description" 
          content="View your order history and track your past purchases from Elixíe." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <h1 className="font-montserrat text-3xl text-foreground mb-8 text-center">Order History</h1>
          
          {!orders || orders.length === 0 ? (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>No Orders Yet</CardTitle>
                <CardDescription>
                  You haven't placed any orders yet. Start shopping to build your order history.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {orders.map((order) => (
                <Accordion 
                  key={order.id} 
                  type="single" 
                  collapsible 
                  className="bg-white border border-border/40 rounded-md overflow-hidden"
                >
                  <AccordionItem value={`order-${order.id}`} className="border-0">
                    <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex flex-col space-y-1">
                        <div className="font-medium">Order #{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.createdAt && (
                            order.createdAt instanceof Date 
                              ? format(order.createdAt, 'MMMM d, yyyy') 
                              : format(new Date(order.createdAt), 'MMMM d, yyyy')
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex space-x-2 items-center">
                          <span className="text-sm text-muted-foreground mr-2">Status:</span>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="text-sm mt-1 md:text-right">
                          Total: ${parseFloat(order.total).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <AccordionTrigger className="px-6 py-2 text-sm hover:no-underline">
                      View Details
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6">
                        {/* Order Items */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-center">Quantity</TableHead>
                              <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="flex items-center">
                                    {item.product?.imageUrl && (
                                      <div className="w-12 h-12 rounded mr-4 overflow-hidden">
                                        <img 
                                          src={item.product.imageUrl} 
                                          alt={item.product.name}
                                          className="w-full h-full object-cover" 
                                        />
                                      </div>
                                    )}
                                    <span className="font-medium">{item.product?.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">${parseFloat(item.price).toFixed(2)}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">
                                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        {/* Order Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Shipping Details</h3>
                            <div className="bg-background p-4 rounded text-sm">
                              <p className="mb-1">
                                <span className="font-medium">Address:</span> {order.shippingAddress}
                              </p>
                              <p className="mb-1">
                                <span className="font-medium">City:</span> {order.shippingCity}
                              </p>
                              <p className="mb-1">
                                <span className="font-medium">State:</span> {order.shippingState}
                              </p>
                              <p className="mb-1">
                                <span className="font-medium">Postal Code:</span> {order.shippingPostalCode}
                              </p>
                              <p className="mb-1">
                                <span className="font-medium">Country:</span> {order.shippingCountry}
                              </p>
                              <p className="mb-1">
                                <span className="font-medium">Shipping Method:</span> {order.shippingMethod}
                              </p>
                              {order.trackingNumber && (
                                <p className="flex items-center mt-3">
                                  <PackageOpen className="h-4 w-4 mr-2" />
                                  <span className="font-medium">Tracking #:</span>
                                  <span className="ml-1">{order.trackingNumber}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Order Summary</h3>
                            <div className="bg-background p-4 rounded">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>
                                    $
                                    {order.items
                                      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
                                      .toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Shipping:</span>
                                  <span>${parseFloat(order.shippingCost || "0").toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Tax:</span>
                                  <span>
                                    $
                                    {(
                                      parseFloat(order.total) -
                                      order.items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0) -
                                      parseFloat(order.shippingCost || "0")
                                    ).toFixed(2)}
                                  </span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                                  <span>Total:</span>
                                  <span>${parseFloat(order.total).toFixed(2)}</span>
                                </div>
                              </div>
                              
                              <div className="mt-6">
                                <p className="text-sm mb-2">
                                  <span className="font-medium">Payment Method:</span> {order.paymentMethod}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Order Status:</span>{" "}
                                  <OrderStatusBadge status={order.status} />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            asChild
                            className="flex items-center"
                          >
                            <Link href={`/order-confirmation/${order.id}`}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Complete Order
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;