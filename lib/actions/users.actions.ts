"use server";
import { redirect } from "next/navigation";
import { User } from "../models/users.model";
import { connectToDatabase } from "../mongoose";
import nodemailer from "nodemailer";
import { generateRandomCode } from "@/utils";
import PromoCode from "../models/promoCode.model";
import { SubscriberType } from "@/types";

export async function fetchUsers(): Promise<{ email: string }[]> {
  try {
    connectToDatabase();
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
    connectToDatabase();
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
    connectToDatabase();
    const user = await User.create({ email });
    if (user) sendPromoEmail(user);
    redirect("/?customer_posted=true");
  } catch (error) {
    redirect("/?customer_posted=true");
  }
}

export async function subscribeWithEmail(email: string) {
  try {
    connectToDatabase();
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
      html: `<div>
      <p>Can't see this email? <a href="${emailUrl}">View in Your Browser</a></p>
    </div>
    <img src="path_to_your_logo_image" alt="Logo">
    <img src="path_to_your_image" alt="Offer Image">
    <h2>HERE'S 15% OFF</h2>
    <p>Enter the Code below to get 15% off your next purchase</p>
    <p><b>${promoCode.code}</b></p>
    <button style="background-color: #4CAF50; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
                    border-radius: 12px;">Shop Now</button>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Subscribe confirmation Email sending error:", error);
  }
};
