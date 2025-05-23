import { Helmet } from "react-helmet";
import { Check } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Elixíe - Our Story & Commitment to Quality</title>
        <meta 
          name="description" 
          content="Discover the story behind Elixíe's botanical luxury skincare. Learn about our commitment to quality, cruelty-free formulations, and passion for transformative skincare rituals."
        />
        <meta property="og:title" content="About Us | Elixíe - Our Story & Commitment to Quality" />
        <meta property="og:description" content="Elixíe was born from a passion for botanical luxury that transforms skincare into an exquisite daily ritual." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6">
              About Elixíe
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover the passion and purpose behind our botanical luxury skincare collection.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 bg-background border-t border-border/20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="font-nunito text-3xl sm:text-4xl text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl">
                Elixíe was born from a passion for botanical luxury that
                transforms skincare into an exquisite daily ritual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="bg-[#f9f5f1]/50 p-8 flex items-center justify-center rounded-lg">
                <div className="text-center p-6 border border-[#d3c7b6]/30 rounded-lg">
                  <h3 className="font-nunito text-2xl mb-6 italic text-foreground/90">The Essence of Elixíe</h3>
                  <p className="text-foreground/70">Our formulations blend time-honored botanical wisdom with modern skincare science, creating products that deliver exceptional results with unparalleled elegance.</p>
                </div>
              </div>

              <div>
                <h3 className="font-nunito text-2xl mb-6 text-foreground">
                  Luxury With Purpose
                </h3>
                <p className="text-foreground/70 mb-6">
                  We believe luxury skincare should be a reflection of botanical efficacy and sensorial pleasure.
                  Each Elixíe product is crafted with meticulously sourced botanicals that nourish your skin 
                  while providing an unparalleled sensory journey.
                </p>
                <p className="text-foreground/70 mb-10">
                  Our commitment to botanical excellence extends throughout our entire collection,
                  ensuring each formulation delivers both immediate sensorial delight and long-term skin transformation.
                </p>

                <a href="/ingredients" className="inline-block px-8 py-3 border border-foreground text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors rounded-lg">
                  Learn about our ingredients
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment to Quality Section */}
      <section id="commitment" className="py-20 bg-background/50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-nunito text-3xl sm:text-4xl text-foreground mb-6">
                Our Commitment to Quality
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Every Elixíe product reflects our unwavering dedication to the highest standards of quality, 
                sustainability, and ethical practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-nunito text-2xl mb-6 text-foreground">
                  Pure. Ethical. Sustainable.
                </h3>
                <p className="text-foreground/70 mb-8">
                  We source only the finest botanical ingredients, ensuring each component meets our rigorous 
                  standards for purity and effectiveness. Our commitment extends beyond our formulations to 
                  encompass every aspect of our business practices.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Cruelty-Free</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Paraben-Free</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Vegan Formulas</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Eco-Packaging</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Sustainably Sourced</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="ml-3 text-foreground/80">Third-Party Tested</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#f9f5f1]/30 to-[#f0f0f0]/20 p-8 rounded-lg">
                <h4 className="font-nunito text-xl mb-4 text-foreground">Our Promise</h4>
                <p className="text-foreground/70 mb-6">
                  "Every bottle of Elixíe represents our promise to deliver not just exceptional skincare, 
                  but a transformative experience that honors both your skin and our planet."
                </p>
                <div className="pt-4 border-t border-border/20">
                  <p className="text-sm text-foreground/60 italic">
                    — The Elixíe Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-nunito text-3xl sm:text-4xl text-foreground mb-6">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-nunito text-xl mb-3 text-foreground">Botanical Excellence</h3>
                <p className="text-foreground/70">
                  We carefully select each botanical ingredient for its proven efficacy and luxurious sensorial properties.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-nunito text-xl mb-3 text-foreground">Sustainable Beauty</h3>
                <p className="text-foreground/70">
                  Our commitment to sustainability ensures that beauty doesn't come at the expense of our environment.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-nunito text-xl mb-3 text-foreground">Transformative Rituals</h3>
                <p className="text-foreground/70">
                  Every product is designed to transform your daily skincare routine into a luxurious, mindful ritual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;