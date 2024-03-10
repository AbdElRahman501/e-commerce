import { CartProduct, Order as OrderType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { Order } from "@/lib";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { formatOrderItems } from "@/utils";

export async function createOrder(
  order: OrderType,
  cartProducts: CartProduct[],
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer");
    let origin: string = "";

    if (referer) {
      const request = new NextRequest(referer);
      origin = request.nextUrl.origin;
    }
    connectToDatabase();
    const orderNew = new Order(order);
    const data = await orderNew.save();
    const createdOrder: OrderType = JSON.parse(JSON.stringify(data));
    sendEmail(createdOrder, cartProducts, origin);
    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

export async function fetchOrders(): Promise<OrderType[]> {
  try {
    await connectToDatabase();
    // const data = await Product.find({}).select("title price colors images");
    const data = await Order.find({});
    const products: OrderType[] = JSON.parse(JSON.stringify(data));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export const sendEmail = async (
  order: OrderType,
  cartProducts: CartProduct[],
  origin: string,
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PAGE_EMAIL,
        pass: process.env.PAGE_PASS,
      },
    });

    const filePath = path.join(process.cwd(), "public", "confirmation.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");
    const replacedHtml = htmlContent
      .replace(/{{HOST_URL}}/g, origin)
      .replace(/{{FIRST_NAME}}/g, order.personalInfo.firstName)
      .replace(/{{LAST_NAME}}/g, order.personalInfo.lastName)
      .replace(/{{EMAIL}}/g, order.personalInfo.email)
      .replace(/{{STATE}}/g, order.personalInfo.state)
      .replace(/{{STREET_ADDRESS}}/g, order.personalInfo.streetAddress)
      .replace(/{{ORDER_ID}}/g, order.id)
      .replace(/{{TOTAL}}/g, order.total.toFixed(2))
      .replace(/{{SUBTOTAL}}/g, order.subTotal.toFixed(2))
      .replace(/{{DISCOUNTS}}/g, order.discount.toFixed(2))
      .replace(/{{SHIPPING}}/g, order.shipping.toFixed(2))
      .replace(/{{INVOICE_DATE}}/g, "August 1, 2024")
      .replace(/{{PAYMENT}}/g, order.personalInfo.paymentMethod)
      .replace(/{{ITEMS}}/g, formatOrderItems(cartProducts));

    const mailOptions = {
      from: process.env.PAGE_EMAIL,
      to: order.personalInfo.email,
      subject: "Order Confirmation! 🌟",
      html: replacedHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
