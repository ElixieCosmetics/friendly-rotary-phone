import { useEffect } from "react";
import { Helmet } from "react-helmet";

const IngredientsBenefits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Ingredient Benefits | Elixíe</title>
        <meta 
          name="description" 
          content="Discover the science-backed benefits of botanical ingredients used in Elixíe formulations. Learn how frankincense, myrrh, rosehip oil, and other natural botanicals enhance your skin." 
        />
      </Helmet>

      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Hero section */}
          <div className="mb-16 max-w-4xl mx-auto text-center">
            <h1 className="font-montserrat text-4xl md:text-5xl text-foreground mb-6">
              The Elixie Botanical Index
            </h1>
            <p className="text-foreground/70 text-lg">
              At Elixíe, we meticulously select rare botanical ingredients based on scientific research and traditional wisdom.
              Each component plays a specific role in rejuvenating, protecting, and transforming your skin.
            </p>
          </div>



          {/* Rosehip Oil */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Rosehip.png" alt="Rosehip botanical image" className="object-contain w-full h-full max-h-72" />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Rosehip Oil</h2>
                <p className="text-foreground/70 mb-6">
                  Extracted from the seeds of wild rose bushes, this nutrient-dense oil has been used for centuries to heal and regenerate skin.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Rich in Antioxidants:</span> Research in the International Journal of Molecular Science shows rosehip oil contains high levels of vitamins A, C, and E that combat oxidative stress and environmental damage.
                  </li>
                  <li>
                    <span className="font-medium">Scar Reduction:</span> A study in the Journal of Cosmetics, Dermatological Sciences and Applications found that rosehip oil significantly improved the appearance of post-surgical scars when applied twice daily.
                  </li>
                  <li>
                    <span className="font-medium">Collagen Synthesis:</span> The trans-retinoic acid in rosehip oil promotes collagen production, which can reduce fine lines and improve skin texture according to research in Clinical Interventions in Aging.
                  </li>
                  <li>
                    <span className="font-medium">Anti-Inflammatory:</span> Studies have demonstrated rosehip oil's ability to reduce redness and inflammation due to its high content of linoleic and alpha-linolenic acids.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    Our Velaré Radiance Crème features cold-pressed, organic rosehip oil to preserve its rich fatty acid profile and antioxidant content. We blend it with complementary oils to enhance absorption and effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Rose Petal Powder */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Rose Petal Powder</h2>
                <p className="text-foreground/70 mb-6">
                  Derived from Rosa damascena and Rosa centifolia, cultivated across Persia, Morocco, and India. Used in ancient Egyptian, Roman, and Mughal beauty rituals for softening and perfuming the skin.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Rich in Bioactives:</span> Rose petals contain vitamin C, tannins, and flavonoids that balance pH, calm irritation, and impart a natural glow.
                  </li>
                  <li>
                    <span className="font-medium">Antioxidant Protection:</span> Studies show rose petals contain polyphenols and anthocyanins that protect against UV damage and premature aging.
                  </li>
                  <li>
                    <span className="font-medium">Skin-Soothing:</span> Clinical research demonstrates the anti-inflammatory properties of rose extract in reducing skin redness and sensitivity.
                  </li>
                  <li>
                    <span className="font-medium">Natural Astringent:</span> Rose petals contain tannins that gently tighten pores and refine skin texture without causing dryness.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Terra Vita Rejuvenating Mud Mask, we incorporate finely milled organic rose petal powder that provides gentle physical exfoliation while hydrating and reducing inflammation. Perfect for sensitive skin types.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Rose.png" alt="Rose botanical image" className="object-contain w-full h-full max-h-72" />
                </div>
              </div>
            </div>
          </section>

          {/* Babchi Oil (Bakuchiol) */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Bakuchoil.png" alt="Babchi oil (Bakuchiol) botanical image" className="object-contain w-full h-full max-h-72" />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Babchi Oil (Bakuchiol)</h2>
                <p className="text-foreground/70 mb-6">
                  Derived from the seeds of Psoralea corylifolia, this sacred Ayurvedic herb has been used for centuries for skin disorders and rejuvenation. It delivers the anti-aging benefits of retinol without the irritation.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Natural Retinol Alternative:</span> Research in the British Journal of Dermatology found that bakuchiol provides the same anti-aging benefits as retinol without the typical irritation, making it suitable for sensitive skin.
                  </li>
                  <li>
                    <span className="font-medium">Collagen Stimulation:</span> Studies published in the International Journal of Cosmetic Science demonstrate bakuchiol's ability to upregulate type I, III, and IV collagen production, improving skin firmness and elasticity.
                  </li>
                  <li>
                    <span className="font-medium">Powerful Antioxidant:</span> According to research in Experimental Dermatology, bakuchiol exhibits exceptional antioxidant properties that neutralize free radicals and prevent photoaging.
                  </li>
                  <li>
                    <span className="font-medium">Safe During Pregnancy:</span> Unlike retinol, bakuchiol is considered safe to use during pregnancy, making it an ideal choice for expectant mothers who want to maintain their skincare routine.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Velaré Radiance Crème, we use a clinically-effective concentration of sustainable bakuchiol extract that delivers visible anti-aging results without sensitivity or irritation, perfect for all skin types including sensitive skin.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Frankincense */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Frankincense</h2>
                <p className="text-foreground/70 mb-6">
                  Derived from the resin of Boswellia trees native to Africa and the Arabian peninsula, Frankincense has been treasured for millennia for its powerful rejuvenating and restorative properties.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Anti-inflammatory Properties:</span> Research in the Journal of Traditional and Complementary Medicine demonstrates frankincense's ability to regulate inflammatory pathways, helping to calm irritated skin and reduce redness.
                  </li>
                  <li>
                    <span className="font-medium">Cellular Regeneration:</span> Studies in the International Journal of Molecular Sciences show that boswellic acids in frankincense enhance cell turnover and stimulate healthy tissue production, making it excellent for aging skin.
                  </li>
                  <li>
                    <span className="font-medium">Improves Skin Tone:</span> Clinical research has shown that frankincense compounds help fade discoloration, even skin tone, and reduce the appearance of scars and blemishes.
                  </li>
                  <li>
                    <span className="font-medium">Antioxidant Protection:</span> Rich in terpenes and boswellic acids that neutralize free radicals, protecting skin from environmental damage and preventing premature aging.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate premium Boswellia serrata extract in our Velaré Radiance Crème, providing concentrated benefits without the need for synthetic preservatives or additives.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/frankincense.png" alt="Frankincense botanical image" className="object-contain w-full h-full max-h-72" />
                </div>
              </div>
            </div>
          </section>

          {/* Honeybush */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img 
                    src="/botanicals/Honeybush.png" 
                    alt="Honeybush botanical image" 
                    className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Honeybush</h2>
                <p className="text-foreground/70 mb-6">
                  Native to the Eastern and Western Cape regions of South Africa, this sun-kissed botanical has been traditionally brewed as a calming tea by Indigenous peoples to treat inflammation and dry skin.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Powerful Antioxidant Complex:</span> Honeybush contains unique xanthones and flavanones that protect against oxidative stress and environmental damage.
                  </li>
                  <li>
                    <span className="font-medium">Calming Anti-inflammatory:</span> Studies demonstrate Honeybush's ability to soothe reactive skin conditions by reducing inflammatory markers and calming irritation.
                  </li>
                  <li>
                    <span className="font-medium">Skin Elasticity Booster:</span> Research shows that the compounds in Honeybush help improve skin elasticity and firmness by supporting collagen structure.
                  </li>
                  <li>
                    <span className="font-medium">Gentle on Sensitive Skin:</span> Its natural sweetness and mild profile make it especially beneficial for sensitive or mature skin that cannot tolerate harsher botanical treatments.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Terra Vita Rejuvenating Mud Mask, we incorporate carefully sourced Honeybush extract that calms and soothes while delivering potent antioxidant protection, making it ideal for all skin types, even the most sensitive.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Turmeric */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Turmeric.png" 
                       alt="Turmeric root botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Turmeric</h2>
                <p className="text-foreground/70 mb-6">
                  Indigenous to India and Southeast Asia, this sacred plant has been used in Ayurvedic and Southeast Asian beauty rituals for thousands of years to cleanse and brighten skin before ceremonies.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Powerful Anti-inflammatory:</span> Research in the Journal of Alternative and Complementary Medicine shows turmeric's active compound, curcumin, dramatically reduces skin inflammation and irritation.
                  </li>
                  <li>
                    <span className="font-medium">Brightening Properties:</span> Studies demonstrate turmeric's ability to inhibit melanin production, helping to fade dark spots and even skin tone for a more radiant complexion.
                  </li>
                  <li>
                    <span className="font-medium">Antioxidant Protection:</span> Clinical research confirms curcumin's exceptional ability to neutralize free radicals, protecting skin cells from environmental damage and premature aging.
                  </li>
                  <li>
                    <span className="font-medium">Acne-Fighting:</span> Turmeric's antibacterial and anti-inflammatory properties help calm breakouts and regulate sebum production for clearer skin.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Terra Vita Rejuvenating Mud Mask, we incorporate sustainably sourced turmeric extract that brightens and evens skin tone while calming inflammation, revealing a more balanced and radiant complexion.
                  </p>
                </div>
              </div>
            </div>
          </section>
          

          
          {/* Licorice Root */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Licorice Root</h2>
                <p className="text-foreground/70 mb-6">
                  Native to Southern Europe and Asia, Licorice Root has been used in traditional Chinese and Middle Eastern skincare for centuries to brighten skin and reduce inflammation.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Natural Skin Brightener:</span> Contains glabridin, which inhibits tyrosinase activity to reduce hyperpigmentation and even skin tone without the harshness of synthetic brighteners.
                  </li>
                  <li>
                    <span className="font-medium">Calming Anti-inflammatory:</span> Research shows licorice root compounds effectively reduce redness and soothe irritation, making it perfect for sensitive and reactive skin types.
                  </li>
                  <li>
                    <span className="font-medium">Potent Antioxidant Protection:</span> Rich in protective flavonoids that neutralize free radicals and prevent environmental damage to skin cells.
                  </li>
                  <li>
                    <span className="font-medium">Balanced Brightening:</span> Unlike harsh chemical brighteners, licorice root gently fades dark spots while supporting overall skin health.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Elixíe Rosée Eternelle Serum and Velaré Radiance Crème, we use premium licorice root extract that brightens and evens skin tone while calming sensitivity. This versatile botanical works synergistically with our other ingredients to reveal a more luminous complexion.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Licorice Root.png" 
                       alt="Licorice root botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Aloe Vera */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Aloe Vera.png" 
                       alt="Aloe Vera botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Aloe Vera</h2>
                <p className="text-foreground/70 mb-6">
                  Native to the Arabian Peninsula but cultivated worldwide, Aloe Vera has been revered for thousands of years in ancient Egyptian, Greek, and Chinese medicine for its remarkable healing properties.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Exceptional Hydration:</span> Rich in polysaccharides that attract and lock moisture into the skin, providing deep hydration without heaviness.
                  </li>
                  <li>
                    <span className="font-medium">Accelerated Healing:</span> Studies show Aloe Vera increases collagen synthesis and crosslinking, speeding healing of damaged skin tissues.
                  </li>
                  <li>
                    <span className="font-medium">Anti-inflammatory Action:</span> Contains compounds like acemannan that reduce inflammation and soothe irritated, sensitive skin conditions.
                  </li>
                  <li>
                    <span className="font-medium">Antimicrobial Protection:</span> Natural antibacterial properties help prevent breakouts while supporting skin's microbiome balance.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    In our Velaré Radiance Crème, we use organic cold-processed aloe vera that preserves its bioactive compounds, providing soothing hydration while calming inflammation and supporting skin repair.
                  </p>
                </div>
              </div>
            </div>
          </section>





          {/* Lavender */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Lavender</h2>
                <p className="text-foreground/70 mb-6">
                  Native to the Mediterranean and now cultivated globally, Lavender has been used in Roman baths and medieval tinctures to purify and calm the skin.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Natural Antibacterial:</span> Contains powerful compounds that help prevent breakouts while balancing oil production.
                  </li>
                  <li>
                    <span className="font-medium">Anti-inflammatory Action:</span> Calms skin and reduces redness associated with irritation or sensitivity.
                  </li>
                  <li>
                    <span className="font-medium">Accelerated Healing:</span> Promotes faster recovery of minor skin irritations and blemishes.
                  </li>
                  <li>
                    <span className="font-medium">Aromatherapeutic Benefits:</span> Provides a natural calming effect that enhances the skincare ritual.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate organic lavender oil in our Elixíe Rosée Eternelle Serum and Terra Vita Rejuvenating Mud Mask to balance and purify the skin while providing a subtle, calming aromatherapeutic experience.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Lavender.png" 
                       alt="Lavender botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Gotu Kola */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Gotukola.png" 
                       alt="Gotu Kola botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Gotu Kola</h2>
                <p className="text-foreground/70 mb-6">
                  Growing wild in India, Sri Lanka, and parts of Southeast Asia, Gotu Kola has been a staple in Ayurvedic medicine and Chinese healing traditions for improving circulation and healing wounds.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Collagen Stimulation:</span> Contains triterpenoid compounds that significantly boost collagen production for firmer, more resilient skin.
                  </li>
                  <li>
                    <span className="font-medium">Enhanced Circulation:</span> Improves blood flow and skin oxygenation, delivering essential nutrients to skin cells.
                  </li>
                  <li>
                    <span className="font-medium">Barrier Reinforcement:</span> Strengthens skin's protective barrier function against environmental stressors.
                  </li>
                  <li>
                    <span className="font-medium">Cellular Regeneration:</span> Promotes wound healing and tissue regeneration, ideal for mature or compromised skin.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate Gotu Kola extract in our Elixíe Rosée Eternelle Serum and Terra Vita Rejuvenating Mud Mask to improve skin elasticity, reduce the appearance of scars, and promote overall skin resilience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Helichrysum */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Helichrysum</h2>
                <p className="text-foreground/70 mb-6">
                  Also known as Immortelle or Everlasting, Helichrysum italicum is a Mediterranean flowering plant whose golden blooms retain their vibrant color even when dried, symbolizing its exceptional regenerative properties.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Exceptional Tissue Repair:</span> Contains unique compounds that stimulate tissue regeneration and reduce scarring, making it ideal for mature or damaged skin.
                  </li>
                  <li>
                    <span className="font-medium">Potent Anti-inflammatory:</span> Significantly reduces inflammation markers in skin tissue, helping to calm redness and irritation.
                  </li>
                  <li>
                    <span className="font-medium">Natural Antioxidant Protection:</span> Rich in flavonoids and phenolic compounds that neutralize free radicals more effectively than many synthetic antioxidants.
                  </li>
                  <li>
                    <span className="font-medium">Skin Elasticity Enhancement:</span> Improves firmness and elasticity by supporting collagen production and preserving existing collagen structures.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate organically grown Helichrysum italicum extract in our Velaré Radiance Crème, where it works synergistically with other botanicals to visibly improve skin tone, texture, and resilience over time.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Helichrysum.png" 
                       alt="Helichrysum botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
            </div>
          </section>



          {/* Hibiscus */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Hibiscus.png" 
                       alt="Hibiscus botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Hibiscus</h2>
                <p className="text-foreground/70 mb-6">
                  Native to tropical Asia and cultivated around the world, Hibiscus has been used in traditional Ayurvedic, Chinese, and Egyptian medicine for centuries for its rejuvenating and brightening effects on the skin.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Natural AHA Source:</span> Contains gentle alpha hydroxy acids that provide natural exfoliation for smoother, brighter skin.
                  </li>
                  <li>
                    <span className="font-medium">Potent Antioxidant Protection:</span> Rich in anthocyanins and polyphenols that combat free radical damage and environmental stressors.
                  </li>
                  <li>
                    <span className="font-medium">Elasticity Enhancer:</span> Stimulates collagen production while inhibiting elastase activity, preserving skin's youthful bounce and firmness.
                  </li>
                  <li>
                    <span className="font-medium">Natural Humectant:</span> Provides natural moisture retention without heaviness, making it suitable for all skin types.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate premium Hibiscus in our Elixíe Rosée Eternelle Serum to gently exfoliate, deeply hydrate, and provide antioxidant protection while allowing other active botanicals to penetrate more effectively.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Calendula */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Calendula</h2>
                <p className="text-foreground/70 mb-6">
                  Known as "marigold" in folk traditions, Calendula officinalis has been used since ancient Egyptian, Greek, and Roman times as a healing botanical for skin conditions and wounds.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Remarkable Healing:</span> Contains triterpenoids that rapidly accelerate wound healing and skin cell regeneration.
                  </li>
                  <li>
                    <span className="font-medium">Powerful Anti-inflammatory:</span> Significantly reduces skin inflammation through multiple pathways, making it ideal for sensitive or reactive skin.
                  </li>
                  <li>
                    <span className="font-medium">Antimicrobial Protection:</span> Provides natural protection against harmful microorganisms without disrupting skin's beneficial flora.
                  </li>
                  <li>
                    <span className="font-medium">Deep Hydration:</span> Nourishes and moisturizes while supporting the skin's natural barrier function.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate organic Calendula flower extract in our Terra Vita Rejuvenating Mud Mask and Velaré Radiance Crème to calm irritation, accelerate healing, and provide gentle yet effective care for all skin types, especially sensitive skin.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/Calendula.png" 
                       alt="Calendula botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Myrrh */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Myrrh</h2>
                <p className="text-foreground/70 mb-6">
                  Harvested from Commiphora trees of Northeast Africa and the Middle East, Myrrh resin epitomizes time-tested skincare, having been traded alongside gold and used in royal beauty rituals since Biblical times.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Exceptional Healing:</span> Rich in healing compounds that support tissue repair and reduce scarring for smoother, more even skin.
                  </li>
                  <li>
                    <span className="font-medium">Protective Barrier:</span> Creates a natural shield against environmental damage while allowing skin to breathe.
                  </li>
                  <li>
                    <span className="font-medium">Anti-Aging Potency:</span> Promotes youthful skin tone and texture by supporting skin's natural regenerative processes.
                  </li>
                  <li>
                    <span className="font-medium">Calming & Soothing:</span> Helps restore rough, chapped, or cracked skin to a smooth, comfortable state.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate sustainably harvested Myrrh resin extract in our Velaré Radiance Crème to support skin healing, provide antioxidant protection, and promote a more youthful appearance with continued use.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/myrrh.png" 
                       alt="Myrrh resin botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Squalane */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-80 flex items-center justify-center bg-white">
                  <img src="/botanicals/squalane.png" 
                       alt="Olive-derived squalane botanical image" 
                       className="object-contain w-full h-full max-h-72"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-montserrat text-3xl text-foreground mb-4">Squalane</h2>
                <p className="text-foreground/70 mb-6">
                  Derived from olives, rice bran, or sugarcane, Squalane has been used for centuries by Mediterranean women who applied olive-derived oils to soften skin and protect against aging.
                </p>
                
                <h3 className="font-medium text-xl mb-3">Research-Backed Benefits:</h3>
                <ul className="list-disc pl-5 text-foreground/70 space-y-3 mb-6">
                  <li>
                    <span className="font-medium">Biomimetic Moisturization:</span> Perfectly mimics the skin's natural oils for exceptional absorption and compatibility.
                  </li>
                  <li>
                    <span className="font-medium">Weightless Hydration:</span> Deeply moisturizes without feeling heavy or greasy, making it suitable for all skin types.
                  </li>
                  <li>
                    <span className="font-medium">Barrier Reinforcement:</span> Strengthens the skin barrier against environmental damage and moisture loss.
                  </li>
                  <li>
                    <span className="font-medium">Enhanced Delivery:</span> Helps other active ingredients penetrate more effectively for improved results.
                  </li>
                </ul>
                
                <div className="bg-background/80 border border-border/40 p-4 rounded-sm">
                  <h4 className="font-medium mb-2">How We Use It:</h4>
                  <p className="text-foreground/70 text-sm">
                    We incorporate olive-derived Squalane in our Velaré Radiance Crème to provide deep yet lightweight hydration that balances oil production and enhances barrier function without clogging pores.
                  </p>
                </div>
              </div>
            </div>
          </section>



          {/* Concluding Section */}
          <section className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-3xl text-foreground mb-6">Our Formulation Philosophy</h2>
            <p className="text-foreground/70 mb-8">
              At Elixíe, we believe that effective skincare requires both scientific precision and natural wisdom. 
              Our approach to ingredient selection and formulation is guided by extensive research, 
              traditional knowledge, and a deep understanding of skin biology. 
              We create products that work with your skin's natural processes, 
              not against them—enhancing your natural beauty while promoting long-term skin health.
            </p>
            <a href="/ingredients" className="inline-block px-8 py-2.5 border border-foreground text-sm font-normal text-foreground hover:bg-foreground hover:text-background transition-colors">
              Back to Ingredients Overview
            </a>
          </section>
        </div>
      </div>
    </>
  );
};

export default IngredientsBenefits;