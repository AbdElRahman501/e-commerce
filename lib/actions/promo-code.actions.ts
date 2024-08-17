"use server";
import { PromoCodeType } from "@/types";
import { connectToDatabase } from "../mongoose";
import PromoCode from "../models/promoCode.model";
import { redirect } from "next/navigation";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

export const fetchPromoCode = unstable_cache(
  async (code: string): Promise<PromoCodeType> => {
    if (!code) return {} as PromoCodeType;
    try {
      await connectToDatabase();
      const data = await PromoCode.findOne({
        code,
        limit: { $gt: 0 },
        active: true,
      });
      if (!data) return {} as PromoCodeType;
      const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
      return promoCode;
    } catch (error) {
      console.error("Error fetching coupon:", error);
      throw error;
    }
  },
  [tags.coupons],
  {
    tags: [tags.coupons],
    revalidate: 60 * 1,
  },
);

export async function fetchPromoCodeById(id: string): Promise<PromoCodeType> {
  if (!id) return {} as PromoCodeType;
  try {
    await connectToDatabase();
    const data = await PromoCode.findById(id);
    if (!data) return {} as PromoCodeType;
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    return promoCode;
  } catch (error) {
    console.error("Error fetching Promo Code by id:", error);
    throw error;
  }
}

export async function fetchPromoCodes() {
  try {
    await connectToDatabase();
    const data = await PromoCode.find({});
    const promoCodes: PromoCodeType[] = JSON.parse(JSON.stringify(data));
    return promoCodes;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    throw error;
  }
}

export async function promoCodeUse(code: string) {
  try {
    await connectToDatabase();
    await PromoCode.findOneAndUpdate(
      { code },
      { $inc: { limit: -1 } },
      { new: true },
    );
    revalidateTag(tags.coupons);
  } catch (error) {
    console.error("Error using promo code:", error);
    throw error;
  }
}

export async function updatePromoCode(formData: FormData) {
  const data = {
    id: formData.get("id")?.toString() || "",
    code: formData.get("code")?.toString() || "",
    discount: Number(formData.get("discount")) || 0,
    numItems: Number(formData.get("numItems")) || 0,
    limit: Number(formData.get("limit")) || 0,
    active: formData.get("active")?.toString() === "active" || false,
    forced: formData.get("forced")?.toString() === "forced" || false,
    maxDiscount: Number(formData.get("maxDiscount")) || 0,
  };

  try {
    await connectToDatabase();
    await PromoCode.findByIdAndUpdate(data.id, data);
    revalidateTag(tags.coupons);
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
    numItems: Number(formData.get("numItems")) || 0,
    limit: Number(formData.get("limit")) || 0,
    active: formData.get("active")?.toString() === "active" || false,
    forced: formData.get("forced")?.toString() === "forced" || false,
    maxDiscount: Number(formData.get("maxDiscount")) || 0,
  };
  try {
    await connectToDatabase();
    await PromoCode.create(data);
    revalidateTag(tags.coupons);
  } catch (error) {
    console.error("Error adding promo code:", error);
    throw error;
  }
  redirect("/dashboard/sales");
}

export async function removePromoCode(formData: FormData) {
  const id = formData.get("id")?.toString() || "";
  try {
    await connectToDatabase();
    await PromoCode.findByIdAndDelete(id);
    revalidateTag(tags.coupons);
  } catch (error) {
    console.error("Error removing promo code:", error);
    throw error;
  }
  redirect("/dashboard/sales");
}
