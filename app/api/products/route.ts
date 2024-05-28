import { Product } from "@/lib";
import { connectToDatabase } from "@/lib/mongoose";
import baseProducts from "@/constants/products.json";
import { Product as ProductType } from "@/types";
import { revalidateTag } from "next/cache";
import { tags } from "@/constants";

function updateProducts(products: any[]): ProductType[] {
  return products.map((product) => {
    product.images = Object.values(product.images).flat();
    return product;
  });
}
export async function GET() {
  await connectToDatabase();
  // Product.collection.drop();
  // const products = await Product.insertMany(updateProducts(baseProducts));
  // revalidateTag(tags.products);
  const products = await Product.find({});
  return new Response(JSON.stringify(products));
  // return new Response(JSON.stringify({ message: " request success" }));
}
