import { Helmet } from "react-helmet";
import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const faqData = [
  {
    question: "What makes Elixíe products different from other skincare brands?",
    answer: "Elixíe combines time-honored botanical wisdom with modern skincare science. Our products are handcrafted in small batches using only the finest botanical ingredients, ensuring exceptional quality and efficacy. We're cruelty-free, paraben-free, and use sustainable packaging."
  },
  {
    question: "How long does shipping usually take?",
    answer: "Standard shipping typically takes 3-5 business days within the US. Express shipping (1-2 business days) and international shipping are also available. You'll receive a tracking number via email once your order ships."
  },
  {
    question: "Can I track my order?",
    answer: "Yes! Once your order ships, you'll receive an email with your tracking number and a link to track your package. You can also track your order by entering your order number and email on our order tracking page."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unused products in their original packaging for a full refund. Return shipping is free for US customers."
  },
  {
    question: "Are Elixíe products suitable for sensitive skin?",
    answer: "Our products are formulated with gentle, natural ingredients and are suitable for most skin types, including sensitive skin. However, we recommend doing a patch test before first use. If you have specific skin concerns, consult with a dermatologist."
  },
  {
    question: "How should I store my Elixíe products?",
    answer: "Store your products in a cool, dry place away from direct sunlight. Most products should be stored at room temperature. Always ensure lids are tightly closed to maintain product integrity and prevent contamination."
  },
  {
    question: "Can I change my shipping address after placing an order?",
    answer: "Yes, you can modify your shipping address before your order ships. Contact our customer service immediately or use our live chat assistant with your order details. Once the shipping label is printed, changes may not be possible."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to many countries worldwide. International shipping typically takes 7-14 business days. Please note that international customers may be responsible for customs duties and taxes."
  },
  {
    question: "Are your products vegan and cruelty-free?",
    answer: "Absolutely! All Elixíe products are 100% vegan and cruelty-free. We never test on animals and only use plant-based ingredients. We're committed to ethical beauty practices."
  },
  {
    question: "What if I receive a damaged product?",
    answer: "We're sorry if your product arrived damaged! Please contact us immediately with photos of the damaged item and packaging. We'll send a replacement right away at no cost to you."
  },
  {
    question: "How do I know which products are right for my skin type?",
    answer: "Visit our Ingredient Index to learn about each ingredient's benefits. You can also contact our skincare specialists through live chat or email for personalized recommendations based on your specific skin concerns and goals."
  },
  {
    question: "Do you offer samples or trial sizes?",
    answer: "Currently, we focus on full-size products to ensure you experience the complete benefits of our formulations. However, we occasionally offer sample sets during special promotions. Follow us on social media for updates!"
  },
  {
    question: "How often should I use each product?",
    answer: "Usage instructions vary by product. Generally, serums can be used twice daily, moisturizers daily, and masks 1-2 times per week. Check the product page or packaging for specific instructions, and always start slowly when introducing new products."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are securely processed and your payment information is never stored on our servers."
  },
  {
    question: "Can I cancel my order?",
    answer: "You can cancel your order within 1 hour of placing it by contacting customer service immediately. After that time, your order may have already entered our fulfillment process, but we'll do our best to accommodate cancellation requests."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Elixíe - Frequently Asked Questions & Customer Support</title>
        <meta 
          name="description" 
          content="Find answers to common questions about Elixíe products, shipping, returns, and skincare. Get instant help with our live chat assistant."
        />
        <meta property="og:title" content="FAQ | Elixíe - Frequently Asked Questions & Customer Support" />
        <meta property="og:description" content="Get instant answers to your questions about our botanical luxury skincare products and services." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-nunito text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
              Find quick answers to common questions about our botanical luxury skincare products and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <div className="inline-block px-8 py-3 border border-foreground text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors rounded-lg">
                  Contact Customer Service
                </div>
              </Link>
              <button className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors rounded-lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="bg-background border border-border/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-background/50 transition-colors"
                  >
                    <h3 className="font-nunito text-lg font-medium text-foreground pr-4">
                      {item.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-foreground/60 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-foreground/60 flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-foreground/70 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Need More Help Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-nunito text-3xl sm:text-4xl text-foreground mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Our customer service team is here to help with any questions not covered above.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link href="/contact">
                <div className="p-6 border border-border/20 rounded-lg hover:border-primary/30 transition-colors">
                  <h3 className="font-nunito text-xl font-medium text-foreground mb-2">Contact Form</h3>
                  <p className="text-foreground/70 text-sm">
                    Send us a detailed message and we'll respond within 24 hours.
                  </p>
                </div>
              </Link>
              <button className="p-6 border border-border/20 rounded-lg hover:border-primary/30 transition-colors">
                <h3 className="font-nunito text-xl font-medium text-foreground mb-2">Live Chat</h3>
                <p className="text-foreground/70 text-sm">
                  Get instant help with our AI assistant and live support team.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;