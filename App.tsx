import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "next-themes";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import OurStory from "@/pages/OurStory";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import UserAccount from "@/pages/UserAccount";
import MyAccount from "@/pages/MyAccount";
import OrderHistory from "@/pages/OrderHistory";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import Ingredients from "@/pages/Ingredients";
import IngredientsBenefits from "@/pages/IngredientsBenefits";
import IngredientRoseeEternelle from "@/pages/IngredientRoseeEternelle";
import IngredientTerraVita from "@/pages/IngredientTerraVita";
import IngredientVelare from "@/pages/IngredientVelare";
import Admin from "@/pages/Admin";
import Header from "@/components/layout/Header";
import NewsletterPopup from "@/components/NewsletterPopup";
import Footer from "@/components/layout/Footer";
import FooterCredit from "@/components/layout/FooterCredit";
import PromoBanner from "@/components/PromoBanner";
import ChatAssistant from "@/components/ChatAssistant";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/products/category/:category" component={Products} />
      <Route path="/products/:id" component={ProductDetails} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:id" component={OrderConfirmation} />
      <Route path="/account" component={UserAccount} />
      <Route path="/my-account" component={MyAccount} />
      <Route path="/orders" component={OrderHistory} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/ingredients" component={Ingredients} />
      <Route path="/ingredients-benefits" component={IngredientsBenefits} />
      <Route path="/ingredients/rosee-eternelle" component={IngredientRoseeEternelle} />
      <Route path="/ingredients/terravita" component={IngredientTerraVita} />
      <Route path="/ingredients/velare" component={IngredientVelare} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <PromoBanner />
            <Header />
            <main className="min-h-screen">
              <Router />
            </main>
            <Footer />
            <FooterCredit />
            <ChatAssistant />
            <NewsletterPopup />
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
