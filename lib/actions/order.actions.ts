"use server";
import { CartItem, Order as OrderType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { fetchProductsById, Order } from "@/lib";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { formatOrderItems, reformatCartItems } from "@/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    const streetAddress = formData.get("streetAddress")!.toString();
    const comment = formData.get("comment")?.toString() || "";
    const promoCode = formData.get("promoCode")?.toString() || "";
    const paymentMethod = formData.get("paymentMethod")!.toString();
    const total = Number(formData.get("total")!);
    const subTotal = Number(formData.get("subTotal")!);
    const shipping = Number(formData.get("shipping")!);
    const discount = Number(formData.get("discount")!);

    const order = {
      products: cart,
      personalInfo: {
        firstName,
        lastName,
        email,
        phoneNumber,
        state,
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
    sendEmail(createdOrder, cart);
    cookies().delete("cart");
    revalidatePath("/checkout");
    redirectPath = "/confirmation/" + createdOrder.id;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }

  redirect(redirectPath);
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
export async function fetchOrder(id: string): Promise<OrderType | null> {
  try {
    await connectToDatabase();
    const data = await Order.findByIdAndUpdate(id);
    const order: OrderType = JSON.parse(JSON.stringify(data));
    return order;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    return null;
  }
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

    const filePath = path.join(process.cwd(), "public", "confirmation.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");
    const replacedHtml = htmlContent
      .replace(/{{HOST_URL}}/g, `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
      .replace(/{{FIRST_NAME}}/g, order.personalInfo.firstName)
      .replace(/{{LAST_NAME}}/g, order.personalInfo.lastName)
      .replace(/{{EMAIL}}/g, order.personalInfo?.email || "")
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
