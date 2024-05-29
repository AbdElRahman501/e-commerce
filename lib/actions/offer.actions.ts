"use server";
import { OfferType } from "@/types";
import { connectToDatabase } from "../mongoose";
import Offer from "../models/offer.model";
import { redirect } from "next/navigation";
import { revalidateTag, unstable_cache } from "next/cache";
import { tags } from "@/constants";

export const fetchOffers = unstable_cache(
  async (): Promise<OfferType[]> => {
    try {
      await connectToDatabase();
      const data = await Offer.find({});
      const offers: OfferType[] = JSON.parse(JSON.stringify(data));
      return offers;
    } catch (error) {
      console.error("Error fetching Offers:", error);
      throw error;
    }
  },
  [tags.offers],
  {
    tags: [tags.offers],
    revalidate: 60 * 60 * 24,
  },
);

export const addNewOffer = async (formData: FormData) => {
  const data = {
    title: formData.get("title")?.toString() || "",
    url: formData.get("url")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    sale: Number(formData.get("sale")) || 0,
    image: formData.get("image")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    active: formData.get("active")?.toString() === "active" || false,
  };
  try {
    await connectToDatabase();
    await Offer.create(data);
    revalidateTag(tags.offers);
    revalidateTag(tags.products);
  } catch (error) {
    console.error("Error adding new Offer:", error);
    throw error;
  }
  redirect("/dashboard/sales");
};

export const removeOffer = async (formData: FormData) => {
  const id = formData.get("id")?.toString() || "";
  try {
    await connectToDatabase();
    await Offer.findByIdAndDelete(id);
    revalidateTag(tags.offers);
    revalidateTag(tags.products);
  } catch (error) {
    console.error("Error removing Offer:", error);
    throw error;
  }
  redirect("/dashboard/sales");
};

export const updateOffer = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    title: formData.get("title")?.toString() || "",
    url: formData.get("url")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    sale: Number(formData.get("sale")) || 0,
    image: formData.get("image")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    active: formData.get("active")?.toString() === "active" || false,
  };
  try {
    await connectToDatabase();
    await Offer.findByIdAndUpdate(data.id, data);
    revalidateTag(tags.offers);
    revalidateTag(tags.products);
  } catch (error) {
    console.error("Error updating Offer:", error);
    throw error;
  }
  redirect("/dashboard/sales");
};
