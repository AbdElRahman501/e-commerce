"use server";
import { PromoCodeType } from "@/types";
import { connectToDatabase } from "../mongoose";
import PromoCode from "../models/promoCode.model";
import { redirect } from "next/navigation";

export async function fetchPromoCode(code: string): Promise<PromoCodeType> {
  if (!code) return {} as PromoCodeType;
  try {
    connectToDatabase();
    const data = await PromoCode.findOne({
      code,
      limit: { $gt: 0 },
    });
    if (!data) return {} as PromoCodeType;
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    return promoCode;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchPromoCodeById(id: string): Promise<PromoCodeType> {
  if (!id) return {} as PromoCodeType;
  try {
    connectToDatabase();
    const data = await PromoCode.findById(id);
    if (!data) return {} as PromoCodeType;
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    return promoCode;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchPromoCodes() {
  try {
    connectToDatabase();
    const data = await PromoCode.find({});
    const promoCodes: PromoCodeType[] = JSON.parse(JSON.stringify(data));
    return promoCodes;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function promoCodeUse(code: string) {
  try {
    connectToDatabase();
    const data = await PromoCode.findOneAndUpdate(
      { code },
      { $inc: { limit: -1 } },
      { new: true },
    );
    if (!data) return;
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    return promoCode;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function updatePromoCode(formData: FormData) {
  const data = {
    id: formData.get("id")?.toString() || "",
    code: formData.get("code")?.toString() || "",
    discount: Number(formData.get("discount")) || 0,
    limit: Number(formData.get("limit")) || 0,
    active: formData.get("active")?.toString() === "active" || false,
    maxDiscount: Number(formData.get("maxDiscount")) || 0,
  };

  try {
    connectToDatabase();
    await PromoCode.findByIdAndUpdate(data.id, data);
  } catch (error) {
    console.error("Error updating promo code:", error);
    throw error;
  }
  redirect("/dashboard/sales");
}

export async function addNewPromoCode(formData: FormData) {
  const data = {
    code: formData.get("code")?.toString() || "",
    discount: Number(formData.get("discount")) || 0,
    limit: Number(formData.get("limit")) || 0,
    active: formData.get("active")?.toString() === "active" || false,
    maxDiscount: Number(formData.get("maxDiscount")) || 0,
  };
  try {
    connectToDatabase();
    await PromoCode.create(data);
  } catch (error) {
    console.error("Error adding promo code:", error);
    throw error;
  }
  redirect("/dashboard/sales");
}

export async function removePromoCode(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  try {
    connectToDatabase();
    await PromoCode.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error removing promo code:", error);
    throw error;
  }
  redirect("/dashboard/sales");
}
