import { db } from "./db";
import { products, shippingMethods, users, carts, cartItems } from "@shared/schema";
import bcryptjs from "bcryptjs";

// Function to seed products
export async function seedProducts() {
  // Check if products already exist in the database
  const existingProducts = await db.select().from(products);
  
  if (existingProducts.length === 0) {
    console.log("Seeding products to the database...");
    
    const sampleProducts = [
      {
        name: "Elixíe Rosée Eternelle Serum",
        description: "An exquisitely formulated botanical infusion that hydrates, brightens, and revitalizes your complexion. Handcrafted with carefully selected botanicals and the powerful moisture-retaining properties of hyaluronic acid.",
        price: "48.00",
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZSUyMHNlcnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
        category: "Skincare",
        inventory: 100,
        featured: true,
      },
      {
        name: "Terra Vita Rejuvenating Mud Mask",
        description: "Experience the unparalleled purifying and rejuvenating power of nature with this expertly crafted blend of botanical extracts and mineral-rich clays, designed to renew your skin's vitality, brightness, and youthful glow.",
        price: "54.00",
        imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Skincare",
        inventory: 90,
        featured: true,
      },
      {
        name: "Velaré Radiance Crème",
        description: "A meticulously crafted, high-performance moisturizer designed to combat signs of aging, diminish wrinkles, and provide a matte finish for a refined complexion.",
        price: "68.00",
        imageUrl: "https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2UlMjBjcmVhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&h=600",
        category: "Skincare",
        inventory: 80,
        featured: true,
      }
    ];
    
    // Insert products
    await db.insert(products).values(sampleProducts);
    console.log("Products seeded successfully!");
  } else {
    console.log("Products already exist in the database, skipping seeding.");
  }
}

// Function to seed shipping methods
export async function seedShippingMethods() {
  // Check if shipping methods already exist in the database
  const existingMethods = await db.select().from(shippingMethods);
  
  if (existingMethods.length === 0) {
    console.log("Seeding shipping methods to the database...");
    
    const sampleShippingMethods = [
      {
        name: "Standard Shipping",
        description: "Delivery within 5-7 business days",
        price: "4.99",
        estimatedDelivery: "5-7 business days",
      },
      {
        name: "Express Shipping",
        description: "Delivery within 2-3 business days",
        price: "9.99",
        estimatedDelivery: "2-3 business days",
      },
      {
        name: "Next Day Delivery",
        description: "Delivery next business day (order before 2PM)",
        price: "19.99",
        estimatedDelivery: "1 business day",
      }
    ];
    
    // Insert shipping methods
    await db.insert(shippingMethods).values(sampleShippingMethods);
    console.log("Shipping methods seeded successfully!");
  } else {
    console.log("Shipping methods already exist in the database, skipping seeding.");
  }
}

// Function to seed customer profiles
export async function seedCustomerProfiles() {
  // Check if test customers already exist
  const existingUsers = await db.select().from(users);
  const testEmails = [
    "emma.davidson@gmail.com",
    "sarah.chen@outlook.com", 
    "maya.rodriguez@yahoo.com",
    "alex.thompson@gmail.com"
  ];
  
  const existingTestUsers = existingUsers.filter(user => 
    testEmails.includes(user.email)
  );
  
  if (existingTestUsers.length === 0) {
    console.log("Creating test customer profiles...");
    
    const hashedPassword = await bcryptjs.hash("skincare123", 10);
    
    const customerProfiles = [
      {
        username: "emma_davidson",
        email: "emma.davidson@gmail.com",
        password: hashedPassword,
        firstName: "Emma",
        lastName: "Davidson",
        city: "Toronto",
        address: "123 Queen Street West",
        postalCode: "M5H 2M9",
        subscribeToEmails: true
      },
      {
        username: "sarah_chen", 
        email: "sarah.chen@outlook.com",
        password: hashedPassword,
        firstName: "Sarah",
        lastName: "Chen",
        city: "Vancouver",
        address: "456 Granville Street",
        postalCode: "V6C 1V5",
        subscribeToEmails: true
      },
      {
        username: "maya_rodriguez",
        email: "maya.rodriguez@yahoo.com", 
        password: hashedPassword,
        firstName: "Maya",
        lastName: "Rodriguez",
        city: "Montreal",
        address: "789 Rue Saint-Catherine",
        postalCode: "H3B 1A1",
        subscribeToEmails: false
      },
      {
        username: "alex_thompson",
        email: "alex.thompson@gmail.com",
        password: hashedPassword,
        firstName: "Alex", 
        lastName: "Thompson",
        city: "Calgary",
        address: "321 Stephen Avenue",
        postalCode: "T2P 2K9",
        subscribeToEmails: true
      }
    ];
    
    // Insert customer profiles
    const createdUsers = await db.insert(users).values(customerProfiles).returning();
    console.log(`Created ${createdUsers.length} test customer profiles`);
    
    // Create carts for each customer and add sample products
    const allProducts = await db.select().from(products);
    
    for (const user of createdUsers) {
      // Create a cart for this user
      const [cart] = await db.insert(carts).values({
        userId: user.id,
        sessionId: `user-${user.id}-session`
      }).returning();
      
      // Add random products to each cart (1-3 items)
      const numItems = Math.floor(Math.random() * 3) + 1;
      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numItems && i < shuffledProducts.length; i++) {
        const product = shuffledProducts[i];
        const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
        
        await db.insert(cartItems).values({
          cartId: cart.id,
          productId: product.id,
          quantity: quantity,
          price: product.price
        });
      }
      
      console.log(`Added ${numItems} items to ${user.firstName}'s cart`);
    }
    
  } else {
    console.log("Test customer profiles already exist, skipping creation.");
  }
}

// Main seed function
export async function seedDatabase() {
  try {
    await seedProducts();
    await seedShippingMethods();
    await seedCustomerProfiles();
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}