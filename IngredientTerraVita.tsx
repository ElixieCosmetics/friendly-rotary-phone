import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

const IngredientTerraVita = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terra Vita Rejuvenating Mud Mask Ingredients | Elixíe</title>
        <meta 
          name="description" 
          content="Discover the premium mineral clays and botanical extracts in Elixíe's Terra Vita Rejuvenating Mud Mask. Learn about the purifying and rejuvenating ingredients."
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
                <a className="px-4 py-2 text-sm bg-[#f9f5f1]/70 border border-foreground/20 font-medium transition-colors rounded-sm">
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
                  src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Terra Vita Rejuvenating Mud Mask" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="font-montserrat text-3xl md:text-4xl text-foreground mb-4">
                Terra Vita Rejuvenating Mud Mask
              </h1>
              <p className="text-foreground/70 text-lg mb-6">
                Experience the unparalleled purifying and rejuvenating power of nature with this expertly crafted blend of botanical extracts and mineral-rich clays, designed to renew your skin's vitality, brightness, and youthful glow.
              </p>
              <div className="flex gap-4">
                <Link href="/products/3">
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
                <h3 className="font-medium text-xl mb-4">Earth's Purifying Power</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Montmorillonite & Bentonite Clay</h4>
                  <p className="text-foreground/70 mb-4">
                    Harvested from mineral-rich volcanic soils in France and North America, these clays are nature's deep-cleansing treasures. Used by Indigenous cultures and ancient healers for purification.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Unparalleled ability to absorb toxins and draw out impurities</li>
                    <li>Delivers essential trace minerals like magnesium, silica, and calcium</li>
                    <li>Supports skin regeneration and overall skin health</li>
                    <li>Creates a gentle microcirculation effect when drying</li>
                    <li>Forms the potent foundation of Terra Vita's transformative properties</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 2 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">The South African Healer</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Honeybush</h4>
                  <p className="text-foreground/70 mb-4">
                    Native to the coastal mountains of South Africa, Honeybush is a sun-kissed botanical long cherished for its calming, antioxidant-rich properties. Traditionally consumed as a sweet, soothing tea.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Brimming with polyphenols and flavonoids that neutralize free radicals</li>
                    <li>Soothes irritation and calms reactive skin</li>
                    <li>Supports skin elasticity and firmness</li>
                    <li>Gently cocoons the skin in comfort</li>
                    <li>Ideal for complexions needing a break from harsh treatments</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 3 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Golden Glow of Ayurveda</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Turmeric</h4>
                  <p className="text-foreground/70 mb-4">
                    Harvested from the ancient soils of India and Southeast Asia, Turmeric has glowed at the heart of Ayurvedic rituals for over 4,000 years. Used in pre-wedding beauty ceremonies and royal skin treatments.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Contains Curcumin, a powerful bioactive compound</li>
                    <li>Reduces inflammation and calms blemishes</li>
                    <li>Corrects uneven tone by gently fading hyperpigmentation</li>
                    <li>Enhances skin's natural glow and radiance</li>
                    <li>Pairs with Hibiscus and Honeybush for maximum effectiveness</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 4 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">The Herb of Longevity</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Gotu Kola</h4>
                  <p className="text-foreground/70 mb-4">
                    Revered in both Traditional Chinese Medicine and Ayurveda, Gotu Kola grows in tropical marshlands, where its delicate leaves belie its remarkable strength. Ancient sages used it to enhance memory, heal wounds, and extend life.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Rich in triterpenoids and asiaticosides that boost collagen production</li>
                    <li>Repairs damaged tissue and tightens slack skin</li>
                    <li>Stimulates circulation and cellular regeneration</li>
                    <li>Complements the purifying power of clay</li>
                    <li>Restores skin's youthful appearance</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 5 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">The Natural Lifting Flower</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Hibiscus</h4>
                  <p className="text-foreground/70 mb-4">
                    Often called the "Botox plant," Hibiscus is more than a tropical bloom—it's a symbol of timeless beauty. Used in ancient Egyptian and Polynesian beauty rituals, this scarlet flower delivers natural AHAs that gently exfoliate.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Natural alpha hydroxy acids that resurface the skin</li>
                    <li>High antioxidant content combats skin-aging free radicals</li>
                    <li>Anthocyanins promote elasticity and reduce inflammation</li>
                    <li>Works alongside Turmeric and Rose to refine skin texture</li>
                    <li>Creates a natural "lifting" effect for more sculpted appearance</li>
                  </ul>
                </div>
              </div>
              
              {/* Ingredient Section 6 */}
              <div className="bg-background border border-border/40 p-8 rounded-sm">
                <h3 className="font-medium text-xl mb-4">Queen of Skin Soothers</h3>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Rose Petal Powder</h4>
                  <p className="text-foreground/70 mb-4">
                    Hand-harvested from the fragrant Rosa Damascena and Rosa Centifolia blossoms of Morocco and India, rose petals have been the hallmark of luxury skincare since the days of Cleopatra and Persian queens.
                  </p>
                  <ul className="list-disc pl-5 text-foreground/70 space-y-2">
                    <li>Natural oils, vitamins, and polyphenols soothe and tone the skin</li>
                    <li>Reduces redness and balances the skin's pH</li>
                    <li>Provides gentle restoration to stressed or sensitive skin</li>
                    <li>Harmonizes with clay minerals for a holistic treatment</li>
                    <li>Imparts a subtle floral elegance to the sensorial experience</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Full Ingredients List */}
            <div className="mb-16">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Complete Ingredients List</h3>
              <div className="bg-background border border-border/40 p-6 rounded-sm">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Aqua (Water), Montmorillonite Clay, Bentonite Clay, Kaolin, Glycerin, Cyclicalumina (White Clay), Glyceryl Stearate SE, Cyclopia Genistoides (Honeybush), Hibiscus Sabdariffa (Hibiscus) Flower, Curcuma Longa (Turmeric) Root, Centella Asiatica (Gotu Kola), Rosa Damascena (Rose) Flower Powder, Aloe Barbadensis Leaf Juice, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Tocopherol (Vitamin E), Panthenol (Pro-Vitamin B5), Citrus Sinensis (Sweet Orange) Oil, Lavandula Angustifolia (Lavender) Oil, Santalum Album (Sandalwood) Oil, Cananga Odorata (Ylang Ylang) Flower Oil, Xanthan Gum, Sodium Phytate, Citric Acid, Potassium Sorbate, Sodium Benzoate.
                </p>
              </div>
            </div>
            
            {/* Formulation Philosophy */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="font-montserrat text-xl text-foreground mb-4">Our Formulation Philosophy</h3>
              <p className="text-foreground/70 mb-6">
                Every Elixíe product is mindfully crafted in small batches to ensure the highest quality and potency of our botanicals. We never use parabens, synthetic fragrances, artificial colors, or harsh chemicals. Our ingredients are ethically sourced, cruelty-free, and selected to provide real benefits for your skin.
              </p>
              <Link href="/products/3">
                <a className="inline-block px-6 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm">
                  Shop Terra Vita Rejuvenating Mud Mask
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientTerraVita;