import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { Product } from "@/lib";
import { Product as ProductType } from "@/types";

export async function fetchProducts(properties?: any): Promise<ProductType[]> {
  const {
    query,
    categoryFilter,
    keywordFilter,
    minPrice,
    maxPrice,
    priceSorting,
  } = properties || {};

  const textSearchCondition = {
    $or: [
      { name: { $regex: `\\b${query || ""}`, $options: "i" } },
      { title: { $regex: `\\b${query || ""}`, $options: "i" } },
      { keywords: { $regex: `\\b${query || ""}`, $options: "i" } },
      { categories: { $regex: `\\b${query || ""}`, $options: "i" } },
    ],
  };

  const categoryFilterCondition = {
    categories: { $regex: `\\b${categoryFilter || ""}\\b`, $options: "i" },
  };

  const keywordFilterCondition = {
    keywords: { $regex: `\\b${keywordFilter || ""}\\b`, $options: "i" },
  };

  const priceFilterCondition = {
    price: { $gte: minPrice || 0, $lte: maxPrice || 10000 },
  };

  const finalQuery: any = {
    $and: [
      textSearchCondition,
      categoryFilterCondition,
      keywordFilterCondition,
      priceFilterCondition,
    ],
  };

  try {
    connectToDatabase();
    const data = priceSorting
      ? await Product.find(finalQuery).sort({ price: priceSorting })
      : await Product.find(finalQuery);
    const products: ProductType[] = JSON.parse(JSON.stringify(data));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
export async function fetchProduct(id: string): Promise<ProductType | null> {
  try {
    connectToDatabase();
    const data = await Product.findById(id);
    const product: ProductType = JSON.parse(JSON.stringify(data));
    return product;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
export async function fetchProductsById(ids: string[]): Promise<ProductType[]> {
  const objectIdArray = ids.map((id) => new mongoose.Types.ObjectId(id));
  try {
    connectToDatabase();
    const data = await Product.find({
      _id: {
        $in: objectIdArray,
      },
    });
    const products: ProductType[] = JSON.parse(JSON.stringify(data));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
