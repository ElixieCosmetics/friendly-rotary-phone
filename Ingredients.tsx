import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import bakuchiolImage from "@assets/Bakuchoil.png";
import frankincenseImage from "@assets/frankincense.png";
import myrrhImage from "@assets/myrrh.png";
import hibiscusImage from "@assets/Hibiscus.png";
import helichrysumImage from "@assets/Helichrysum.png";
import rosehipImage from "@assets/Rosehip.png";
import jojobaImage from "@assets/jojoba.png";
import honeybushImage from "@assets/Honeybush.png";
import turmericImage from "@assets/Turmeric.png";
import gotukolaImage from "@assets/Gotukola.png";
import montmorilloniteImage from "@assets/Montmorillonite clay.png";
import bentoniteImage from "@assets/Bentonite Clay.png";
import roseImage from "@assets/Rose.png";
import licoriceImage from "@assets/Licorice Root.png";
import lavenderImage from "@assets/Lavender.png";
import calendulaImage from "@assets/Calendula.png";
import aloeImage from "@assets/Aloe Vera.png";
import squalaneImage from "@assets/squalane.png";

const Ingredients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");

  const ingredientCategories = [
    { id: "all", name: "All Ingredients" },
    { id: "botanical", name: "Botanical Extracts" },
    { id: "oils", name: "Plant Oils" },
    { id: "clays", name: "Clays & Minerals" },
    { id: "actives", name: "Active Compounds" }
  ];

  const ingredients = [
    {
      id: 1,
      name: "Bakuchiol",
      category: "oils",
      origin: "Derived from the seeds of Psoralea corylifolia, native to India",
      description: "A sacred Ayurvedic herb used for skin disorders and rejuvenation. Derived from the seeds of Psoralea corylifolia, Bakuchiol has been shown to deliver the anti-aging benefits of retinol without the irritation. It's a hero of Ayurvedic healing, used for centuries to treat skin conditions and improve tone.",
      benefits: ["A natural alternative to retinol", "Reduces wrinkles and stimulates collagen", "Improves pigmentation without causing irritation", "Non-irritating and gentle on sensitive skin", "Safe for use during pregnancy"],
      foundIn: ["Velaré Radiance Crème"]
    },
    {
      id: 21,
      name: "Frankincense",
      category: "botanical",
      origin: "Boswellia trees of East Africa and Arabian Peninsula",
      description: "Revered since ancient times for its luxurious aroma and potent healing properties, Frankincense is the precious resin from Boswellia trees. Used in traditional medicine across cultures, it contains powerful boswellic acids that protect skin cells, reduce inflammation, and rejuvenate aging skin with remarkable efficacy.",
      benefits: ["Natural astringent that tones and tightens skin", "Powerful anti-inflammatory properties", "Accelerates cellular turnover for renewed radiance", "Minimizes the appearance of scars and stretch marks", "Provides potent antioxidant protection"],
      foundIn: ["Velaré Radiance Crème"]
    },
    {
      id: 22,
      name: "Myrrh",
      category: "botanical",
      origin: "Commiphora trees of Northeast Africa and Middle East",
      description: "This ancient aromatic resin has been treasured for millennia across civilizations from Egypt to China. Extracted from the Commiphora tree, Myrrh offers remarkable healing capabilities through its rich concentration of terpenoids and sesquiterpenes that revitalize aging skin, accelerate healing, and fortify the skin's natural barrier.",
      benefits: ["Promotes skin elasticity and firmness", "Accelerates wound healing and tissue repair", "Offers potent antioxidant protection", "Soothes dry, chapped skin conditions", "Creates a protective barrier against environmental damage"],
      foundIn: ["Velaré Radiance Crème"]
    },


    {
      id: 26,
      name: "Hibiscus",
      category: "botanical",
      origin: "Tropical regions worldwide including Africa and Southeast Asia",
      description: "Often called 'nature's Botox,' hibiscus is rich in natural alpha hydroxy acids (AHAs) and anthocyanins that gently exfoliate while increasing skin elasticity. Studies published in the Journal of Ethnopharmacology confirm its remarkable ability to inhibit elastase, the enzyme that breaks down elastin in our skin.",
      benefits: ["Contains natural AHAs for gentle exfoliation", "Rich in anthocyanins that increase skin elasticity", "Promotes cellular turnover for renewed radiance", "Helps maintain skin firmness and structure", "Visibly improves skin texture and tone"],
      foundIn: ["Elixíe Rosée Eternelle Serum"]
    },
    {
      id: 23,
      name: "Helichrysum",
      category: "botanical",
      origin: "Mediterranean region and North Africa",
      description: "Known as 'Immortelle' or 'Everlasting,' this golden flowering plant earned its name from its remarkable ability to retain its vibrant color even after being cut. The precious essential oil extracted from Helichrysum contains unique compounds that reduce inflammation, promote cellular regeneration, and fade discoloration for truly ageless skin.",
      benefits: ["Reduces appearance of scars and dark spots", "Powerful anti-inflammatory properties", "Protects skin cells from oxidative damage", "Promotes microcirculation for enhanced radiance", "Balances skin's natural oil production"],
      foundIn: ["Velaré Radiance Crème"]
    },
    {
      id: 3,
      name: "Rosehip",
      category: "oils",
      origin: "Wild-harvested from the seeds of Rosa canina and Rosa rubiginosa, primarily in Chile",
      description: "Used by Indigenous people of the Andes to treat burns and scars, Rosehip Oil is harvested from wild rose bushes. Its potent concentration of vitamins A and C, along with essential fatty acids, helps to stimulate collagen, reduce fine lines, fade hyperpigmentation, and restore elasticity without clogging pores.",
      benefits: ["Packed with vitamins A and C and essential fatty acids", "Supports collagen production", "Fades discoloration and reduces scarring", "Nourishes deeply without clogging pores", "Improves skin tone and texture"],
      foundIn: ["Velaré Radiance Crème"]
    },
    {
      id: 4,
      name: "Jojoba",
      category: "oils",
      origin: "Indigenous to the Sonoran Desert of North America",
      description: "Used by Native American tribes to heal wounds and protect skin, Jojoba Oil is harvested from the resilient jojoba shrub of the Sonoran Desert. Nearly identical to human sebum, it absorbs effortlessly while balancing oil production, calming inflammation, and providing a soft, silky finish without clogging pores.",
      benefits: ["Matches human sebum almost exactly, making it incredibly absorbable", "Balances oil production naturally", "Soothes inflammation and calms irritated skin", "Prevents clogged pores while moisturizing", "Creates a protective barrier without feeling greasy"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask", "Velaré Radiance Crème"]
    },

    {
      id: 6,
      name: "Honeybush",
      category: "botanical",
      origin: "Eastern and Western Cape regions of South Africa",
      description: "Native to the coastal mountains of South Africa, Honeybush is a sun-kissed botanical long cherished for its calming, antioxidant-rich properties. Traditionally brewed as a calming tea by Indigenous peoples and used to treat inflammation and dry skin, its natural sweetness makes it especially gentle and nourishing for sensitive or mature skin.",
      benefits: ["Rich in antioxidants like xanthones and flavanones", "Protects against oxidative stress", "Soothes inflammation and calms reactive skin", "Improves skin elasticity and firmness", "Ideal for sensitive and mature skin types"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask"]
    },
    {
      id: 7,
      name: "Turmeric",
      category: "botanical",
      origin: "Indigenous to India and Southeast Asia",
      description: "A sacred plant in Ayurvedic and Southeast Asian beauty rituals, turmeric has been used to cleanse and brighten skin before ceremonies for thousands of years. Harvested from the ancient soils of India and Southeast Asia, its warm golden hue represents radiance, purification, and rejuvenation. The active compound, Curcumin, delivers powerful skincare benefits.",
      benefits: ["Powerful anti-inflammatory and antioxidant properties", "Evens skin tone and fades dark spots", "Helps calm acne-prone skin", "Reveals a more radiant and even complexion", "Controls excess oil production"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask"]
    },
    {
      id: 8,
      name: "Gotu Kola",
      category: "botanical",
      origin: "Grows wild in India, Sri Lanka, and parts of Southeast Asia",
      description: "A staple in Ayurvedic medicine and Chinese healing traditions for improving circulation and healing wounds. Revered by ancient sages, Gotu Kola grows in tropical marshlands, where its delicate leaves belie its remarkable strength. Its powerful regenerative properties make it ideal for mature, stressed, or compromised skin needing renewal.",
      benefits: ["Stimulates collagen synthesis", "Reduces scarring and improves skin firmness", "Promotes overall skin resilience and elasticity", "Improves circulation and cellular regeneration", "Strengthens skin barrier function"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask", "Velaré Radiance Crème"]
    },
    {
      id: 9,
      name: "Montmorillonite Clay",
      category: "clays",
      origin: "Quarried in France and known for its high mineral content",
      description: "Used in Roman baths and traditional European detox treatments, Montmorillonite clay is nature's deep-cleansing treasure. Harvested from mineral-rich volcanic soils in France, this clay has unparalleled ability to absorb toxins, draw out impurities, and refine skin texture while nourishing with essential minerals.",
      benefits: ["Gently draws out impurities", "Refines pores and improves texture", "Nourishes the skin with calcium, magnesium, and silica", "Stimulates circulation for enhanced radiance", "Balances oil production"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask"]
    },
    {
      id: 10,
      name: "Bentonite Clay",
      category: "clays",
      origin: "Formed from volcanic ash, commonly found in the U.S. and India",
      description: "Used in Native American and Ayurvedic healing masks, Bentonite clay is formed from volcanic ash with powerful purifying properties. It has a strong negative ionic charge that draws positively charged toxins from the skin like a magnet, effectively detoxifying and clarifying the complexion.",
      benefits: ["Absorbs toxins and excess oil", "Calms inflammation and soothes irritation", "Promotes a clearer, smoother complexion", "Reduces appearance of pores", "Contains minerals that nourish skin"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask"]
    },

    {
      id: 12,
      name: "Rose",
      category: "botanical",
      origin: "Derived from Rosa damascena and Rosa centifolia, cultivated across Persia, Morocco, and India",
      description: "Used in ancient Egyptian, Roman, and Mughal beauty rituals for softening and perfuming the skin. Hand-harvested from the fragrant Rosa Damascena and Rosa Centifolia blossoms, rose petals have been the hallmark of luxury skincare since the days of Cleopatra and Persian queens.",
      benefits: ["Rich in vitamin C, tannins, and flavonoids", "Balances pH and calms irritation", "Imparts a natural glow to the skin", "Hydrates while reducing inflammation", "Perfect for sensitive and delicate skin"],
      foundIn: ["Terra Vita Rejuvenating Mud Mask"]
    },
    {
      id: 13,
      name: "Licorice",
      category: "botanical",
      origin: "Native to Southern Europe and Asia",
      description: "Used in traditional Chinese and Middle Eastern skincare for brightening and reducing inflammation. A beloved botanical that has been used since ancient times to calm the skin and brighten dull complexions. Its key active compound, glabridin, inhibits melanin production, helping to fade dark spots and hyperpigmentation.",
      benefits: ["Inhibits melanin production, reducing dark spots", "Soothes redness and irritation", "Brightens and evens skin tone", "Rich in antioxidants that protect skin", "Ideal for sensitive skin with hyperpigmentation"],
      foundIn: ["Elixíe Rosée Eternelle Serum"]
    },
    {
      id: 14,
      name: "Lavender",
      category: "botanical",
      origin: "Native to the Mediterranean, cultivated globally",
      description: "Used in Roman baths and medieval tinctures to purify and calm the skin. Native to the Mediterranean, Lavender has graced ancient Egyptian, Roman, and French apothecaries for centuries. Valued for its calming fragrance and antiseptic properties, it helps reduce inflammation, kill acne-causing bacteria, and soothe irritated skin.",
      benefits: ["Antibacterial and anti-inflammatory properties", "Calms skin and reduces redness", "Promotes healing and regeneration", "Helps balance oil production", "Adds a calming aromatherapeutic element"],
      foundIn: ["Elixíe Rosée Eternelle Serum"]
    },
    {
      id: 15,
      name: "Calendula",
      category: "botanical",
      origin: "Native to Southern Europe and the Mediterranean",
      description: "Known as 'marigold,' Calendula has been used since the Middle Ages for treating wounds and dry skin. With its golden petals glowing like the sun, it has long been a staple in European folk medicine and Renaissance beauty elixirs. Rich in carotenoids and flavonoids, it speeds healing, reduces inflammation, and hydrates deeply.",
      benefits: ["Speeds healing and reduces inflammation", "Hydrates deeply and soothes irritation", "Rich in carotenoids and flavonoids", "Provides antioxidant protection", "Perfect for delicate or damaged skin"],
      foundIn: ["Elixíe Rosée Eternelle Serum"]
    },
    {
      id: 16,
      name: "Aloe Vera",
      category: "botanical",
      origin: "Native to the Arabian Peninsula; now cultivated globally",
      description: "Known as the 'plant of immortality' in ancient Egypt, Aloe Vera has been used for sunburns, wounds, and anti-aging for millennia. Cooling and calming, it floods the skin with moisture while promoting regeneration. Its enzymes, polysaccharides, and antioxidants instantly soothe irritation, accelerate healing, and support a supple, healthy glow.",
      benefits: ["Instantly calms and hydrates skin", "Contains polysaccharides, enzymes, and antioxidants", "Accelerates skin healing and regeneration", "Soothes irritation and reduces inflammation", "Rich in vitamins that nourish the skin"],
      foundIn: ["Velaré Radiance Crème"]
    },
    {
      id: 17,
      name: "Squalane",
      category: "oils",
      origin: "Derived from olives, rice bran, or sugarcane",
      description: "Mediterranean women have used olive-derived oils to soften skin and protect against aging for centuries. Squalane is a lightweight lipid that mimics the skin's own natural oils. It delivers long-lasting hydration, reinforces the skin barrier, and restores bounce and elasticity with a silky, non-greasy feel.",
      benefits: ["Mimics the skin's natural oils", "Locks in moisture and hydration", "Strengthens the skin barrier", "Gives skin a silky, non-greasy glow", "Absorbs easily without clogging pores"],
      foundIn: ["Velaré Radiance Crème"]
    },

  ];

  const filteredIngredients = activeCategory === "all" 
    ? ingredients 
    : ingredients.filter(ingredient => ingredient.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Botanical Ingredients | Elixíe</title>
        <meta 
          name="description" 
          content="Discover the premium botanical ingredients used in Elixíe luxury skincare. Learn about each ingredient's origin, benefits, and the products they're found in." 
        />
      </Helmet>

      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Hero section */}
          <div className="mb-12 text-center">
            <h1 className="font-montserrat text-4xl md:text-5xl text-foreground mb-6">
              Elixíe Ingredient Index
            </h1>
            <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
              At Elixíe, we meticulously select rare botanical ingredients based on scientific research and traditional wisdom. 
              Each component plays a specific role in rejuvenating, protecting, and transforming your skin.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {ingredientCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                    activeCategory === category.id
                      ? "bg-foreground text-background"
                      : "bg-background border border-foreground/20 text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Ingredients List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredIngredients.map(ingredient => (
              <div key={ingredient.id} className="bg-background border border-border/40 p-6 rounded-sm hover:shadow-sm transition-shadow">
                <div className="flex flex-col">
                  <h2 className="font-montserrat text-xl text-foreground mb-2 flex items-center gap-2">
                    {ingredient.name}
                  </h2>
                  <p className="text-[#596b56] text-sm mb-3 italic">Origin: {ingredient.origin}</p>
                  
                  {/* Add botanical images */}
                  {ingredient.name === "Bakuchiol" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={bakuchiolImage} 
                        alt="Bakuchiol botanical illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Frankincense" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={frankincenseImage} 
                        alt="Frankincense resin illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Myrrh" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={myrrhImage} 
                        alt="Myrrh resin illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Hibiscus" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={hibiscusImage} 
                        alt="Hibiscus flower illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Helichrysum" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={helichrysumImage} 
                        alt="Helichrysum flower illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Rosehip" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={rosehipImage} 
                        alt="Rosehip fruit illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Jojoba" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={jojobaImage} 
                        alt="Jojoba plant illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Honeybush" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={honeybushImage} 
                        alt="Honeybush flower illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Turmeric" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={turmericImage} 
                        alt="Turmeric root illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Gotu Kola" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={gotukolaImage} 
                        alt="Gotu Kola leaves illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Montmorillonite Clay" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={montmorilloniteImage} 
                        alt="Montmorillonite clay powder illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Bentonite Clay" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={bentoniteImage} 
                        alt="Bentonite clay illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Rose" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={roseImage} 
                        alt="Rose flower illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Licorice" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={licoriceImage} 
                        alt="Licorice root sticks illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Lavender" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={lavenderImage} 
                        alt="Lavender flower spike illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Calendula" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={calendulaImage} 
                        alt="Calendula marigold flower illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Aloe Vera" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={aloeImage} 
                        alt="Aloe vera leaf illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  {ingredient.name === "Squalane" && (
                    <div className="mb-4 h-48 w-full bg-[#f9f5f1]/60 overflow-hidden rounded-sm">
                      <img 
                        src={squalaneImage} 
                        alt="Olive branch illustration" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <p className="text-foreground/70 text-sm mb-4">{ingredient.description}</p>
                  
                  <h3 className="font-medium text-sm mb-2 text-foreground/90">Key Benefits:</h3>
                  <ul className="list-disc pl-5 text-foreground/70 text-sm space-y-1 mb-4">
                    {ingredient.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  
                  <div className="pt-3 border-t border-border/20 mt-auto">
                    <h3 className="font-medium text-xs mb-1 text-foreground/80">Found in:</h3>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.foundIn.map((product, index) => (
                        <Link 
                          key={index} 
                          href={`/products/${encodeURIComponent(product.toLowerCase().replace(/\s+/g, '-'))}`}
                          className="inline-block px-2 py-1 bg-[#f9f5f1] text-[#596b56] text-xs rounded-sm hover:bg-[#e9e5e1] transition-colors"
                        >
                          {product}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Product Ingredients Navigation */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="font-montserrat text-2xl mb-8 text-center">Explore Our Product Formulations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-[#596b56]/20 group-hover:bg-[#596b56]/10 transition-all duration-300 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMHNlcnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&h=400" 
                  alt="Elixíe Rosée Eternelle Serum"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href="/ingredients/everbloom">
                    <div className="px-6 py-3 bg-white/90 backdrop-blur-sm font-medium text-foreground hover:bg-white transition-colors z-20 rounded-sm">
                      Rosée Eternelle Serum
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-[#596b56]/20 group-hover:bg-[#596b56]/10 transition-all duration-300 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Terra Vita Rejuvenating Mud Mask"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href="/ingredients/terravita">
                    <div className="px-6 py-3 bg-white/90 backdrop-blur-sm font-medium text-foreground hover:bg-white transition-colors z-20 rounded-sm">
                      Terra Vita Mud Mask
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-[#596b56]/20 group-hover:bg-[#596b56]/10 transition-all duration-300 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1601049544082-62ed7f7dca3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                  alt="Velaré Radiance Crème"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href="/ingredients/velare">
                    <div className="px-6 py-3 bg-white/90 backdrop-blur-sm font-medium text-foreground hover:bg-white transition-colors z-20 rounded-sm">
                      Velaré Radiance Crème
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment section */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-2xl mb-6">Our Commitment to Quality</h2>
            <p className="text-foreground/70 mb-8">
              Every Elixíe product is handcrafted in small batches to ensure the highest quality and potency of our natural ingredients. 
              We never use parabens, synthetic fragrances, artificial colors, or harsh chemicals. 
              Our ingredients are ethically sourced, cruelty-free, and selected to provide real benefits for your skin.
            </p>
            
            <Link href="/ingredients-benefits">
              <div className="inline-block px-8 py-2.5 border border-foreground text-sm font-normal text-foreground hover:bg-foreground hover:text-background transition-colors">
                Explore Ingredient Benefits & Research
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ingredients;