import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Welcome to Elixíe
          </h1>
          
          <h2 className="text-xl font-montserrat text-foreground/90 mb-8 italic">
            Where Timeless Elegance Meets Botanical Luxury Skincare That Transcends Time.
          </h2>
          
          <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80 space-y-6">
            <p>
              Discover Elixíe, an exquisite collection of skincare crafted to indulge the senses, enhance your natural radiance, and transform your daily routine into a luxurious ritual. At Elixíe, we blend the purest botanical ingredients with innovative skincare science to deliver sophisticated formulations that defy time and expectation.
            </p>
            
            <p>
              Each Elixíe creation is thoughtfully designed with rare and potent botanicals, infused into exclusive blends that deeply nourish, rejuvenate, and illuminate your skin. Immerse yourself in skincare that feels as opulent as it performs—revealing a complexion of unparalleled youthfulness, hydration, and luminous vitality.
            </p>
            
            <p>
              Our products are more than mere indulgences; they're expressions of refined elegance, reserved for those who seek the exceptional. Experience the transformative power of Elixíe and unlock the secret to ageless beauty, curated exclusively for you.
            </p>
            
            {/* Removed duplicate tagline since it's now in the header */}
            
            <p className="mt-8">
              Begin your journey to timeless elegance here.
            </p>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Link href="/products">
              <Button 
                className="bg-foreground text-background hover:bg-foreground/90 px-12 py-4 rounded-lg text-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
