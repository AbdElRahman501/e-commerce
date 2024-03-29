import { CityType, GovernorateType } from "@/types";
import { connectToDatabase } from "../mongoose";
import { City, Governorate } from "../models/shipping.model";
import { cache } from "react";

export const fetchShipping = cache(
  async (): Promise<{
    governorate: GovernorateType[];
    cities: CityType[];
  }> => {
    try {
      await connectToDatabase();
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
);
