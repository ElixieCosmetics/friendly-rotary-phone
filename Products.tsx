import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Products = () => {
  const { category } = useParams();
  const [_, navigate] = useLocation();
  const [sortBy, setSortBy] = useState("featured");
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [loadingProducts, setLoadingProducts] = useState<number[]>([]);

  // Get all products or products by category
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: category
      ? [`/api/products/category/${category}`]
      : ["/api/products"],
    staleTime: Infinity,
  });

  // Sort products
  const sortedProducts = () => {
    if (!products) return [];

    // Create a copy of the products array
    let sorted = [...products];

    // Sort products
    if (sortBy === "priceLow") {
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "priceHigh") {
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "nameAZ") {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZA") {
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default to featured or any other sorting
      return sorted;
    }
  };

  const pageTitle = category
    ? `${category} Products | Elixíe`
    : "All Products | Elixíe";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={
            category
              ? `Shop our collection of premium ${category.toLowerCase()} products at Elixíe. Each formula is infused with potent botanicals and advanced skincare science.`
              : "Shop our full collection of premium botanical skincare products at Elixíe. Discover luxury formulations that transform your daily ritual."
          }
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-montserrat font-bold text-[#424242]">
            {category ? `${category} Products` : "All Products"}
          </h1>
          <p className="mt-2 text-gray-600">
            {category
              ? `Discover our premium ${category.toLowerCase()} collection.`
              : "Browse our full range of premium beauty products."}
          </p>
        </div>

        {/* Sorting Options */}
        <div className="mb-8">
          <div className="flex justify-end mb-6">
            <Select defaultValue="featured" onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="priceLow">Price: Low to High</SelectItem>
                <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                <SelectItem value="nameAZ">Name: A to Z</SelectItem>
                <SelectItem value="nameZA">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Display */}
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts().map((product) => (
                <div
                  key={product.id}
                  className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg"
                >
                  <a href={`/products/${product.id}`} className="block">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-montserrat font-semibold text-lg mb-2 text-[#424242]">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {product.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#424242]">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          className="bg-[#4DD0E1] hover:bg-[#4DD0E1]/90 text-white"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Prevent multiple clicks
                            if (loadingProducts.includes(product.id)) {
                              return;
                            }
                            
                            try {
                              setLoadingProducts(prev => [...prev, product.id]);
                              await addToCart(product.id, 1);
                              toast({
                                title: "Added to cart",
                                description: `${product.name} has been added to your cart`,
                              });
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to add product to cart",
                                variant: "destructive",
                              });
                              console.error("Error adding to cart:", error);
                            } finally {
                              setLoadingProducts(prev => 
                                prev.filter(id => id !== product.id)
                              );
                            }
                          }}
                          disabled={loadingProducts.includes(product.id)}
                        >
                          {loadingProducts.includes(product.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or browse all products.
              </p>
              <Button onClick={() => navigate("/products")}>
                View All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;