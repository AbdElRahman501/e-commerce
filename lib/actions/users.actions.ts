"use server";
import { redirect } from "next/navigation";
import { User } from "../models/users.model";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "../mongoose";
import nodemailer from "nodemailer";
import { generateRandomCode } from "@/utils";
import PromoCode from "../models/promoCode.model";
import { PromoCodeType, SubscriberType } from "@/types";
import { cookies } from "next/headers";

export async function fetchUsers(): Promise<{ email: string }[]> {
  try {
    await connectToDatabase();
    const data = await User.find({});
    const users: { email: string }[] = JSON.parse(JSON.stringify(data));
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
  const email = formData.get("email")?.toString()?.toLowerCase()?.trim() || "";
  if (!email) return;
  try {
    await connectToDatabase();
    const user = await User.create({ email });
    if (user) sendPromoEmail(user);
    cookies().set("subscriptionState", "subscribed");
    redirect("/?customer_posted=true");
  } catch (error) {
    redirect("/?customer_posted=true");
  }
}

export async function subscribeWithEmail(email: string) {
  email = email.toLowerCase().trim();
  try {
    await connectToDatabase();
    const user = await User.create({ email });
    if (user) sendPromoEmail(user);
  } catch (error) {
    console.log(error);
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
    const data: PromoCodeType = await PromoCode.create({
      code: randomCode,
      discount: discounts,
      limit: 1,
    });
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PAGE_EMAIL,
        pass: process.env.PAGE_PASS,
      },
    });
    const filePath = path.join(process.cwd(), "public", "welcome-NwtXN.html");
    const htmlContent = fs.readFileSync(filePath, "utf8");
    const replacedHtml = htmlContent
      .replace(/{{PROMO_CODE}}/g, promoCode.code)
      .replace(/{{HOST_URL}}/g, `${process.env.NEXT_PUBLIC_VERCEL_URL}`)
      .replace(/{{DISCOUNTS}}/g, discounts.toFixed(0));
    const mailOptions = {
      from: process.env.PAGE_EMAIL,
      to: email,
      subject: "Welcome to the EH!-EGY family.🎉",
      html: replacedHtml,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Subscribe confirmation Email sending error:", error);
  }
};
