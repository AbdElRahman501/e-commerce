import { connectToDatabase } from "../mongoose";
import { Product } from "@/lib";
import { Product as ProductType } from "@/types";

export async function fetchProducts(): Promise<ProductType[]> {
  try {
    connectToDatabase();
    const data = await Product.find({});
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
