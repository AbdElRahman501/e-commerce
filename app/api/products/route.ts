import { Product } from "@/lib";
import { connectToDatabase } from "@/lib/mongoose";
import baseProducts from "@/constants/products.json";
import { Product as ProductType } from "@/types";
import { revalidateTag } from "next/cache";

function updateProducts(products: any[]): ProductType[] {
  return products.map((product) => {
    const { sizes, colors, ...updatedProduct } = product;
    updatedProduct.collections = ["New Collection"];
    updatedProduct.content = [
      { name: "description", html: " any thing " },
      { name: "description", html: " any thing " },
    ];
    return updatedProduct;
  });
}
export async function GET() {
  await connectToDatabase();
  Product.collection.drop();
  const products = await Product.insertMany(updateProducts(baseProducts));
  revalidateTag("products");
  return new Response(JSON.stringify({ products }));
}
