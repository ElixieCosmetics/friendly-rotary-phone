import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen popup or subscribed
    const hasSeenPopup = localStorage.getItem('elixie-newsletter-popup-seen');
    const hasSubscribed = localStorage.getItem('elixie-newsletter-subscribed');
    
    if (!hasSeenPopup && !hasSubscribed) {
      // Show popup after 10 seconds on first visit
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('elixie-newsletter-popup-seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('elixie-newsletter-subscribed', 'true');
        localStorage.setItem('elixie-newsletter-popup-seen', 'true');
        localStorage.setItem('elixie-discount-code', data.discountCode);
        localStorage.setItem('elixie-discount-email', email);
        
        toast({
          title: "Welcome to Elixíe! ✨",
          description: `Your exclusive code: ${data.discountCode} (10% off first order!)`,
        });
        
        setIsOpen(false);
      } else {
        toast({
          title: "Oops!",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border/40 rounded-lg shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-foreground/60 hover:text-foreground z-10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#596b56] to-[#8faa8b] p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-montserrat text-2xl text-foreground mb-2">
            Welcome to Elixíe
          </h2>
          
          {/* Offer */}
          <div className="bg-gradient-to-r from-[#596b56]/10 to-[#8faa8b]/10 rounded-lg p-4 mb-4">
            <p className="text-lg font-semibold text-foreground mb-1">
              Get 10% Off Your First Order! 🌿
            </p>
            <p className="text-sm text-foreground/70">
              Plus exclusive botanical skincare tips & early access to new products
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#596b56] to-[#8faa8b] hover:from-[#4a5c47] hover:to-[#7a9577] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Get My 10% Discount"}
            </Button>
          </form>

          {/* Fine print */}
          <p className="text-xs text-foreground/50 mt-4">
            By signing up, you agree to receive emails from Elixíe. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;