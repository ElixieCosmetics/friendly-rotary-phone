import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductGrid from "@/components/products/ProductGrid";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Elixíe | Timeless Elegance, Botanical Luxury</title>
        <meta 
          name="description" 
          content="Discover Elixíe's exquisite collection of skincare crafted to indulge the senses, enhance your natural radiance, and transform your daily routine into a luxurious ritual."
        />
        <meta property="og:title" content="Elixíe | Timeless Elegance, Botanical Luxury" />
        <meta property="og:description" content="Experience the transformative power of Elixíe and unlock the secret to ageless beauty, curated exclusively for you." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <h2 className="font-montserrat text-3xl sm:text-4xl text-foreground">
              Bestsellers
            </h2>
            <p className="mt-4 text-foreground/70 max-w-2xl">
              Our most loved products, crafted with the finest botanical ingredients.
            </p>
          </div>

          <ProductGrid featured={true} limit={3} />

          <div className="mt-12">
            <a href="/products" className="inline-flex justify-center items-center px-8 py-2.5 border border-foreground text-sm font-normal rounded-none text-foreground hover:bg-foreground hover:text-background transition-colors">
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
};

export default Home;
