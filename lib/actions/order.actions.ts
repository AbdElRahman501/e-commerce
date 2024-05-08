"use server";
import { CartItem, FilterProps, Order as OrderType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { fetchProductsById, Order } from "@/lib";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import {
  formatOrderItems,
  formatPrice,
  generateCode,
  reformatCartItems,
} from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { soldProducts } from "./product.actions";
import { User } from "../models/users.model";
import { subscribeWithEmail } from "./users.actions";
import { promoCodeUse } from "./promo-code.actions";

export async function createOrder(formData: FormData) {
  let redirectPath = "";
  try {
    await connectToDatabase();
    const cartData = cookies().get("cart")?.value;
    const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

    const email = formData.get("email")?.toString() || "";
    const phoneNumber = formData.get("phoneNumber")!.toString();
    const messageAccept = formData.get("messageAccept") ? true : false;
    const firstName = formData.get("firstName")!.toString();
    const lastName = formData.get("lastName")!.toString();
    const state = formData.get("state")!.toString();
    const city = formData.get("city")!.toString();
    const streetAddress = formData.get("streetAddress")!.toString();
    const comment = formData.get("comment")?.toString() || "";
    const promoCode = formData.get("promoCode")?.toString() || "";
    const paymentMethod = formData.get("paymentMethod")!.toString();
    const total = Number(formData.get("total")!);
    const subTotal = Number(formData.get("subTotal")!);
    const shipping = Number(formData.get("shipping")!);
    const discount = Number(formData.get("discount")!);

    let orderId: string = "";
    let uniqueIdFound = false;

    while (!uniqueIdFound) {
      orderId = generateCode("EG-", 6);
      const existingOrder = await Order.findOne({ id: orderId });
      if (!existingOrder) {
        uniqueIdFound = true;
      }
    }

    const order = {
      id: orderId,
      products: cart,
      personalInfo: {
        firstName,
        lastName,
        email,
        phoneNumber,
        state,
        city,
        streetAddress,
        comment,
        paymentMethod,
        promoCode,
        messageAccept,
      },
      shipping,
      total,
      subTotal,
      discount,
    } as OrderType;
    const orderNew = new Order(order);
    const data = await orderNew.save();
    const createdOrder: OrderType = JSON.parse(JSON.stringify(data));
    soldProducts(cart.map((item) => item.productId));
    if (email) {
      sendEmail(createdOrder, cart);
      if (messageAccept) {
        subscribeWithEmail(email);
      }
    }
    if (promoCode) {
      promoCodeUse(promoCode);
    }
    cookies().delete("cart");
    redirectPath = "/confirmation/" + createdOrder.id;
  } catch (error) {
    console.error("Error creating order:", error);
  }

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
    const order: OrderType = JSON.parse(JSON.stringify(data));
    return order;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return null;
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

export const sendEmail = async (
  order: OrderType,
  cart: CartItem[],
): Promise<void> => {
  try {
    const products = await fetchProductsById(
      cart.map((item) => item.productId),
    );
    const cartProducts = reformatCartItems(cart, products);
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
      .replace(/{{STREET_ADDRESS}}/g, order.personalInfo.streetAddress)
      .replace(/{{ORDER_ID}}/g, order.id)
      .replace(/{{TOTAL}}/g, formatPrice(order.total, "EGP"))
      .replace(/{{SUBTOTAL}}/g, formatPrice(order.subTotal, "EGP"))
      .replace(/{{DISCOUNTS}}/g, formatPrice(order.discount, "EGP"))
      .replace(/{{SHIPPING}}/g, formatPrice(order.shipping, "EGP"))
      .replace(/{{INVOICE_DATE}}/g, "August 1, 2024")
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
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
