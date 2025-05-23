import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Subscription successful!",
        description: "Thank you for joining our newsletter.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-montserrat text-3xl text-center sm:text-4xl text-foreground mb-4">
            Sign up for updates
          </h2>
          <p className="text-foreground/80 text-center mb-8">
            Get news and special offers straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="flex-1">
              <Input
                type="text"
                placeholder="First name"
                className="border-foreground/20 rounded-none h-12 px-4"
              />
            </div>
            
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="border-foreground/20 rounded-none h-12 px-4"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
          </form>
          
          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-primary hover:bg-primary/90 text-background rounded-none px-10 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          
          <div className="flex justify-center mt-16 space-x-4 text-sm text-foreground/60">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
