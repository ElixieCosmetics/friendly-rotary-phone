import { Helmet } from "react-helmet";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

// Dynamic testimonials that rotate for different visits
const testimonialSets = [
  [
    {
      text: "The Rosée Eternelle Serum has completely transformed my skin! The botanical ingredients work like magic, and I love knowing it's all natural.",
      author: "Emma Richardson",
      location: "Los Angeles, CA"
    },
    {
      text: "I've been using Elixíe products for 6 months now and my skin has never looked better. The Terra Vita Mud Mask is my weekly ritual!",
      author: "Sofia Martinez",
      location: "Miami, FL"
    },
    {
      text: "Finally found a skincare brand that actually delivers on its promises. The Velaré Radiance Crème is pure luxury in a jar.",
      author: "Jessica Chen",
      location: "San Francisco, CA"
    }
  ],
  [
    {
      text: "The quality of Elixíe products is unmatched. You can feel the difference that botanical ingredients make on your skin.",
      author: "Isabella Thompson",
      location: "New York, NY"
    },
    {
      text: "I love that Elixíe is cruelty-free and uses sustainable packaging. Beautiful products that align with my values!",
      author: "Aria Patel",
      location: "Austin, TX"
    },
    {
      text: "The Terra Vita Mud Mask has become my go-to for deep cleansing. My skin feels so refreshed and radiant after every use.",
      author: "Maya Johnson",
      location: "Seattle, WA"
    }
  ],
  [
    {
      text: "Elixíe's attention to ingredient quality is incredible. The Rosée Eternelle Serum has helped fade my dark spots beautifully.",
      author: "Zoe Williams",
      location: "Denver, CO"
    },
    {
      text: "I'm obsessed with the Velaré Radiance Crème! It's the perfect balance of hydration and anti-aging benefits.",
      author: "Luna Davis",
      location: "Portland, OR"
    },
    {
      text: "The botanical luxury experience Elixíe provides is unparalleled. Every product feels like a spa treatment at home.",
      author: "Chloe Anderson",
      location: "Boston, MA"
    }
  ]
];

const OurStory = () => {
  const [currentTestimonials, setCurrentTestimonials] = useState(testimonialSets[0]);

  useEffect(() => {
    // Rotate testimonials based on time to ensure variety
    const randomIndex = Math.floor(Math.random() * testimonialSets.length);
    setCurrentTestimonials(testimonialSets[randomIndex]);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Story | Elixíe - Botanical Luxury & Quality Commitment</title>
        <meta 
          name="description" 
          content="Discover Elixíe's story and unwavering commitment to botanical luxury, quality ingredients, and sustainable beauty practices."
        />
        <meta property="og:title" content="Our Story | Elixíe - Botanical Luxury & Quality Commitment" />
        <meta property="og:description" content="Learn about our passion for botanical luxury that transforms skincare into an exquisite daily ritual." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A journey of botanical luxury, quality commitment, and transformative skincare rituals.
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
                The Elixíe Journey
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

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-nunito text-3xl sm:text-4xl text-foreground mb-6">
                What Our Customers Say
              </h2>
              <p className="text-lg text-foreground/70">
                Real experiences from our botanical luxury community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-[#f9f5f1]/20 to-background p-6 rounded-lg border border-border/20">
                  <p className="text-foreground/80 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-border/20 pt-4">
                    <p className="font-nunito font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurStory;