import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { Helmet } from "react-helmet";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import ProductGrid from "@/components/products/ProductGrid";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [_, navigate] = useLocation();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Elixíe`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} | Elixíe`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageUrl} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full aspect-square flex flex-col items-center justify-center bg-[#f9f5f1] relative rounded-lg">
                <div className="absolute top-4 right-4 w-20 h-20">
                  <img 
                    src="/assets/Dewdrop Cosmetics Logo no words.png" 
                    alt="Elixíe" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-4/5 max-w-[300px] p-6 flex flex-col items-center">
                  <p className="text-[#596b56] font-medium text-xl text-center font-montserrat">{product.name}</p>
                  <div className="mt-4 text-sm text-center text-[#596b56]/80">
                    <p>Handcrafted with Botanical Ingredients</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <span className="text-sm text-[#4DD0E1] font-medium uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-[#424242] mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <StarRating rating={5} size={20} />
              <span className="ml-2 text-gray-500 text-sm">
                (24 reviews)
              </span>
            </div>

            <p className="text-2xl font-semibold text-[#424242] mb-6">
              ${parseFloat(product.price).toFixed(2)}
            </p>

            <p className="text-gray-600 mb-8">
              {product.description}
            </p>

            <div className="flex items-center mb-6">
              <div className="mr-6 flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2 w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="bg-[#4DD0E1] hover:bg-[#4DD0E1]/90 text-white px-8 flex-1"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShoppingBag className="mr-2 h-4 w-4" />
                )}
                Add to Cart
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Bio-Style Content */}
            <div className="space-y-6 text-sm">
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg text-[#596b56]">The Story</span>
                <p className="text-gray-600 leading-relaxed">
                  {product.name === "Elixíe Rosée Eternelle Serum" ? 
                    "Unlock radiant, petal-soft skin with Elixíe Rosée Eternelle Serum, an exquisitely formulated botanical infusion that hydrates, brightens, and revitalizes your complexion. Handcrafted with carefully selected botanicals and the powerful moisture-retaining properties of hyaluronic acid, this luxurious serum delivers unmatched rejuvenation with every application." 
                  : product.name === "Terra Vita Rejuvenating Mud Mask" ?
                    "Our Terra Vita Rejuvenating Mud Mask was inspired by ancient beauty rituals that harnessed the purifying power of natural clays and botanicals. We've enhanced this time-honored formula with modern ingredients that draw out impurities while nourishing your skin's natural barrier."
                  : product.name === "Velaré Radiance Crème" ?
                    "Introducing Velaré Radiance Crème—a meticulously crafted, high-performance moisturizer designed to combat signs of aging, diminish wrinkles, and provide a matte finish for a refined complexion. This luxurious formula harnesses the power of nature's most potent botanicals and scientifically backed actives to deliver transformative results."
                  : "Handcrafted in small batches, this formula represents our commitment to botanical skincare that delivers visible results through the power of nature's most effective ingredients."
                  }
                </p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg text-[#596b56]">Key Botanicals</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.name === "Elixíe Rosée Eternelle Serum" ? (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Licorice Root</h4>
                        <p className="text-xs text-gray-600">Contains glabridin, a powerful compound that brightens skin tone and reduces hyperpigmentation while calming inflammation, as documented in dermatological research.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Rose Petal Hydrosol</h4>
                        <p className="text-xs text-gray-600">Rich in natural flavonoids that strengthen capillaries and reduce redness, while providing gentle astringent properties that refine pores without drying the skin.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/hibiscus" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Hibiscus
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Known as "nature's Botox," hibiscus contains natural AHAs and rich anthocyanins that gently exfoliate while increasing skin elasticity and firmness.</p>
                      </div>

                    </>
                  ) : product.name === "Elixíe Rose Petal Scrub" ? (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/rose" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Rose Petals
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Gently exfoliate while delivering soothing compounds that reduce redness and calm irritation.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/jojoba" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Jojoba Beads
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Biodegradable spheres that provide gentle mechanical exfoliation without micro-tears or environmental harm.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/rosehip" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Rosehip Oil
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Rich in essential fatty acids and vitamin A that regenerate skin cells and improve texture.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/calendula" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Calendula Extract
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Soothes sensitivity and supports healthy skin barrier function during exfoliation.</p>
                      </div>
                    </>
                  ) : product.name === "Elixíe Miracle Nectar" ? (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/rosehip" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Rosehip Oil
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">A natural source of vitamin A (retinol) that promotes skin cell turnover and collagen production, effective for wrinkle reduction.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/licorice" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Licorice Root
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Naturally brightens and evens skin tone by reducing melanin production, effectively combating dark spots.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/gotu-kola" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Gotu Kola
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Rich in triterpenoids that boost collagen synthesis and improve circulation for enhanced skin firmness.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/calendula" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Calendula Flower
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Celebrated for its healing properties, accelerates cell regeneration, calms inflammation, and protects sensitive skin.</p>
                      </div>
                    </>
                  ) : product.name === "Terra Vita Rejuvenating Mud Mask" ? (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/clay" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Montmorillonite & Bentonite Clay
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">This powerful duo naturally draws out toxins, impurities, and excess oils from your pores, minimizing breakouts and leaving your skin exceptionally clean.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/gotu-kola" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Gotu Kola
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Known as the herb of longevity, it boosts collagen production, firms the skin, and visibly reduces the appearance of fine lines and wrinkles.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/turmeric" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Turmeric
                          </Link> & 
                          <Link href="/ingredients/hibiscus" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Hibiscus
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">This potent blend offers powerful antioxidants, combating dullness, dark spots, and uneven tone, leaving your skin visibly brighter and more even-toned.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/honeybush" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Honeybush
                          </Link> & 
                          <Link href="/ingredients/rose" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Rose
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Work synergistically to soothe inflammation, deeply hydrate, and accelerate the skin's natural healing process, ideal for all skin types.</p>
                      </div>
                    </>
                  ) : product.name === "Velaré Radiance Crème" ? (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/rosehip-oil" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Rosehip Oil
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">A natural source of vitamin A (retinol) that promotes skin cell turnover and collagen production, effectively reducing fine lines and wrinkles.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/frankincense" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Frankincense
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Provides powerful antioxidant protection while toning and tightening skin for a more refined appearance.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/myrrh" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Myrrh
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Rich in antioxidants that help preserve skin's youthful appearance while soothing and healing dry or chapped skin.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/helichrysum" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Helicrysium
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Known as "Immortelle," this precious botanical reduces inflammation, promotes cellular regeneration, and helps fade hyperpigmentation.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/botanical-extract" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Botanical Extract 1
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Carefully selected natural ingredient that provides specific benefits for skin health and appearance.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/botanical-extract" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Botanical Extract 2
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Carefully selected natural ingredient that provides specific benefits for skin health and appearance.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/botanical-extract" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Botanical Extract 3
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Carefully selected natural ingredient that provides specific benefits for skin health and appearance.</p>
                      </div>
                      <div className="bg-[#f9f5f1]/70 p-3 rounded-md">
                        <h4 className="font-medium mb-1">
                          <Link href="/ingredients/botanical-extract" className="text-[#596b56] hover:text-[#7d9277] underline-offset-4 hover:underline transition-all">
                            Botanical Extract 4
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-600">Carefully selected natural ingredient that provides specific benefits for skin health and appearance.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>


              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg text-[#596b56]">How to Use</span>
                <div className="bg-[#f9f5f1]/70 p-4 rounded-md">
                  {product.name === "Elixíe Rosée Eternelle Serum" ? (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>Begin with freshly cleansed skin</li>
                      <li>Dispense a pea-sized amount of the gel-like serum onto fingertips</li>
                      <li>Apply to face and neck using gentle upward motions</li>
                      <li>Allow to absorb for 30-60 seconds</li>
                      <li>Follow with moisturizer to seal in active ingredients</li>
                      <li>Use morning and evening for optimal results</li>
                      <li>Can be layered with other serums (apply thinnest consistency first)</li>
                    </ol>
                  ) : product.name === "Rose Petal Exfoliant" ? (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>Apply to dampened skin in gentle circular motions</li>
                      <li>Focus on areas with congestion or rough texture</li>
                      <li>Massage for 60 seconds, avoiding eye area</li>
                      <li>Rinse thoroughly with lukewarm water</li>
                      <li>Use 1-2 times weekly, followed by Elixíe Rosée Eternelle Serum</li>
                    </ol>
                  ) : product.name === "Velaré Radiance Crème" ? (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>Apply 2-3 drops to cleansed, toned skin in the evening</li>
                      <li>Gently press into skin, focusing on areas of concern</li>
                      <li>Allow to absorb fully before applying night cream</li>
                      <li>Use 3-4 times weekly, gradually increasing to nightly use</li>
                      <li>May be used as a targeted treatment or full-face application</li>
                    </ol>
                  ) : product.name === "Terra Vita Rejuvenating Mud Mask" ? (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>Begin with freshly cleansed skin to maximize absorption</li>
                      <li>Using the spatula provided, apply a generous, even layer to face and neck, avoiding the eye area</li>
                      <li>Allow the mask to work for 15-20 minutes (until partially dry but still slightly tacky)</li>
                      <li>For enhanced detoxification, mist face with water halfway through to reactivate the clays</li>
                      <li>Rinse thoroughly with lukewarm water using gentle circular motions</li>
                      <li>Follow with Velaré Radiance Crème to lock in benefits</li>
                      <li>Use 1-2 times weekly for optimal results</li>
                    </ol>
                  ) : product.name === "Velaré Radiance Crème" ? (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>After cleansing and applying serums, take a pearl-sized amount of Velaré Radiance Crème</li>
                      <li>Gently warm the product between your fingertips to activate the botanicals</li>
                      <li>Apply to face, neck, and décolletage using upward, outward motions</li>
                      <li>Pay special attention to areas with fine lines or uneven texture</li>
                      <li>Use morning and evening for optimal anti-aging benefits</li>
                      <li>In the morning, follow with sunscreen for enhanced protection</li>
                      <li>For intensified results, use after Terra Vita Rejuvenating Mud Mask once weekly</li>
                    </ol>
                  ) : (
                    <ol className="list-decimal pl-4 space-y-2 text-gray-600">
                      <li>Apply to clean skin using gentle, upward strokes</li>
                      <li>Use morning and evening as part of your skincare routine</li>
                      <li>Allow product to fully absorb before applying additional products</li>
                      <li>For best results, use consistently as part of your Elixíe regimen</li>
                    </ol>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <span className="font-semibold text-lg text-[#596b56]">Our Promise</span>
                <div className="bg-[#f9f5f1]/70 p-4 rounded-md flex space-x-4 items-center">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2">All Elixíe products are:</p>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                      <li>Created with ancient botanical formulations</li>
                      <li>Ethically harvested and responsibly sourced</li>
                      <li>Free from synthetic additives and harmful chemicals</li>
                      <li>Infused with rare plant extracts from pristine environments</li>
                      <li>Housed in sustainable, eco-conscious packaging</li>
                    </ul>
                  </div>
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src="/assets/Elixie Cosmetics Logo no words.png" 
                      alt="Elixíe" 
                      className="w-full h-full object-contain opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center font-montserrat text-[#424242]">
            You May Also Like
          </h2>
          <ProductGrid category={product.category} limit={4} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
