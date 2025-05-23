import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  category?: string;
  featured?: boolean;
  limit?: number;
}

const ProductGrid = ({ category, featured, limit }: ProductGridProps) => {
  const queryKey = featured
    ? ["/api/products/featured"]
    : category
    ? [`/api/products/category/${category}`]
    : ["/api/products"];

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey,
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
