import { PromoCodeType } from "@/types";
import { connectToDatabase } from "../mongoose";
import PromoCode from "../models/promoCode.model";

export async function fetchPromoCode(code: string): Promise<PromoCodeType> {
  if (!code) return {} as PromoCodeType;
  try {
    await connectToDatabase();
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
    await connectToDatabase();
    const data = await PromoCode.findById(id);
    if (!data) return {} as PromoCodeType;
    const promoCode: PromoCodeType = JSON.parse(JSON.stringify(data));
    return promoCode;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
