"use server";
import { CityType, GovernorateType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { City, Governorate } from "../models/shipping.model";
import { cache } from "react";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

export const fetchShipping = unstable_cache(
  async (): Promise<{
    governorate: GovernorateType[];
    cities: CityType[];
  }> => {
    try {
      connectToDatabase();
      const governorateData = await Governorate.find({});
      const citiesData = await City.find({});
      const governorate: GovernorateType[] = JSON.parse(
        JSON.stringify(governorateData),
      );
      const cities: CityType[] = JSON.parse(JSON.stringify(citiesData));
      return { governorate, cities };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  ["shipping"],
  { tags: ["shipping"] },
);

export const updateGovernorate = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    governorate_name_en: formData.get("governorate_name_en")?.toString() || "",
    shipping_price: Number(formData.get("shipping_price")!),
  };
  try {
    connectToDatabase();
    await Governorate.updateOne({ id: data.id }, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/shipping");
};

export const addNewGovernorate = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    governorate_name_en: formData.get("governorate_name_en")?.toString() || "",
    shipping_price: Number(formData.get("shipping_price")!),
  };
  try {
    connectToDatabase();
    await Governorate.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/shipping");
};

export const updateCity = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    city_name_en: formData.get("city_name_en")?.toString() || "",
    shipping_price: Number(formData.get("shipping_price")!),
  };
  try {
    connectToDatabase();
    await City.updateOne({ id: data.id }, data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/shipping");
};

export const addNewCity = async (formData: FormData) => {
  const data = {
    id: formData.get("id")?.toString() || "",
    governorate_id: formData.get("governorate_id")?.toString() || "",
    city_name_en: formData.get("city_name_en")?.toString() || "",
    shipping_price: Number(formData.get("shipping_price")!),
  };
  try {
    connectToDatabase();
    await City.create(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  redirect("/dashboard/shipping");
};
