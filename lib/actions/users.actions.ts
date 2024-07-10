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
import { cookies, headers } from "next/headers";
import { fetchOffers } from "./offer.actions";

export async function fetchUsers(): Promise<{ email: string }[]> {
  try {
    await connectToDatabase();
    const data = await User.find({});
    const users: { email: string }[] = JSON.parse(JSON.stringify(data));
    return users;
  } catch (error) {
    console.error(":Error fetching users:", error);
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
  const headerList = headers();
  let path = headerList.get("referer") || "/";
  if (!email) return;
  try {
    await connectToDatabase();
    const user = await User.create({ email });
    if (user) emailHandler(user.email);
    cookies().set("subscriptionState", "subscribed");
    path = path.includes("?")
      ? path + "&customer_posted=true"
      : path + "?customer_posted=true";
  } catch (error: any) {
    if (error.code === 11000) {
      cookies().set("subscriptionState", "subscribed");
      path = path.includes("?")
        ? path + "&customer_posted=true"
        : path + "?customer_posted=true";
    }
    console.log("🚀 ~ subscribe ~ error:", error);
  }
  redirect(path);
}

export async function subscribeWithEmail(email: string) {
  email = email.toLowerCase().trim();
  try {
    await connectToDatabase();
    const user = await User.create({ email });
    if (user) emailHandler(user.email);
  } catch (error) {
    console.log(error);
  }
}

const emailHandler = (email: string) => {
  fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const sendPromoEmail = async (email: string): Promise<void> => {
  try {
    const offers = await fetchOffers();
    const offer = offers.find(
      (offer) =>
        offer.title === "subscription" && offer.category === "subscription",
    );
    const discounts = offer?.sale || 15;
    const randomCode = generateRandomCode();
    const data: PromoCodeType = await PromoCode.create({
      code: randomCode,
      discount: discounts,
      limit: 1,
    });
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
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
