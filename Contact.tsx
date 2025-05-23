import { useState } from "react";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";
import { 
  SiSpotify, 
  SiX, 
  SiReddit, 
  SiTiktok,
  SiFacebook
} from "react-icons/si";
import { apiRequest } from "@/lib/queryClient";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: socialSettings = [] } = useQuery({
    queryKey: ["/api/social-media"],
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return Instagram;
      case "facebook": return SiFacebook;
      case "youtube": return Youtube;
      case "x": return SiX;
      case "tiktok": return SiTiktok;
      case "spotify": return SiSpotify;
      case "reddit": return SiReddit;
      default: return Instagram;
    }
  };
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message sent successfully! ✅",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });
        form.reset();
      } else {
        toast({
          title: "Unable to send message",
          description: result.message || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Connection error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us | Elixíe</title>
        <meta 
          name="description" 
          content="Have questions about our products? Contact the Elixíe team for support with your skincare needs." 
        />
      </Helmet>
      
      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <h1 className="font-montserrat text-3xl md:text-4xl text-foreground mb-8 text-center">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="min-h-32 resize-y"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact information */}
            <div className="flex flex-col justify-between">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Here are the ways you can reach us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-4 text-primary" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">elixiecosmetics@gmail.com</p>
                      <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  {socialSettings.length > 0 && (
                    <div className="flex items-start">
                      <div className="h-5 w-5 mr-4 text-primary flex items-center justify-center">
                        <Instagram className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Follow Us</h3>
                        <div className="flex flex-wrap gap-3">
                          {socialSettings.map((setting: any) => {
                            const IconComponent = getPlatformIcon(setting.platform);
                            return (
                              <a 
                                key={setting.platform}
                                href={setting.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-all duration-200 hover:scale-105"
                                aria-label={`Follow us on ${setting.platform.charAt(0).toUpperCase() + setting.platform.slice(1)}`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </a>
                            );
                          })}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Stay connected for the latest updates</p>
                      </div>
                    </div>
                  )}

                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">What is your return policy?</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer a 30-day satisfaction guarantee on all our products. If you're not completely satisfied, please contact us for a return or exchange.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">How long does shipping take?</h3>
                    <p className="text-sm text-muted-foreground">
                      Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1">Are your products cruelty-free?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! All Elixíe products are cruelty-free and we never test on animals. Most of our products are also vegan-friendly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Contact;