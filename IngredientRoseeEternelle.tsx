import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

const IngredientRoseeEternelle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Elixíe Rosée Eternelle Serum Ingredients | Elixíe</title>
        <meta 
          name="description" 
          content="Discover the premium botanical ingredients in Elixíe's Rosée Eternelle Serum. Learn about the unique blend of flower extracts and botanical actives for radiant skin." 
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
                <a className="px-4 py-2 text-sm bg-[#f9f5f1]/70 border border-foreground/20 font-medium transition-colors rounded-sm">
                  Elixíe Rosée Eternelle Serum
                </a>
              </Link>
              <Link href="/ingredients/terravita">
                <a className="px-4 py-2 text-sm bg-background border border-border/40 hover:bg-[#f9f5f1]/50 transition-colors rounded-sm">
                  Terra Vita Rejuvenating Mud Mask
                </a>
              </Link>
              <Link href="/ingredients/velare">
                <a className="px-4 py-2 text-sm bg-background border border-border/40 hover:bg-[#f9f5f1]/50 transition-colors rounded-sm">
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
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMHNlcnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&h=600" 
                  alt="Elixíe Rosée Eternelle Serum" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="font-montserrat text-3xl md:text-4xl text-foreground mb-4">
                Elixíe Rosée Eternelle Serum
              </h1>
              <p className="text-foreground/70 text-lg mb-6">
                An exquisitely formulated botanical infusion that hydrates, brightens, and revitalizes your complexion. 
                Handcrafted with carefully selected botanicals and the powerful moisture-retaining properties of hyaluronic acid.
              </p>
              <div className="flex gap-4">
                <Link href="/products/1">
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
                <h3 className="font-medium text-xl mb-4">Hydrating Actives</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Aloe Vera Leaf Juice</h4>
                  <p className="text-foreground/70 mb-4">
                    A botanical moisture powerhouse with exceptional skin benefits:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Rich in polysaccharides that deeply hydrate and retain moisture</li>
                    <li>Contains natural enzymes that gently exfoliate without irritation</li>
                    <li>Forms a protective barrier that shields skin from environmental stressors</li>
                    <li>Naturally anti-inflammatory to calm and soothe sensitive skin</li>
                    <li>Loaded with vitamins A, C, and E for antioxidant protection</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Glycerin</h4>
                  <p className="text-foreground/70 mb-4">
                    A naturally-derived humectant that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Draws moisture from the air into the skin</li>
                    <li>Creates a protective barrier against environmental stressors</li>
                    <li>Non-comedogenic and suitable for all skin types</li>
                    <li>Enhances the effectiveness of other hydrating ingredients</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 2 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Botanical Extracts</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Rose Petal Hydrosol</h4>
                  <p className="text-foreground/70 mb-4">
                    Steam-distilled from organic rose petals:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Rich in natural flavonoids that strengthen capillaries</li>
                    <li>Reduces redness and calms irritated skin</li>
                    <li>Provides gentle astringent properties to refine pores</li>
                    <li>Aromatherapeutic benefits create a luxurious ritual</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Hibiscus</h4>
                  <p className="text-foreground/70 mb-4">
                    Called "nature's Botox" for its remarkable effects:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Contains natural alpha-hydroxy acids for gentle exfoliation</li>
                    <li>Rich in anthocyanins that protect against free radical damage</li>
                    <li>Increases skin elasticity and firmness</li>
                    <li>Brightens complexion and enhances natural radiance</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 3 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Skin-Brightening Compounds</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-2">Niacinamide (Vitamin B3)</h4>
                  <p className="text-foreground/70 mb-4">
                    A powerhouse ingredient that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Strengthens the skin barrier function</li>
                    <li>Reduces the appearance of enlarged pores</li>
                    <li>Evens skin tone and diminishes dark spots</li>
                    <li>Regulates sebum production for balanced skin</li>
                    <li>Supports ceramide production for healthier skin</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Licorice Root</h4>
                  <p className="text-foreground/70 mb-4">
                    A botanical brightening agent that:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Contains glabridin, which inhibits tyrosinase activity</li>
                    <li>Reduces hyperpigmentation and evens skin tone</li>
                    <li>Provides anti-inflammatory benefits to calm skin</li>
                    <li>Rich in antioxidants that protect against environmental damage</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 4 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Rare Botanical Actives</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Gotu Kola</h4>
                  <p className="text-foreground/70 mb-4">
                    An ancient botanical prized for its skin benefits:
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Contains triterpenoid compounds that boost collagen production</li>
                    <li>Improves circulation and skin oxygenation</li>
                    <li>Strengthens skin and enhances barrier function</li>
                    <li>Promotes wound healing and tissue regeneration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Full Ingredients List */}
            <div className="mb-16">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Complete Ingredients List</h3>
              <div className="bg-background border border-border/40 p-6 rounded-sm">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Rosa Damascena (Rose) Flower Water, Aqua (Water), Glycerin, Niacinamide, Hibiscus Sabdariffa (Hibiscus) Flower, Glycyrrhiza Glabra (Licorice) Root, Centella Asiatica (Gotu Kola), Aloe Barbadensis Leaf Juice, Calendula Officinalis Flower, Lavandula Angustifolia (Lavender) Oil, Rosa Centifolia Flower, Boswellia Serrata (Frankincense), Commiphora Myrrha (Myrrh), Helichrysum Italicum Flower, Panthenol (Pro-Vitamin B5), Allantoin, Xanthan Gum, Citric Acid, Sodium Benzoate, Potassium Sorbate.
                </p>
              </div>
            </div>
            
            {/* Formulation Philosophy */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Our Formulation Philosophy</h3>
              <p className="text-foreground/70 mb-6">
                Every Elixíe product is mindfully crafted in small batches to ensure the highest quality and potency of our botanicals. We never use parabens, synthetic fragrances, artificial colors, or harsh chemicals. Our ingredients are ethically sourced, cruelty-free, and selected to provide real benefits for your skin.
              </p>
              <Link href="/products/1">
                <a className="inline-block px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm">
                  Shop Elixíe Rosée Eternelle Serum
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientRoseeEternelle;