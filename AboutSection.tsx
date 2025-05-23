import { Check } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background border-t border-border/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="font-montserrat text-3xl sm:text-4xl text-foreground">
              Our Story
            </h2>
            <p className="mt-4 text-foreground/70 max-w-3xl">
              Elixíe was born from a passion for botanical luxury that
              transforms skincare into an exquisite daily ritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="bg-[#f9f5f1]/50 p-8 flex items-center justify-center">
              <div className="text-center p-6 border border-[#d3c7b6]/30">
                <h3 className="font-montserrat text-2xl mb-6 italic text-foreground/90">The Essence of Elixíe</h3>
                <p className="text-foreground/70">Our formulations blend time-honored botanical wisdom with modern skincare science, creating products that deliver exceptional results with unparalleled elegance.</p>
              </div>
            </div>

            <div>
              <h3 className="font-montserrat text-2xl mb-6 text-foreground">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-foreground/80">Cruelty-Free</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-foreground/80">Paraben-Free</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-foreground/80">Vegan Formulas</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="ml-2 text-foreground/80">Eco-Packaging</span>
                </div>
              </div>

              <a href="/ingredients" className="inline-block px-8 py-2.5 border border-foreground text-sm font-normal text-foreground hover:bg-foreground hover:text-background transition-colors">
                Learn about our ingredients
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
