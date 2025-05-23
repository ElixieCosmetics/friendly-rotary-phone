import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Package, User, Mail, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface OrderUpdateData {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  newAddress: string;
  newCity: string;
  newState: string;
  newZip: string;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 🌿 Welcome to Elixíe's customer support. I'm here to help you with any concerns. Please select the category that best describes what you need assistance with:",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [orderData, setOrderData] = useState<OrderUpdateData>({
    orderNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    newAddress: "",
    newCity: "",
    newState: "",
    newZip: ""
  });
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, true);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Check if user is asking about order management
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes("change") && (lowerMessage.includes("address") || lowerMessage.includes("shipping"))) {
        setShowOrderForm(true);
        addMessage("I can help you update your shipping address! Please provide your order details in the form below. Note: I can only update addresses before the shipping label is printed.", false);
        setIsLoading(false);
        return;
      }

      // Send to AI assistant API
      const response = await fetch('/api/chat-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      addMessage(data.response, false);
    } catch (error) {
      addMessage("I'm sorry, I'm having trouble connecting right now. Please try again or contact our customer service team directly.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderUpdate = async () => {
    if (!orderData.orderNumber || !orderData.email || !orderData.firstName || !orderData.lastName) {
      addMessage("Please fill in all required fields (Order Number, Email, First Name, Last Name) to proceed.", false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/update-shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        addMessage(`✅ Great! I've successfully updated your shipping address for order #${orderData.orderNumber}. You should receive a confirmation email shortly.`, false);
        setShowOrderForm(false);
        setOrderData({
          orderNumber: "",
          email: "",
          firstName: "",
          lastName: "",
          newAddress: "",
          newCity: "",
          newState: "",
          newZip: ""
        });
      } else {
        addMessage(`❌ ${data.message || "I couldn't update your shipping address. This might be because the shipping label has already been printed, or the order information doesn't match our records."}`, false);
      }
    } catch (error) {
      addMessage("I'm sorry, I couldn't process your shipping update right now. Please contact our customer service team for assistance.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    setShowCategorySelection(false);
    
    // Add user message showing their selection
    addMessage(`I need help with: ${category}`, true);
    
    // Provide category-specific responses
    switch (category) {
      case "Product Quality & New Purchase Issues":
        addMessage("I understand you have concerns about a recent purchase. I'm here to help ensure you're completely satisfied with your Elixíe products. Could you please tell me more about the specific issue you're experiencing? This will help me provide the best assistance and gather important details for our team.", false);
        setShowContactForm(true);
        break;
      case "Shipping & Delivery Questions":
        addMessage("I'd be happy to help with your shipping questions! I can assist with tracking orders, updating delivery addresses (if labels haven't been printed yet), or addressing any delivery concerns. What specific shipping question can I help you with?", false);
        break;
      case "Custom Skincare Consultation":
        addMessage("Wonderful! I'd love to help you find the perfect Elixíe products for your unique skin needs. Our botanical ingredients are carefully selected for different skin types and concerns. Could you share more about your skin type and what you're hoping to achieve? I'll connect you with our skincare specialists for personalized recommendations.", false);
        setShowContactForm(true);
        break;
      case "Other Questions":
        addMessage("I'm here to help with any other questions you might have about Elixíe! Whether it's about our ingredients, policies, or anything else, please let me know what you'd like assistance with.", false);
        setShowContactForm(true);
        break;
    }
  };

  const handleContactFormSubmit = async () => {
    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
      addMessage("Please fill in your name, email, and message to submit your inquiry.", false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactFormData,
          subject: selectedCategory || contactFormData.subject || "Customer Inquiry"
        }),
      });

      if (response.ok) {
        addMessage("✅ Thank you! Your message has been submitted successfully. Our team will review your inquiry and respond within 24 hours. You'll receive a confirmation email shortly.", false);
        setShowContactForm(false);
        setContactFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        addMessage("I'm sorry, there was an issue submitting your inquiry. Please try again or contact us directly.", false);
      }
    } catch (error) {
      addMessage("I'm sorry, I couldn't submit your inquiry right now. Please try again later or contact our customer service team directly.", false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-background border border-border/20 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/20 bg-primary/5 rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-nunito font-semibold text-foreground">Elixíe Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Category Selection Bubbles */}
            {showCategorySelection && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleCategorySelection("Product Quality & New Purchase Issues")}
                    className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:from-red-100 hover:to-red-150 p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Product Quality & New Purchase Issues</span>
                    </div>
                    <p className="text-xs text-red-600 mt-1">Concerns about product quality, defects, or recent purchase problems</p>
                  </button>

                  <button
                    onClick={() => handleCategorySelection("Shipping & Delivery Questions")}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:from-blue-100 hover:to-blue-150 p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Shipping & Delivery Questions</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Order tracking, delivery updates, address changes</p>
                  </button>

                  <button
                    onClick={() => handleCategorySelection("Custom Skincare Consultation")}
                    className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 hover:from-green-100 hover:to-green-150 p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Custom Skincare Consultation</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Personalized product recommendations for your skin type</p>
                  </button>

                  <button
                    onClick={() => handleCategorySelection("Other Questions")}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 hover:from-purple-100 hover:to-purple-150 p-3 rounded-lg text-left transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Other Questions</span>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">General inquiries, policies, ingredients, or anything else</p>
                  </button>
                </div>
              </div>
            )}
            
            {/* Order Update Form */}
            {showOrderForm && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-nunito font-medium text-foreground text-sm">Update Shipping Address</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      placeholder="Order Number"
                      value={orderData.orderNumber}
                      onChange={(e) => setOrderData(prev => ({...prev, orderNumber: e.target.value}))}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Email"
                      type="email"
                      value={orderData.email}
                      onChange={(e) => setOrderData(prev => ({...prev, email: e.target.value}))}
                      className="text-xs"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="First Name"
                    value={orderData.firstName}
                    onChange={(e) => setOrderData(prev => ({...prev, firstName: e.target.value}))}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Last Name"
                    value={orderData.lastName}
                    onChange={(e) => setOrderData(prev => ({...prev, lastName: e.target.value}))}
                    className="text-xs"
                  />
                </div>
                
                <Input
                  placeholder="New Address"
                  value={orderData.newAddress}
                  onChange={(e) => setOrderData(prev => ({...prev, newAddress: e.target.value}))}
                  className="text-xs"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="City"
                    value={orderData.newCity}
                    onChange={(e) => setOrderData(prev => ({...prev, newCity: e.target.value}))}
                    className="text-xs"
                  />
                  <Input
                    placeholder="State"
                    value={orderData.newState}
                    onChange={(e) => setOrderData(prev => ({...prev, newState: e.target.value}))}
                    className="text-xs"
                  />
                  <Input
                    placeholder="ZIP"
                    value={orderData.newZip}
                    onChange={(e) => setOrderData(prev => ({...prev, newZip: e.target.value}))}
                    className="text-xs"
                  />
                </div>
                
                <Button 
                  onClick={handleOrderUpdate} 
                  className="w-full text-xs"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Address"}
                </Button>
              </div>
            )}

            {/* Contact Form */}
            {showContactForm && (
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-nunito font-medium text-foreground text-sm">Tell us more about your concern</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Your Name"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData(prev => ({...prev, name: e.target.value}))}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData(prev => ({...prev, email: e.target.value}))}
                    className="text-xs"
                  />
                </div>
                
                <Input
                  placeholder="Phone (optional)"
                  value={contactFormData.phone}
                  onChange={(e) => setContactFormData(prev => ({...prev, phone: e.target.value}))}
                  className="text-xs"
                />
                
                <Textarea
                  placeholder="Please describe your concern in detail. The more information you provide, the better we can assist you."
                  value={contactFormData.message}
                  onChange={(e) => setContactFormData(prev => ({...prev, message: e.target.value}))}
                  className="text-xs min-h-[80px]"
                  rows={3}
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleContactFormSubmit} 
                    className="flex-1 text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                  <Button 
                    onClick={() => setShowContactForm(false)} 
                    variant="outline"
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg text-sm text-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/20">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 min-h-[40px] max-h-[80px] resize-none text-sm"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                disabled={isLoading || !inputMessage.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;