"use server";
import { redirect } from "next/navigation";
import { User } from "../models/users.model";
import { connectToDatabase } from "../mongoose";
import nodemailer from "nodemailer";
import path from "path";
import fs, { link } from "fs";
import {
  formatOrderItems,
  generateCode,
  generateRandomCode,
  reformatCartItems,
} from "@/utils";
import PromoCode from "../models/promoCode.model";
import { PromoCodeType, SubscriberType } from "@/types";

export async function fetchUsers(): Promise<{ email: string }[]> {
  try {
    await connectToDatabase();
    const data = await User.find({});
    const users: { email: string }[] = JSON.parse(JSON.stringify(data));
    console.log("🚀 ~ fetchUsers ~ users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchSubscriber(id: string): Promise<SubscriberType> {
  try {
    await connectToDatabase();
    const data = await User.findById(id);
    const user: SubscriberType = JSON.parse(JSON.stringify(data));
    return user;
  } catch (error) {
    console.log("🚀 ~ fetchSubscriber ~ error:", error);
    throw error;
  }
}

export async function subscribe(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  if (!email) return;
  try {
    await connectToDatabase();
    const user = await User.create({ email });
    if (user) sendPromoEmail(user);
    redirect("/?customer_posted=true");
  } catch (error) {
    redirect("/?customer_posted=true");
  }
}
export const sendPromoEmail = async (user: {
  email: string;
  _id: string;
}): Promise<void> => {
  const email = user.email;
  const id = user._id;
  try {
    const discounts = 15;
    const randomCode = generateRandomCode();
    const data = await PromoCode.create({
      code: randomCode,
      discount: discounts,
      limit: 1,
    });
    const promoCode = JSON.parse(JSON.stringify(data));
    const emailUrl =
      process.env.NEXT_PUBLIC_VERCEL_URL +
      "/subscriber/" +
      id +
      "-" +
      promoCode._id;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PAGE_EMAIL,
        pass: process.env.PAGE_PASS,
      },
    });
    // const filePath = path.join(process.cwd(), "public", "confirmation.html");
    // const htmlContent = fs.readFileSync(filePath, "utf8");
    // const replacedHtml = htmlContent
    //   .replace(/{{WEB_URL}}/g, `${emailUrl}`)
    //   .replace(/{{PROMO_CODE}}/g, promoCode)
    //   .replace(/{{DISCOUNTS}}/g, discounts.toFixed(2));
    const mailOptions = {
      from: process.env.PAGE_EMAIL,
      to: email,
      subject: "Welcome to our store! 🌟",
      html: `<div> <p>Can't see this email? </p> <a href="${emailUrl}"> View in Your Browser</a> </div> <p>Thank you for subscribing to our store. Your promo code is: <b>${promoCode.code}</b></p>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};
