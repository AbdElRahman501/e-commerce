import { OfferType } from "@/types";
import { connectToDatabase } from "../mongoose";
import Offer from "../models/offer.model";

export async function fetchOffers(): Promise<OfferType[]> {
  try {
    await connectToDatabase();
    const data = await Offer.find({});
    const offers: OfferType[] = JSON.parse(JSON.stringify(data));
    return offers;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
