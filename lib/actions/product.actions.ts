import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { Product } from "@/lib";
import { Product as ProductType } from "@/types";

export async function fetchFilteredProducts(
  properties?: any,
): Promise<ProductType[]> {
  const {
    query,
    priceSorting,
    selectedCategories,
    keywordFilter,
    minPrice,
    maxPrice,
    genderFilter,
    colorFilter,
    sizeFilter,
  } = properties || {};

  const textSearchCondition = query
    ? {
        $or: [
          { name: { $regex: `\\b${query}`, $options: "i" } },
          { title: { $regex: `\\b${query}`, $options: "i" } },
          { keywords: { $regex: `\\b${query}`, $options: "i" } },
          { categories: { $regex: `\\b${query}`, $options: "i" } },
        ],
      }
    : {};

  const categoryFilterCondition =
    selectedCategories?.length > 0
      ? {
          categories: {
            $in: selectedCategories.map(
              (category: string) => new RegExp(`\\b${category || ""}\\b`, "i"),
            ),
          },
        }
      : {};

  const keywordFilterCondition = keywordFilter
    ? {
        keywords: { $regex: `\\b${keywordFilter}\\b`, $options: "i" },
      }
    : {};

  const priceFilterCondition = {
    price: { $gte: minPrice || 0, $lte: maxPrice || 100000 },
  };

  const sizeFilterCondition =
    sizeFilter?.length > 0 ? { sizes: { $in: sizeFilter } } : {};

  const colorFilterCondition =
    colorFilter?.length > 0 ? { colors: { $in: `#${colorFilter}` } } : {};

  const genderFilterCondition = genderFilter
    ? genderFilter !== "all"
      ? { gender: genderFilter }
      : { $or: [{ gender: "male" }, { gender: "female" }] }
    : {};

  const finalQuery: any = {
    $and: [
      textSearchCondition,
      categoryFilterCondition,
      keywordFilterCondition,
      priceFilterCondition,
      sizeFilterCondition,
      colorFilterCondition,
      genderFilterCondition,
    ],
  };

  try {
    await connectToDatabase();
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
export async function fetchProducts(): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    // const data = await Product.find({}).select("title price colors images");
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
    await connectToDatabase();
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
    await connectToDatabase();
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

export const getCategoriesWithProductCount = async () => {
  try {
    await connectToDatabase();
    // Aggregate pipeline to group products by categories and count the number of products in each category
    const aggregationPipeline = [
      {
        $project: {
          categories: { $split: ["$categories", ", "] }, // Split the categories by comma and space
        },
      },
      {
        $unwind: "$categories", // Unwind the categories array
      },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id", // Rename _id to name
          count: 1,
        },
      },
    ];

    // Execute the aggregation
    const result = await Product.aggregate(aggregationPipeline);
    return result;
  } catch (error) {
    console.error("Error fetching categories with product count:", error);
    throw error;
  }
};
