import { Order, OrderItem, Product } from "@shared/schema";
import { MailService } from "@sendgrid/mail";
import * as nodemailer from "nodemailer";

// Initialize SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "info@sitebyte.org";
const COMPANY_NAME = "Elixíe";

// Create SendGrid mail service instance
const mailService = new MailService();
if (SENDGRID_API_KEY) {
  mailService.setApiKey(SENDGRID_API_KEY);
  const apiKeyStart = SENDGRID_API_KEY.substring(0, 3);
  console.log(`SendGrid API key configured: ${apiKeyStart}...`);
  if (apiKeyStart !== "SG.") {
    console.warn("Warning: SendGrid API key does not start with 'SG.' which is the expected format");
  }
} else {
  console.log("SendGrid API key not found");
}

// Format currency helper
const formatCurrency = (amount: number | string) => {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `$${num.toFixed(2)}`;
};

// Generate HTML order table
const generateOrderItemsTable = (
  items: Array<OrderItem & { product?: Product }>,
) => {
  return `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background-color: #f8f9fa; text-align: left;">
          <th style="padding: 10px; border: 1px solid #dee2e6;">Product</th>
          <th style="padding: 10px; border: 1px solid #dee2e6;">Quantity</th>
          <th style="padding: 10px; border: 1px solid #dee2e6;">Price</th>
          <th style="padding: 10px; border: 1px solid #dee2e6;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              item.product?.name || "Product"
            }</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${
              item.quantity
            }</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${formatCurrency(
              item.price,
            )}</td>
            <td style="padding: 10px; border: 1px solid #dee2e6;">${formatCurrency(
              parseFloat(item.price.toString()) * item.quantity,
            )}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
};

// Customer order confirmation email
export async function sendOrderConfirmationEmail(
  order: Order,
  orderItems: OrderItem[],
  products: Product[],
): Promise<void> {
  // Map order items to products
  const itemsWithDetails = orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  // Calculate subtotal
  const subtotal = itemsWithDetails.reduce(
    (sum, item) => sum + parseFloat(item.price.toString()) * item.quantity,
    0
  );

  // Create email content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #4a5568; }
        h1 { color: #2d3748; margin-bottom: 20px; }
        .order-info { background-color: #f7fafc; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { margin-top: 30px; }
        .total { font-weight: bold; font-size: 18px; margin-top: 15px; }
        .footer { margin-top: 40px; text-align: center; font-size: 14px; color: #718096; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Elixíe</div>
        <h1>Thank You for Your Order!</h1>
      </div>

      <p>Dear ${order.firstName || "Customer"},</p>
      
      <p>We're thrilled to confirm your order has been received and is being processed. Here's a summary of your purchase:</p>
      
      <div class="order-info">
        <p><strong>Order #:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt!).toLocaleDateString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod || "Credit Card"}</p>
        <p><strong>Order Status:</strong> ${order.status || "Processing"}</p>
      </div>
      
      <h2>Order Details:</h2>
      ${generateOrderItemsTable(itemsWithDetails)}
      
      <div class="summary">
        <p><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
        <p><strong>Shipping (${order.shippingMethod || "Standard"}):</strong> ${formatCurrency(order.shippingCost || "0")}</p>
        <p><strong>Tax:</strong> ${formatCurrency(parseFloat(order.total) - subtotal - parseFloat(order.shippingCost || "0"))}</p>
        <p class="total"><strong>Total:</strong> ${formatCurrency(order.total)}</p>
      </div>
      
      <h2>Shipping Information:</h2>
      <p>
        ${order.firstName || ""} ${order.lastName || ""}<br>
        ${order.shippingAddress || order.address || ""}<br>
        ${order.shippingCity || order.city || ""}, ${order.shippingState || order.state || ""} ${order.shippingPostalCode || order.postalCode || ""}<br>
        ${order.shippingCountry || order.country || ""}
      </p>
      
      ${order.trackingNumber ? `<p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : 
      `<p>You will receive tracking information once your order ships.</p>`}
      
      <p>If you have any questions or concerns about your order, please don't hesitate to <a href="mailto:support@elixie.com">contact us</a>.</p>
      
      <p>Thank you for choosing Elixíe!</p>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Elixíe | All Rights Reserved</p>
      </div>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
    Order Confirmation - Elixíe
    
    Thank you for your order! 
    
    Order #: ${order.id}
    Date: ${new Date(order.createdAt!).toLocaleDateString()}
    
    Items:
    ${itemsWithDetails
      .map(
        (item) =>
          `${item.product?.name} - Qty: ${item.quantity} - ${formatCurrency(
            item.price
          )}`
      )
      .join("\n")}
    
    Subtotal: ${formatCurrency(subtotal)}
    Shipping (${order.shippingMethod || "Standard"}): ${formatCurrency(order.shippingCost || "0")}
    Tax: ${formatCurrency(parseFloat(order.total) - subtotal - parseFloat(order.shippingCost || "0"))}
    Total: ${formatCurrency(order.total)}
    
    Shipping Address:
    ${order.firstName || ""} ${order.lastName || ""}
    ${order.shippingAddress || order.address || ""}
    ${order.shippingCity || order.city || ""}, ${order.shippingState || order.state || ""} ${order.shippingPostalCode || order.postalCode || ""}
    ${order.shippingCountry || order.country || ""}
    
    ${order.trackingNumber 
      ? `Tracking Number: ${order.trackingNumber}` 
      : "You will receive tracking information once your order ships"}
    
    Thank you for shopping with Elixíe!
  `;

  try {
    if (SENDGRID_API_KEY) {
      await mailService.send({
        to: order.email,
        from: {
          email: COMPANY_EMAIL,
          name: COMPANY_NAME,
        },
        subject: `Elixíe Order Confirmation #${order.id}`,
        text: textContent,
        html: htmlContent,
      });
      console.log(`Order confirmation email sent to ${order.email}`);
    } else {
      // Fall back to logging if no SendGrid API key
      console.log("SendGrid API key not configured. Would have sent email:");
      console.log(`To: ${order.email}`);
      console.log(`Subject: Elixíe Order Confirmation #${order.id}`);
      console.log(textContent);
    }
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}

// Company notification email when an order is placed
export async function sendOrderNotificationToCompany(
  order: Order,
  orderItems: OrderItem[],
  products: Product[],
): Promise<void> {
  // Map order items to products
  const itemsWithDetails = orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  // Calculate subtotal
  const subtotal = itemsWithDetails.reduce(
    (sum, item) => sum + parseFloat(item.price.toString()) * item.quantity,
    0
  );

  // HTML content for company notification
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 20px; }
        h1 { color: #2d3748; }
        .order-info { background-color: #f7fafc; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .customer-info { margin-bottom: 25px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Order Received!</h1>
      </div>
      
      <div class="order-info">
        <p><strong>Order #:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt!).toLocaleString()}</p>
        <p><strong>Order Status:</strong> ${order.status || "Pending"}</p>
        <p><strong>Total Amount:</strong> ${formatCurrency(order.total)}</p>
      </div>
      
      <div class="customer-info">
        <h2>Payment Information:</h2>
        <p><strong>Payment Method:</strong> ${order.paymentMethod || "PayPal"}</p>
        ${order.paymentId ? `<p><strong>Payment ID:</strong> ${order.paymentId}</p>` : ''}
        ${order.paymentStatus ? `<p><strong>Payment Status:</strong> ${order.paymentStatus}</p>` : ''}
        <p><strong>Subtotal:</strong> ${formatCurrency(subtotal)}</p>
        <p><strong>Shipping:</strong> ${formatCurrency(order.shippingCost || "0")}</p>
        <p><strong>Tax:</strong> ${formatCurrency(parseFloat(order.total) - subtotal - parseFloat(order.shippingCost || "0"))}</p>
        <p><strong>Total:</strong> ${formatCurrency(order.total)}</p>
      </div>
      
      <div class="customer-info">
        <h2>Customer Information:</h2>
        <p><strong>Name:</strong> ${order.firstName || ""} ${order.lastName || ""}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone || "Not provided"}</p>
      </div>
      
      <h2>Order Details:</h2>
      ${generateOrderItemsTable(itemsWithDetails)}
      
      <div>
        <h2>Shipping Information:</h2>
        <p><strong>Method:</strong> ${order.shippingMethod || "Standard"}</p>
        <p><strong>Cost:</strong> ${formatCurrency(order.shippingCost || "0")}</p>
        <br>
        <p><strong>Shipping Address:</strong></p>
        <p>
          ${order.firstName || ""} ${order.lastName || ""}<br>
          ${order.shippingAddress || ""}<br>
          ${order.shippingCity || ""}, ${order.shippingState || ""} ${order.shippingPostalCode || ""}<br>
          ${order.shippingCountry || ""}
        </p>
      </div>
      
      <p>Please process this order at your earliest convenience.</p>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
    NEW ORDER NOTIFICATION
    
    Order #: ${order.id}
    Date: ${new Date(order.createdAt!).toLocaleString()}
    Payment Method: ${order.paymentMethod || "Credit Card"}
    Total Amount: ${formatCurrency(order.total)}
    
    CUSTOMER INFORMATION:
    Name: ${order.firstName || ""} ${order.lastName || ""}
    Email: ${order.email}
    Phone: ${order.phone || "Not provided"}
    
    ORDER ITEMS:
    ${itemsWithDetails
      .map(
        (item) =>
          `${item.product?.name} - Qty: ${item.quantity} - ${formatCurrency(
            item.price
          )} - Subtotal: ${formatCurrency(
            parseFloat(item.price.toString()) * item.quantity
          )}`
      )
      .join("\n")}
    
    Subtotal: ${formatCurrency(subtotal)}
    Shipping (${order.shippingMethod || "Standard"}): ${formatCurrency(order.shippingCost || "0")}
    Tax: ${formatCurrency(parseFloat(order.total) - subtotal - parseFloat(order.shippingCost || "0"))}
    Total: ${formatCurrency(order.total)}
    
    SHIPPING ADDRESS:
    ${order.firstName || ""} ${order.lastName || ""}
    ${order.shippingAddress || order.address || ""}
    ${order.shippingCity || order.city || ""}, ${order.shippingState || order.state || ""} ${order.shippingPostalCode || order.postalCode || ""}
    ${order.shippingCountry || order.country || ""}
    
    Please process this order at your earliest convenience.
  `;

  try {
    if (SENDGRID_API_KEY) {
      await mailService.send({
        to: COMPANY_EMAIL,
        from: {
          email: COMPANY_EMAIL,
          name: COMPANY_NAME,
        },
        subject: `New Elixíe Order #${order.id}`,
        text: textContent,
        html: htmlContent,
      });
      console.log(`Order notification email sent to company`);
    } else {
      // Fall back to logging if no SendGrid API key
      console.log("SendGrid API key not configured. Would have sent company notification:");
      console.log(`To: ${COMPANY_EMAIL}`);
      console.log(`Subject: New Elixíe Order #${order.id}`);
      console.log(textContent);
    }
  } catch (error) {
    console.error("Error sending order notification email to company:", error);
  }
}

// Create a NodeMailer transport for Gmail
async function createNodemailerTransport() {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: COMPANY_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD // You'll need to create an app password in your Gmail account
      }
    });
  } catch (error) {
    console.error("Failed to create Nodemailer transport:", error);
    return null;
  }
}

// Send contact form email notification to company
export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  const { name, email, phone, subject, message } = formData;
  
  // HTML content for contact form notification
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 20px; }
        h1 { color: #2d3748; }
        .message-box { background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      
      <div class="message-box">
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
      
      <p>Please respond to this inquiry at your earliest convenience.</p>
    </body>
    </html>
  `;

  // Plain text version
  const textContent = `
    NEW CONTACT FORM SUBMISSION
    
    From: ${name} (${email})
    Phone: ${phone || "Not provided"}
    Subject: ${subject}
    
    Message:
    ${message}
    
    Please respond to this inquiry at your earliest convenience.
  `;

  let emailSent = false;

  // Try sending with SendGrid first if available
  if (SENDGRID_API_KEY) {
    try {
      await mailService.send({
        to: COMPANY_EMAIL,
        from: {
          email: COMPANY_EMAIL,
          name: COMPANY_NAME,
        },
        subject: `New Contact Form: ${subject}`,
        text: textContent,
        html: htmlContent,
        replyTo: email,
      });
      console.log(`Contact form email sent via SendGrid to ${COMPANY_EMAIL}`);
      emailSent = true;
    } catch (sendgridError) {
      console.error("Failed to send email with SendGrid:", sendgridError);
      // Continue to try NodeMailer if SendGrid fails
    }
  }

  // If SendGrid failed or isn't configured, try NodeMailer with Gmail
  if (!emailSent && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transport = await createNodemailerTransport();
      if (transport) {
        await transport.sendMail({
          from: `"${COMPANY_NAME}" <${COMPANY_EMAIL}>`,
          to: COMPANY_EMAIL,
          subject: `New Contact Form: ${subject}`,
          text: textContent,
          html: htmlContent,
          replyTo: email
        });
        console.log(`Contact form email sent via NodeMailer to ${COMPANY_EMAIL}`);
        emailSent = true;
      }
    } catch (nodemailerError) {
      console.error("Failed to send email with NodeMailer:", nodemailerError);
    }
  }

  // Log the submission regardless of email success
  if (!emailSent) {
    console.log("=== NEW CONTACT FORM SUBMISSION (EMAIL DELIVERY FAILED) ===");
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone || "Not provided"}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("=== END OF SUBMISSION ===");
  }
}