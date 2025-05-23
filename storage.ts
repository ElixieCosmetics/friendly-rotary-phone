import {
  User,
  InsertUser,
  Product,
  InsertProduct,
  Order,
  InsertOrder,
  OrderItem,
  InsertOrderItem,
  Cart,
  InsertCart,
  CartItem,
  InsertCartItem,
  ShippingMethod,
  InsertShippingMethod,
  ContactSubmission,
  InsertContactSubmission,
  SocialMediaSetting,
  InsertSocialMediaSetting,
  BlogPost,
  InsertBlogPost,
  DiscountCode,
  InsertDiscountCode,
  DiscountUsage,
  InsertDiscountUsage,
  NewsletterSubscriber,
  InsertNewsletterSubscriber,
  PasswordReset,
  InsertPasswordReset,
  users,
  products,
  orders,
  orderItems,
  carts,
  cartItems,
  shippingMethods,
  contactSubmissions,
  socialMediaSettings,
  blogPosts,
  discountCodes,
  discountUsage,
  newsletterSubscribers,
  passwordResets
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;

  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Order methods
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<Order>): Promise<Order>;

  // Order item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Cart methods
  getCart(id: number): Promise<Cart | undefined>;
  getCartByUser(userId: number): Promise<Cart | undefined>;
  getCartBySession(sessionId: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  deleteCart(id: number): Promise<void>;

  // Cart item methods
  getCartItems(cartId: number): Promise<CartItem[]>;
  getCartItemWithProduct(cartId: number, productId: number): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, cartItem: Partial<CartItem>): Promise<CartItem>;
  deleteCartItem(id: number): Promise<void>;

  // Shipping method methods
  getShippingMethods(): Promise<ShippingMethod[]>;
  getShippingMethod(id: number): Promise<ShippingMethod | undefined>;
  createShippingMethod(shippingMethod: InsertShippingMethod): Promise<ShippingMethod>;

  // Contact submission methods
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  updateContactSubmission(id: number, submission: Partial<ContactSubmission>): Promise<ContactSubmission>;

  // Social media settings methods
  getSocialMediaSettings(): Promise<SocialMediaSetting[]>;
  createOrUpdateSocialMediaSetting(setting: InsertSocialMediaSetting): Promise<SocialMediaSetting>;

  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;

  // Discount code methods
  getDiscountCode(id: number): Promise<DiscountCode | undefined>;
  getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined>;
  createDiscountCode(discountCode: InsertDiscountCode): Promise<DiscountCode>;
  useDiscountCode(discountCodeId: number, email: string, orderId?: number): Promise<void>;

  // Newsletter subscriber methods
  getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;

  // Password reset methods
  createPasswordReset(passwordReset: InsertPasswordReset): Promise<PasswordReset>;
  getValidPasswordReset(email: string, tempPassword: string): Promise<PasswordReset | undefined>;
  markPasswordResetAsUsed(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private carts: Map<number, Cart>;
  private cartItems: Map<number, CartItem>;
  private shippingMethods: Map<number, ShippingMethod>;
  
  private currentUserId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentCartId: number;
  private currentCartItemId: number;
  private currentShippingMethodId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    this.shippingMethods = new Map();
    
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentCartId = 1;
    this.currentCartItemId = 1;
    this.currentShippingMethodId = 1;

    // Initialize with sample products and shipping methods
    this.initializeProducts();
    this.initializeShippingMethods();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const now = new Date();
    const order: Order = { ...insertOrder, id, createdAt: now };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const order = await this.getOrder(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrder = { ...order, ...orderData };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.orderNumber === orderNumber
    );
  }

  async updateOrderShipping(id: number, shippingData: { 
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingZip?: string;
  }): Promise<Order> {
    const order = await this.getOrder(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    const updatedOrder = { ...order, ...shippingData };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Order item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Cart methods
  async getCart(id: number): Promise<Cart | undefined> {
    return this.carts.get(id);
  }

  async getCartByUser(userId: number): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cart) => cart.userId === userId
    );
  }

  async getCartBySession(sessionId: string): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(
      (cart) => cart.sessionId === sessionId
    );
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.currentCartId++;
    const now = new Date();
    const cart: Cart = { ...insertCart, id, createdAt: now };
    this.carts.set(id, cart);
    return cart;
  }

  async deleteCart(id: number): Promise<void> {
    this.carts.delete(id);
  }

  // Cart item methods
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.cartId === cartId
    );
  }

  async getCartItemWithProduct(cartId: number, productId: number): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      (item) => item.cartId === cartId && item.productId === productId
    );
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, cartItemData: Partial<CartItem>): Promise<CartItem> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) {
      throw new Error(`Cart item with id ${id} not found`);
    }
    const updatedCartItem = { ...cartItem, ...cartItemData };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }

  async deleteCartItem(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  // Shipping method methods
  async getShippingMethods(): Promise<ShippingMethod[]> {
    return Array.from(this.shippingMethods.values());
  }

  async getShippingMethod(id: number): Promise<ShippingMethod | undefined> {
    return this.shippingMethods.get(id);
  }

  async createShippingMethod(insertShippingMethod: InsertShippingMethod): Promise<ShippingMethod> {
    const id = this.currentShippingMethodId++;
    const shippingMethod: ShippingMethod = { ...insertShippingMethod, id };
    this.shippingMethods.set(id, shippingMethod);
    return shippingMethod;
  }

  // Initialize with sample data
  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
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

    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });
  }

  private initializeShippingMethods() {
    const shippingMethods: InsertShippingMethod[] = [
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
      },
    ];

    shippingMethods.forEach((method) => {
      this.createShippingMethod(method);
    });
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return db.select().from(products).where(eq(products.category, category));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).where(eq(products.featured, true));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set(orderData)
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  // Order item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const [orderItem] = await db.insert(orderItems).values(insertOrderItem).returning();
    return orderItem;
  }

  // Cart methods
  async getCart(id: number): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.id, id));
    return cart;
  }

  async getCartByUser(userId: number): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    return cart;
  }

  async getCartBySession(sessionId: string): Promise<Cart | undefined> {
    const [cart] = await db.select().from(carts).where(eq(carts.sessionId, sessionId));
    return cart;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const [cart] = await db.insert(carts).values(insertCart).returning();
    return cart;
  }

  async deleteCart(id: number): Promise<void> {
    await db.delete(carts).where(eq(carts.id, id));
  }

  // Cart item methods
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return db.select().from(cartItems).where(eq(cartItems.cartId, cartId));
  }

  async getCartItemWithProduct(cartId: number, productId: number): Promise<CartItem | undefined> {
    const [item] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.productId, productId)
        )
      );
    return item;
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db.insert(cartItems).values(insertCartItem).returning();
    return cartItem;
  }

  async updateCartItem(id: number, cartItemData: Partial<CartItem>): Promise<CartItem> {
    const [cartItem] = await db
      .update(cartItems)
      .set(cartItemData)
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem;
  }

  async deleteCartItem(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  // Shipping method methods
  async getShippingMethods(): Promise<ShippingMethod[]> {
    return db.select().from(shippingMethods);
  }

  async getShippingMethod(id: number): Promise<ShippingMethod | undefined> {
    const [method] = await db.select().from(shippingMethods).where(eq(shippingMethods.id, id));
    return method;
  }

  async createShippingMethod(insertShippingMethod: InsertShippingMethod): Promise<ShippingMethod> {
    const [method] = await db.insert(shippingMethods).values(insertShippingMethod).returning();
    return method;
  }

  // Contact submission methods
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }

  async createContactSubmission(insertContactSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertContactSubmission).returning();
    return submission;
  }

  async updateContactSubmission(id: number, submissionData: Partial<ContactSubmission>): Promise<ContactSubmission> {
    const [submission] = await db.update(contactSubmissions)
      .set(submissionData)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return submission;
  }

  // Social media settings methods
  async getSocialMediaSettings(): Promise<SocialMediaSetting[]> {
    return db.select().from(socialMediaSettings);
  }

  async createOrUpdateSocialMediaSetting(setting: InsertSocialMediaSetting): Promise<SocialMediaSetting> {
    const [existingSetting] = await db.select()
      .from(socialMediaSettings)
      .where(eq(socialMediaSettings.platform, setting.platform));
    
    if (existingSetting) {
      const [updatedSetting] = await db.update(socialMediaSettings)
        .set({ url: setting.url, updatedAt: new Date() })
        .where(eq(socialMediaSettings.platform, setting.platform))
        .returning();
      return updatedSetting;
    } else {
      const [newSetting] = await db.insert(socialMediaSettings)
        .values(setting)
        .returning();
      return newSetting;
    }
  }

  async deleteContactSubmission(id: number): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return post;
  }

  async updateBlogPost(id: number, blogPostData: Partial<BlogPost>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts)
      .set(blogPostData)
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  // Discount code methods
  async getDiscountCode(id: number): Promise<DiscountCode | undefined> {
    const [code] = await db.select().from(discountCodes).where(eq(discountCodes.id, id));
    return code || undefined;
  }

  async getDiscountCodeByCode(code: string): Promise<DiscountCode | undefined> {
    const [discountCode] = await db.select().from(discountCodes).where(eq(discountCodes.code, code));
    return discountCode || undefined;
  }

  async createDiscountCode(insertDiscountCode: InsertDiscountCode): Promise<DiscountCode> {
    const [code] = await db.insert(discountCodes)
      .values(insertDiscountCode)
      .returning();
    return code;
  }

  async useDiscountCode(discountCodeId: number, email: string, orderId?: number): Promise<void> {
    // Create usage record
    await db.insert(discountUsage).values({
      discountCodeId,
      email,
      orderId: orderId || null
    });

    // Increment used count
    await db.update(discountCodes)
      .set({ usedCount: db.select().from(discountCodes).where(eq(discountCodes.id, discountCodeId)) })
      .where(eq(discountCodes.id, discountCodeId));
  }

  // Newsletter subscriber methods
  async getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email));
    return subscriber || undefined;
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db.insert(newsletterSubscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  // Password reset methods
  async createPasswordReset(insertPasswordReset: InsertPasswordReset): Promise<PasswordReset> {
    const [passwordReset] = await db.insert(passwordResets)
      .values(insertPasswordReset)
      .returning();
    return passwordReset;
  }

  async getValidPasswordReset(email: string, tempPassword: string): Promise<PasswordReset | undefined> {
    const [reset] = await db.select()
      .from(passwordResets)
      .where(
        and(
          eq(passwordResets.email, email),
          eq(passwordResets.tempPassword, tempPassword),
          eq(passwordResets.isUsed, false)
        )
      );
    
    // Check if not expired
    if (reset && reset.expiresAt > new Date()) {
      return reset;
    }
    return undefined;
  }

  async markPasswordResetAsUsed(id: number): Promise<void> {
    await db.update(passwordResets)
      .set({ isUsed: true })
      .where(eq(passwordResets.id, id));
  }
}

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
