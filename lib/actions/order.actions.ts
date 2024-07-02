"use server";
import {
  CartItem,
  CartProduct,
  FilterProps,
  Order as OrderType,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import { fetchProductsById, Order } from "@/lib";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import {
  formatOrderItems,
  formatPrice,
  generateCode,
  getNextWorkingDay,
  reformatCartItems,
} from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { soldProducts } from "./product.actions";
import { subscribeWithEmail } from "./users.actions";
import { promoCodeUse } from "./promo-code.actions";

export async function createOrder(formData: FormData) {
  let redirectPath = "";
  try {
    // Establish a database connection
    await connectToDatabase();

    // Retrieve cart data from cookies and parse it
    const cartData = cookies().get("cart")?.value;
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    // Fetch product details based on product IDs in the cart
    const products = await fetchProductsById(
      cart.map((item) => item.productId),
    );

    // Reformat cart items with product details
    const cartProducts: CartProduct[] = reformatCartItems(cart, products);

    // Modify cart products to include necessary pricing information
    const modifiedCartProducts: CartItem[] = cartProducts.map((item) => ({
      price: item.salePrice || item.price,
      minPrice: item.minPrice,
      productId: item.id,
      amount: item.amount,
      selectedOptions: item.selectedOptions,
    }));

    // Construct the order object
    const order = {
      id: generateCode("EG-", 6),
      products: modifiedCartProducts,
      personalInfo: {
        firstName: formData.get("firstName")!.toString(),
        lastName: formData.get("lastName")!.toString(),
        email: formData.get("email")?.toString() || "",
        phoneNumber: formData.get("phoneNumber")!.toString(),
        state: formData.get("state")!.toString(),
        city: formData.get("city")!.toString(),
        streetAddress: formData.get("streetAddress")!.toString(),
        comment: formData.get("comment")?.toString() || "",
        paymentMethod: formData.get("paymentMethod")!.toString(),
        promoCode: formData.get("promoCode")?.toString() || "",
        messageAccept: formData.get("messageAccept") ? true : false,
      },
      shipping: Number(formData.get("shipping")!),
      total: Number(formData.get("total")!),
      subTotal: Number(formData.get("subTotal")!),
      discount: Number(formData.get("discount")!),
    } as OrderType;

    // Save the order to the database
    const createdOrder = await Order.create(order);

    if (order.personalInfo.email) {
      emailHandler(createdOrder, cartProducts);
      // Subscribe user to email list if they accept
      if (order.personalInfo.messageAccept) {
        subscribeWithEmail(order.personalInfo.email);
      }
    }
    // Mark products as sold
    soldProducts(cart.map((item) => item.productId));
    // Send confirmation email if an email is provided
    // Use promo code if provided
    if (order.personalInfo.promoCode) {
      promoCodeUse(order.personalInfo.promoCode);
    }
    // Clear the cart cookies
    cookies().delete("cart");
    // Set redirect path to the order confirmation page
    redirectPath = "/confirmation/" + createdOrder.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
  // Redirect to the confirmation page
  redirect(redirectPath);
}

export async function fetchOrders(filter?: FilterProps): Promise<OrderType[]> {
  const query = filter?.query || "";
  const limit = filter?.limit || 99999;
  const trimmedQuery = query.trim().toLowerCase();

  const textSearchCondition = query
    ? {
        $or: [
          { id: { $regex: `\\b${trimmedQuery}`, $options: "i" } },
          {
            "personalInfo.firstName": {
              $regex: `\\b${trimmedQuery}`,
              $options: "i",
            },
          },
          {
            "personalInfo.lastName": {
              $regex: `\\b${trimmedQuery}`,
              $options: "i",
            },
          },
          {
            "personalInfo.phoneNumber": {
              $regex: `\\b${trimmedQuery}`,
              $options: "i",
            },
          },
          {
            "personalInfo.state": {
              $regex: `\\b${trimmedQuery}`,
              $options: "i",
            },
          },
          {
            "personalInfo.city": {
              $regex: `\\b${trimmedQuery}`,
              $options: "i",
            },
          },
        ],
      }
    : {};

  try {
    await connectToDatabase();
    const data = await Order.find(textSearchCondition)
      .sort({ createdAt: -1 })
      .limit(limit);
    const orders: OrderType[] = JSON.parse(JSON.stringify(data));
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function fetchOrder(id: string): Promise<OrderType | null> {
  try {
    await connectToDatabase();
    const data = await Order.findOne({ id: id });
    if (!data) throw new Error("Order not found");
    const order: OrderType = JSON.parse(JSON.stringify(data));
    return order;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error;
  }
}

export async function updateOrder(formData: FormData): Promise<void> {
  const id = formData.get("id")?.toString() || "";
  const status = formData.get("status")?.toString() || "";
  try {
    await connectToDatabase();
    const order = await Order.findOne({ id: id });
    if (!order) return;
    order.status = status;
    await order.save();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
  redirect("/dashboard/orders");
}

const emailHandler = (order: OrderType, cartProducts: CartProduct[]) => {
  fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order, cartProducts }),
  });
};

export const sendEmail = async (
  order: OrderType,
  cartProducts: CartProduct[],
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.PAGE_EMAIL,
        pass: process.env.PAGE_PASS,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "public",
      "confirmation-nREdE.html",
    );
    const htmlContent = fs.readFileSync(filePath, "utf8");
    const replacedHtml = htmlContent
      .replace(/{{FIRST_NAME}}/g, order.personalInfo.firstName)
      .replace(/{{LAST_NAME}}/g, order.personalInfo.lastName)
      .replace(/{{EMAIL}}/g, order.personalInfo?.email || "")
      .replace(/{{STATE}}/g, order.personalInfo.state)
      .replace(/{{EXPECTED_DELIVERY}}/g, getNextWorkingDay(order.createdAt, 4))
      .replace(/{{STREET_ADDRESS}}/g, order.personalInfo.streetAddress)
      .replace(/{{ORDER_ID}}/g, order.id)
      .replace(/{{TOTAL}}/g, formatPrice(order.total, "EGP"))
      .replace(/{{SUBTOTAL}}/g, formatPrice(order.subTotal, "EGP"))
      .replace(/{{DISCOUNTS}}/g, formatPrice(order.discount, "EGP"))
      .replace(/{{SHIPPING}}/g, formatPrice(order.shipping, "EGP"))
      .replace(/{{PAYMENT}}/g, order.personalInfo.paymentMethod)
      .replace(/{{ITEMS}}/g, formatOrderItems(cartProducts))
      .replace(/{{COUNT}}/g, cartProducts.length.toString())
      .replace(/{{HOST_URL}}/g, `${process.env.NEXT_PUBLIC_VERCEL_URL}`);

    const mailOptions = {
      from: process.env.PAGE_EMAIL,
      to: order.personalInfo.email,
      subject: "Order Confirmation! 🌟",
      html: replacedHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("order Confirmation Email sent:", info.response);

    const notificationMailOptions = {
      from: process.env.PAGE_EMAIL,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "New Order Notification",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h1 style="color: #333;">New Order Notification</h1>
      <p style="font-size: 16px;">A new order has been placed by <strong>${order.personalInfo.firstName} ${order.personalInfo.lastName}</strong>,
      with total of <strong>${formatPrice(order.total, "EGP")}</strong>.</p>
      <p><a href="${process.env.NEXT_PUBLIC_VERCEL_URL}/confirmation/${order.id}" style="color: #4CAF50; text-decoration: none;">View the new order</a></p>
      <p><a href="${process.env.NEXT_PUBLIC_VERCEL_URL}/dashboard/orders" style="color: #4CAF50; text-decoration: none;">View all orders</a></p>
      <br />
      <p style="font-size: 14px;"><strong>Total:</strong> ${formatPrice(order.total, "EGP")}</p>
      <p style="font-size: 14px;"><strong>SubTotal:</strong> ${formatPrice(order.subTotal, "EGP")}</p>
      <p style="font-size: 14px;"><strong>Shipping:</strong> ${formatPrice(order.shipping, "EGP")}</p>
      <p style="font-size: 14px;"><strong>Discount:</strong> ${formatPrice(order.discount, "EGP")}</p>
      <br />
      <h2 style="color: #333;">Personal Info</h2>
      <p style="font-size: 14px;"><strong>Name:</strong> ${order.personalInfo.firstName} ${order.personalInfo.lastName}</p>
      <p style="font-size: 14px;"><strong>Phone Number:</strong> <a  href="tel:${order.personalInfo.phoneNumber}">${order.personalInfo.phoneNumber}</a></p>
      <p style="font-size: 14px;"><strong>Email:</strong> <a  href="mailto:${order.personalInfo.email}">${order.personalInfo.email}</a></p>
      <p style="font-size: 14px;"><strong>Address:</strong> ${order.personalInfo.streetAddress}, ${order.personalInfo.city}, ${order.personalInfo.state}</p>
      <p style="font-size: 14px;"><strong>Comment:</strong> ${order.personalInfo.comment}</p>
      <p style="font-size: 14px;"><strong>Promo Code:</strong> ${order.personalInfo.promoCode}</p>
      <p style="font-size: 14px;"><strong>Payment Method:</strong> ${order.personalInfo.paymentMethod}</p>
    </div>`,
    };

    const notificationInfo = await transporter.sendMail(
      notificationMailOptions,
    );
    console.log("Notification email sent to self:", notificationInfo.response);
  } catch (error) {
    console.error("order Emails error:", error);
  }
};
