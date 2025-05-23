import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { randomUUID } from "crypto";
import { sendOrderConfirmationEmail, sendOrderNotificationToCompany, sendContactFormEmail } from "./email";
import { insertOrderSchema, insertOrderItemSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import session from "express-session";
import * as fs from 'fs';
import * as path from 'path';

// Initialize Stripe with the secret key from environment variables
// Ensure Stripe key is available from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error("Warning: STRIPE_SECRET_KEY environment variable is not set");
}
const stripe = new Stripe(stripeSecretKey || "");

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "elixie-session-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  // Authentication API endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password, subscribeToEmails } = req.body;
      
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        subscribeToEmails: subscribeToEmails || false,
      });
      
      // Set user session
      (req.session as any).userId = user.id;
      
      // Return user data (exclude password)
      const { password: _, ...userData } = user;
      res.status(201).json(userData);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set user session
      (req.session as any).userId = user.id;
      
      // Return user data (exclude password)
      const { password: _, ...userData } = user;
      res.json(userData);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/user", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return user data (exclude password)
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  });
  
  app.get("/api/user/orders", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const orders = await storage.getOrdersByUser(userId);
      
      // Enhance orders with items and products
      const enhancedOrders = await Promise.all(
        orders.map(async (order) => {
          const orderItems = await storage.getOrderItems(order.id);
          const orderItemsWithProducts = await Promise.all(
            orderItems.map(async (item) => {
              const product = await storage.getProduct(item.productId);
              return {
                ...item,
                product,
              };
            })
          );
          
          return {
            ...order,
            items: orderItemsWithProducts,
          };
        })
      );
      
      res.json(enhancedOrders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user orders" });
    }
  });
  
  // Update user information
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      const userIdParam = parseInt(req.params.id);
      
      // Ensure user is authenticated and can only update their own profile
      if (!userId || userId !== userIdParam) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const updateData = req.body;
      
      // Don't allow updating certain fields through this endpoint
      delete updateData.id;
      delete updateData.password;
      delete updateData.username;
      delete updateData.createdAt;
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      // Return user without password
      const { password, ...userData } = updatedUser;
      res.json(userData);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user information" });
    }
  });
  // Products API endpoints
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products by category" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });

  // Shipping methods API endpoints
  app.get("/api/shipping-methods", async (_req, res) => {
    try {
      const shippingMethods = await storage.getShippingMethods();
      res.json(shippingMethods);
    } catch (error) {
      res.status(500).json({ message: "Error fetching shipping methods" });
    }
  });

  // Cart API endpoints
  app.post("/api/cart", async (req, res) => {
    try {
      let cart;
      const { userId, sessionId } = req.body;

      if (userId) {
        cart = await storage.getCartByUser(userId);
        if (!cart) {
          cart = await storage.createCart({ userId, sessionId: null });
        }
      } else if (sessionId) {
        cart = await storage.getCartBySession(sessionId);
        if (!cart) {
          cart = await storage.createCart({ userId: null, sessionId });
        }
      } else {
        const newSessionId = randomUUID();
        cart = await storage.createCart({ userId: null, sessionId: newSessionId });
        res.cookie("sessionId", newSessionId, { 
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict"
        });
      }

      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error creating cart" });
    }
  });

  app.get("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart ID" });
      }
      const cart = await storage.getCart(id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItems = await storage.getCartItems(cart.id);
      const cartItemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      res.json({
        ...cart,
        items: cartItemsWithProducts,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  });

  app.post("/api/cart/:cartId/items", async (req, res) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const { productId, quantity } = req.body;

      if (isNaN(cartId) || isNaN(productId) || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid request parameters" });
      }

      const cart = await storage.getCart(cartId);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingCartItem = await storage.getCartItemWithProduct(cartId, productId);
      
      let cartItem;
      
      if (existingCartItem) {
        cartItem = await storage.updateCartItem(existingCartItem.id, {
          quantity: existingCartItem.quantity + quantity,
        });
      } else {
        cartItem = await storage.createCartItem({
          cartId,
          productId,
          quantity,
        });
      }

      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart" });
    }
  });

  app.put("/api/cart/:cartId/items/:itemId", async (req, res) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const itemId = parseInt(req.params.itemId);
      const { quantity } = req.body;

      if (isNaN(cartId) || isNaN(itemId) || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid request parameters" });
      }

      const cart = await storage.getCart(cartId);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItem = await storage.updateCartItem(itemId, { quantity });
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });

  app.delete("/api/cart/:cartId/items/:itemId", async (req, res) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const itemId = parseInt(req.params.itemId);

      if (isNaN(cartId) || isNaN(itemId)) {
        return res.status(400).json({ message: "Invalid request parameters" });
      }

      const cart = await storage.getCart(cartId);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await storage.deleteCartItem(itemId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart" });
    }
  });

  // Order API endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = req.body;

      // Validate order data
      try {
        insertOrderSchema.parse(orderData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({
            message: "Invalid order data",
            errors: fromZodError(error).message,
          });
        }
      }

      // Create the order
      const order = await storage.createOrder(orderData);

      // Create order items
      if (orderData.items && Array.isArray(orderData.items)) {
        for (const item of orderData.items) {
          try {
            insertOrderItemSchema.parse({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            });

            await storage.createOrderItem({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            });
          } catch (error) {
            console.error("Error creating order item:", error);
          }
        }
      }

      // Get the created order items
      const orderItems = await storage.getOrderItems(order.id);
      
      // Get products for the order
      const productIds = orderItems.map(item => item.productId);
      const products = await Promise.all(
        productIds.map(id => storage.getProduct(id))
      ).then(products => products.filter(product => product !== undefined)) as any;

      // Send confirmation email to customer
      await sendOrderConfirmationEmail(order, orderItems, products);
      
      // Send notification email to company
      await sendOrderNotificationToCompany(order, orderItems, products);

      res.status(201).json({
        ...order,
        items: orderItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const orderItems = await storage.getOrderItems(order.id);
      const orderItemsWithProducts = await Promise.all(
        orderItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      res.json({
        ...order,
        items: orderItemsWithProducts,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
  });

  // Stripe payment integration
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "usd", metadata = {} } = req.body;
      
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return res.status(400).json({
          error: "Invalid amount. Amount must be a positive number.",
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      console.error("Stripe error:", error);
      res.status(500).json({
        message: "Error creating payment intent: " + error.message,
      });
    }
  });

  // PayPal integration routes
  app.get("/api/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/api/paypal/order", async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post("/api/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Blog API endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });

  app.get("/api/blog/published", async (req, res) => {
    try {
      const publishedPosts = await storage.getPublishedBlogPosts();
      res.json(publishedPosts);
    } catch (error) {
      console.error("Error fetching published blog posts:", error);
      res.status(500).json({ message: "Error fetching published blog posts" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const blogPostData = req.body;
      const newBlogPost = await storage.createBlogPost(blogPostData);
      res.status(201).json(newBlogPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Error creating blog post" });
    }
  });

  app.put("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const blogPostData = req.body;
      const updatedBlogPost = await storage.updateBlogPost(id, blogPostData);
      res.json(updatedBlogPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Error updating blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlogPost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Error deleting blog post" });
    }
  });

  // Delete contact submission endpoint
  app.delete("/api/admin/contact-submissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContactSubmission(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ message: "Error deleting contact submission" });
    }
  });

  // Send email reply endpoint
  app.post("/api/admin/send-reply", async (req, res) => {
    try {
      const { to, subject, message } = req.body;
      
      if (!to || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Use your existing email service from server/email.ts
      const emailSent = await sendEmail({
        to,
        from: "info@sitebyte.org",
        subject,
        text: message,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #8B5A5A; margin: 0;">Elixíe Cosmetics</h2>
              <p style="color: #666; margin: 5px 0;">Natural Beauty, Scientifically Crafted</p>
            </div>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <div style="text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px;">
              <p>Elixíe Cosmetics | Natural Botanical Skincare</p>
              <p>Thank you for choosing our holistic approach to beauty</p>
            </div>
          </div>
        </div>`
      });

      if (emailSent) {
        res.json({ success: true, message: "Email sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send email" });
      }
    } catch (error) {
      console.error("Error sending reply email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  });
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "Missing required fields. Please provide name, email, subject and message." 
        });
      }
      
      // Save contact submission to database
      const contactSubmission = await storage.createContactSubmission({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "new"
      });
      
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log(`ID: ${contactSubmission.id}`);
      console.log(`Time: ${contactSubmission.createdAt}`);
      console.log(`From: ${name} (${email})`);
      console.log(`Phone: ${phone || "Not provided"}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log("=== END OF SUBMISSION ===");
      
      // Try to send email notification to company
      try {
        await sendContactFormEmail({ name, email, phone, subject, message });
        console.log("Contact form email sent successfully to info@sitebyte.org");
      } catch (emailError) {
        console.error("Failed to send contact form email:", emailError);
        // We'll continue processing since we've logged the submission
      }
      
      res.status(200).json({ message: "Your message has been sent successfully." });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to send your message. Please try again later." });
    }
  });

  // Admin routes for contact submissions
  app.get("/api/admin/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.patch("/api/admin/contact-submissions/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["new", "read", "replied", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const submission = await storage.updateContactSubmission(id, { status });
      res.json(submission);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ message: "Failed to update contact submission" });
    }
  });

  // Social Media Settings API (Admin)
  app.get("/api/admin/social-media", async (req, res) => {
    try {
      const settings = await storage.getSocialMediaSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching social media settings:", error);
      res.status(500).json({ message: "Failed to fetch social media settings" });
    }
  });

  // Public Social Media Settings API (for footer and contact page)
  app.get("/api/social-media", async (req, res) => {
    try {
      const settings = await storage.getSocialMediaSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching social media settings:", error);
      res.status(500).json({ message: "Failed to fetch social media settings" });
    }
  });

  app.post("/api/admin/social-media", async (req, res) => {
    try {
      const { platform, url } = req.body;
      
      if (!platform || !url) {
        return res.status(400).json({ message: "Platform and URL are required" });
      }

      const setting = await storage.createOrUpdateSocialMediaSetting({ platform, url });
      res.json(setting);
    } catch (error) {
      console.error("Error updating social media setting:", error);
      res.status(500).json({ message: "Failed to update social media setting" });
    }
  });

  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });
  
  // AI Chat Assistant API
  app.post("/api/chat-assistant", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      // Import OpenAI here to use the newest model
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const systemPrompt = `You are a helpful customer service assistant for Elixíe, a botanical luxury skincare brand. 

Key information about Elixíe:
- Products: Rosée Eternelle Serum, Terra Vita Rejuvenating Mud Mask, Velaré Radiance Crème
- All products are cruelty-free, paraben-free, vegan, and use sustainable packaging
- Standard shipping: 3-5 business days, Express: 1-2 business days
- 30-day satisfaction guarantee with free returns
- International shipping available (7-14 business days)
- Payment methods: All major credit cards, PayPal, Apple Pay

Common issues you can help with:
- Order tracking and delivery estimates
- Product recommendations and ingredient questions
- Return/exchange process
- General product information
- Shipping address changes (only before label is printed)

Be friendly, professional, and helpful. If customers need to change shipping addresses, direct them to use the order update form. For complex issues, recommend contacting customer service directly.

Keep responses concise and helpful. Always maintain a warm, professional tone that reflects the luxury nature of the brand.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const assistantResponse = response.choices[0].message.content;
      res.json({ response: assistantResponse });
    } catch (error) {
      console.error("Error with AI assistant:", error);
      res.status(500).json({ 
        response: "I'm having trouble connecting right now. Please contact our customer service team directly for immediate assistance." 
      });
    }
  });

  // Order shipping update API
  app.post("/api/update-shipping", async (req, res) => {
    try {
      const { orderNumber, email, firstName, lastName, newAddress, newCity, newState, newZip } = req.body;
      
      if (!orderNumber || !email || !firstName || !lastName) {
        return res.status(400).json({ 
          message: "Order number, email, first name, and last name are required" 
        });
      }

      // Find the order by number and verify customer details
      const order = await storage.getOrderByNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ 
          message: "Order not found. Please check your order number." 
        });
      }

      // Verify customer details match
      if (order.email.toLowerCase() !== email.toLowerCase() || 
          order.firstName.toLowerCase() !== firstName.toLowerCase() || 
          order.lastName.toLowerCase() !== lastName.toLowerCase()) {
        return res.status(403).json({ 
          message: "Customer information doesn't match our records." 
        });
      }

      // Check if shipping label has been printed (using order status as proxy)
      if (order.status === 'shipped' || order.status === 'delivered') {
        return res.status(400).json({ 
          message: "Sorry, the shipping label has already been printed and we cannot modify the address. Please contact customer service for assistance." 
        });
      }

      // Update shipping address
      const updatedOrder = await storage.updateOrderShipping(order.id, {
        shippingAddress: newAddress || order.shippingAddress,
        shippingCity: newCity || order.shippingCity,
        shippingState: newState || order.shippingState,
        shippingZip: newZip || order.shippingZip
      });

      res.json({ 
        message: "Shipping address updated successfully",
        order: updatedOrder 
      });
    } catch (error) {
      console.error("Error updating shipping address:", error);
      res.status(500).json({ 
        message: "Failed to update shipping address. Please contact customer service." 
      });
    }
  });

  // Ensure admin routes are handled by the client-side router
  app.get("/admin*", (req, res, next) => {
    // Let the SPA handle this route
    next();
  });

  const httpServer = createServer(app);
  // Newsletter subscription with automatic discount code
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Valid email is required" });
      }

      // Check if email is already subscribed
      const existingSubscriber = await storage.getNewsletterSubscriber(email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      // Generate unique discount code
      const discountCode = `WELCOME${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      // Create discount code (10% off, single use)
      const newDiscountCode = await storage.createDiscountCode({
        code: discountCode,
        type: "percentage",
        value: "10.00",
        isActive: true,
        usageLimit: 1,
        usedCount: 0,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days expiry
      });

      // Create newsletter subscriber with discount code
      const subscriber = await storage.createNewsletterSubscriber({
        email,
        discountCodeId: newDiscountCode.id,
        isActive: true
      });

      res.json({ 
        success: true, 
        discountCode: discountCode,
        message: "Successfully subscribed! Your 10% discount code has been created." 
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Get discount code for email (for checkout)
  app.get("/api/discount/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const subscriber = await storage.getNewsletterSubscriber(email);
      
      if (!subscriber || !subscriber.discountCodeId) {
        return res.status(404).json({ message: "No discount code found for this email" });
      }

      const discountCode = await storage.getDiscountCode(subscriber.discountCodeId);
      
      if (!discountCode || !discountCode.isActive || discountCode.usedCount >= (discountCode.usageLimit || 1)) {
        return res.status(404).json({ message: "Discount code is no longer valid" });
      }

      res.json({ 
        code: discountCode.code,
        type: discountCode.type,
        value: discountCode.value,
        isValid: true
      });
    } catch (error) {
      console.error("Get discount code error:", error);
      res.status(500).json({ message: "Failed to retrieve discount code" });
    }
  });

  // Apply discount code at checkout
  app.post("/api/discount/apply", async (req, res) => {
    try {
      const { code, email, orderId } = req.body;
      
      const discountCode = await storage.getDiscountCodeByCode(code);
      
      if (!discountCode || !discountCode.isActive) {
        return res.status(400).json({ message: "Invalid discount code" });
      }

      if (discountCode.usedCount >= (discountCode.usageLimit || 1)) {
        return res.status(400).json({ message: "Discount code has been used" });
      }

      // Check if this email is associated with this discount code
      const subscriber = await storage.getNewsletterSubscriber(email);
      if (!subscriber || subscriber.discountCodeId !== discountCode.id) {
        return res.status(400).json({ message: "This discount code is not valid for your email" });
      }

      // Mark discount as used
      await storage.useDiscountCode(discountCode.id, email, orderId);

      res.json({ 
        success: true,
        discount: {
          type: discountCode.type,
          value: discountCode.value
        }
      });
    } catch (error) {
      console.error("Apply discount error:", error);
      res.status(500).json({ message: "Failed to apply discount code" });
    }
  });

  // Password recovery system
  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Valid email is required" });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists or not for security
        return res.json({ message: "If an account with that email exists, you'll receive a password recovery email shortly." });
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).substr(2, 12).toUpperCase();
      
      // Create password reset record (expires in 24 hours)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await storage.createPasswordReset({
        email,
        tempPassword,
        isUsed: false,
        expiresAt
      });

      // Send recovery email
      try {
        await sendContactFormEmail({
          name: user.firstName || "Valued Customer",
          email: email,
          phone: "",
          subject: "Password Recovery - Elixíe Account",
          message: `Hello ${user.firstName || "there"},

We received a request to reset your Elixíe account password.

Your temporary password is: ${tempPassword}

This temporary password will expire in 24 hours for your security.

To reset your password:
1. Log in using your email and this temporary password
2. You'll be prompted to create a new permanent password
3. Your new password will replace this temporary one

If you didn't request this password reset, please contact our support team immediately.

Best regards,
The Elixíe Team`
        });

        res.json({ message: "If an account with that email exists, you'll receive a password recovery email shortly." });
      } catch (emailError) {
        console.error("Failed to send recovery email:", emailError);
        res.status(500).json({ message: "Unable to send recovery email. Please try again later." });
      }
    } catch (error) {
      console.error("Password recovery error:", error);
      res.status(500).json({ message: "Password recovery failed. Please try again." });
    }
  });

  // Login with temporary password and force password change
  app.post("/api/auth/login-temp", async (req, res) => {
    try {
      const { email, tempPassword } = req.body;
      
      // Validate temp password
      const passwordReset = await storage.getValidPasswordReset(email, tempPassword);
      if (!passwordReset) {
        return res.status(401).json({ message: "Invalid or expired temporary password" });
      }

      // Get user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Account not found" });
      }

      // Set session but mark as requiring password change
      (req.session as any).userId = user.id;
      (req.session as any).requiresPasswordChange = true;
      (req.session as any).passwordResetId = passwordReset.id;

      res.json({ 
        message: "Temporary login successful. Please set a new password.",
        requiresPasswordChange: true,
        user: { id: user.id, email: user.email, username: user.username }
      });
    } catch (error) {
      console.error("Temp login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Change password after temp login
  app.post("/api/auth/change-password", async (req, res) => {
    try {
      const { newPassword } = req.body;
      const userId = (req.session as any).userId;
      const passwordResetId = (req.session as any).passwordResetId;
      const requiresPasswordChange = (req.session as any).requiresPasswordChange;

      if (!userId || !requiresPasswordChange || !passwordResetId) {
        return res.status(401).json({ message: "Unauthorized. Please log in with temporary password first." });
      }

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await storage.updateUser(userId, { password: hashedPassword });

      // Mark password reset as used
      await storage.markPasswordResetAsUsed(passwordResetId);

      // Clear password change requirement from session
      delete (req.session as any).requiresPasswordChange;
      delete (req.session as any).passwordResetId;

      res.json({ message: "Password successfully updated. You can now log in with your new password." });
    } catch (error) {
      console.error("Password change error:", error);
      res.status(500).json({ message: "Failed to update password" });
    }
  });

  return httpServer;
}
