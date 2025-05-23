import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

const IngredientVelare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Velaré Radiance Crème Ingredients | Elixíe</title>
        <meta 
          name="description" 
          content="Discover the premium anti-aging botanicals in Elixíe's Velaré Radiance Crème. Learn about the luxurious blend of peptides, antioxidants, and botanical extracts."
        />
      </Helmet>

      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back to ingredients */}
          <div className="mb-8">
            <Link href="/ingredients">
              <a className="text-foreground/70 hover:text-foreground flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to all ingredients
              </a>
            </Link>
          </div>
          
          {/* Products Navigation */}
          <div className="mb-8 border-b border-border/20 pb-6">
            <h3 className="font-medium text-foreground mb-4">Browse Product Ingredients:</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/ingredients/rosee-eternelle">
                <a className="px-4 py-2 text-sm bg-background border border-border/40 hover:bg-[#f9f5f1]/50 transition-colors rounded-sm">
                  Elixíe Rosée Eternelle Serum
                </a>
              </Link>
              <Link href="/ingredients/terravita">
                <a className="px-4 py-2 text-sm bg-background border border-border/40 hover:bg-[#f9f5f1]/50 transition-colors rounded-sm">
                  Terra Vita Rejuvenating Mud Mask
                </a>
              </Link>
              <Link href="/ingredients/velare">
                <a className="px-4 py-2 text-sm bg-[#f9f5f1]/70 border border-foreground/20 font-medium transition-colors rounded-sm">
                  Velaré Radiance Crème
                </a>
              </Link>
            </div>
          </div>
          
          {/* Product Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="bg-[#f9f5f1] p-8 rounded-sm flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1601049544082-62ed7f7dca3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Velaré Radiance Crème" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="font-montserrat text-3xl md:text-4xl text-foreground mb-4">
                Velaré Radiance Crème
              </h1>
              <p className="text-foreground/70 text-lg mb-6">
                A meticulously crafted high-performance moisturizer designed to combat visible signs of aging while delivering exceptional hydration. This luxurious formula combines advanced peptides with rare botanical extracts to restore skin's youthful luminosity.
              </p>
              <div className="flex gap-4">
                <Link href="/products/4">
                  <a className="inline-block px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm">
                    View Product
                  </a>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Ingredients List */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat text-2xl text-foreground mb-6 text-center">
              Key Botanical Ingredients
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Ingredient Section 1 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Anti-Aging Actives</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Peptide Complex</h4>
                  <p className="text-foreground/70 mb-4">
                    A sophisticated blend of signal and carrier peptides that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Stimulates collagen and elastin production</li>
                    <li>Reduces the appearance of fine lines and wrinkles</li>
                    <li>Improves skin firmness and elasticity</li>
                    <li>Supports skin's natural repair process</li>
                    <li>Clinically proven to show visible results within 28 days</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Bakuchiol</h4>
                  <p className="text-foreground/70 mb-4">
                    A gentle plant-based retinol alternative that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Provides the same anti-aging benefits as retinol without irritation</li>
                    <li>Stimulates collagen production for firmer skin</li>
                    <li>Reduces hyperpigmentation and evens skin tone</li>
                    <li>Safe for daytime use and doesn't increase sun sensitivity</li>
                    <li>Suitable for even the most sensitive skin types</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 2 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Luxurious Botanical Oils</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Rosehip Oil – Nature's Timeless Elixir</h4>
                  <p className="text-foreground/70 mb-4">
                    Originating from the wild rose bushes nestled within the lush valleys of Chile and Europe, Rosehip Oil is a treasure revered since the time of ancient Egypt. Cleopatra herself relied on its mystical properties to maintain her legendary beauty.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Rich in natural retinol (Vitamin A), Vitamin C, and essential fatty acids</li>
                    <li>Actively promotes cellular regeneration and collagen production</li>
                    <li>Dramatically fades hyperpigmentation and restores skin's natural tone</li>
                    <li>Remarkably effective in diminishing wrinkles and fine lines</li>
                    <li>Ancient healing remedy with documented royal heritage</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Squalane – Mediterranean Youth Essence</h4>
                  <p className="text-foreground/70 mb-4">
                    This remarkable skin essence, traditionally derived from Mediterranean olives, sugarcane, and rice bran, has been praised throughout centuries as the Mediterranean secret for eternally youthful skin.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Mirrors the skin's natural oils for perfect harmony and balance</li>
                    <li>Seamlessly replenishes hydration and elasticity</li>
                    <li>Creates a refined softness without clogging pores</li>
                    <li>Enhances the lightweight, nurturing qualities of botanical oils</li>
                    <li>Luxurious sensorial experience with lasting hydration</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Jojoba Oil – Desert Gold for Flawless Skin</h4>
                  <p className="text-foreground/70 mb-4">
                    Extracted from the seeds of desert-dwelling jojoba plants native to North America, Jojoba Oil has long been the cherished beauty secret of Native American tribes, who revered it for its ability to moisturize and protect against harsh desert elements.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Rich source of vitamins E and B for cellular regeneration</li>
                    <li>Expertly balances skin's natural oil production</li>
                    <li>Reduces inflammation and accelerates skin healing</li>
                    <li>Unique synergy with other botanicals for enhanced effectiveness</li>
                    <li>Creates a balanced, mattifying effect for a refined appearance</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 3 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Brightening & Protective Botanicals</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Vitamin C (Tetrahexyldecyl Ascorbate)</h4>
                  <p className="text-foreground/70 mb-4">
                    A stable, oil-soluble form of vitamin C that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Penetrates deeply to brighten skin from within</li>
                    <li>Potent antioxidant that neutralizes free radicals</li>
                    <li>Inhibits melanin production to fade dark spots</li>
                    <li>Boosts collagen synthesis for firmer skin</li>
                    <li>More stable and less irritating than traditional Vitamin C</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Niacinamide (Vitamin B3)</h4>
                  <p className="text-foreground/70 mb-4">
                    A multi-beneficial ingredient that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Strengthens skin barrier function</li>
                    <li>Reduces hyperpigmentation and evens skin tone</li>
                    <li>Minimizes the appearance of enlarged pores</li>
                    <li>Regulates sebum production for balanced skin</li>
                    <li>Improves skin texture and reduces fine lines</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 4 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Unique Botanical Ingredients</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Snow Algae</h4>
                  <p className="text-foreground/70 mb-4">
                    A rare botanical that survives in extreme conditions:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Activates longevity genes in skin cells</li>
                    <li>Protects skin stem cell function</li>
                    <li>Increases skin's resistance to environmental stress</li>
                    <li>Improves cellular energy production for youthful skin</li>
                    <li>Clinically proven to reduce wrinkle depth by up to 25%</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Centella Asiatica (Gotu Kola)</h4>
                  <p className="text-foreground/70 mb-4">
                    An ancient healing herb with powerful skin benefits:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Contains triterpenes that boost collagen synthesis</li>
                    <li>Strengthens skin barrier and prevents moisture loss</li>
                    <li>Reduces inflammation and soothes irritated skin</li>
                    <li>Improves circulation and skin elasticity</li>
                    <li>Accelerates wound healing and skin regeneration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Full Ingredients List */}
            <div className="mb-16">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Complete Ingredients List</h3>
              <div className="bg-background border border-border/40 p-6 rounded-sm">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Aqua (Water), Caprylic/Capric Triglyceride, Glycerin, Coco-Caprylate/Caprate, Squalane, Cetearyl Alcohol, Cetearyl Olivate, Sorbitan Olivate, Bakuchiol, Tetrahexyldecyl Ascorbate, Niacinamide, Boswellia Serrata (Frankincense), Coenochloris Signiensis (Snow Algae), Centella Asiatica (Gotu Kola), Commiphora Myrrha (Myrrh), Helichrysum Italicum (Immortelle) Flower, Copper Tripeptide-1, Panthenol (Pro-Vitamin B5), Tocopherol (Vitamin E), Aloe Barbadensis Leaf Juice, Ceramide NP, Phytosterols, Phospholipids, Butyrospermum Parkii (Shea) Butter, Rosa Canina (Rosehip) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Xanthan Gum, Cetyl Alcohol, Caprylyl Glycol, Ethylhexylglycerin, Phenoxyethanol, Citric Acid.
                </p>
              </div>
            </div>
            
            {/* Formulation Philosophy */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Our Formulation Philosophy</h3>
              <p className="text-foreground/70 mb-6">
                Every Elixíe product is mindfully crafted in small batches to ensure the highest quality and potency of our botanicals. We never use parabens, synthetic fragrances, artificial colors, or harsh chemicals. Our ingredients are ethically sourced, cruelty-free, and selected to provide real benefits for your skin.
              </p>
              <Link href="/products/4">
                <a className="inline-block px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm">
                  Shop Velaré Radiance Crème
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientVelare;