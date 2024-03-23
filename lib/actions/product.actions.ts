import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { Product } from "@/lib";
import { CategoryCount, FilterProps, Product as ProductType } from "@/types";
import { products as productsConst } from "@/constants";

export async function fetchFilteredProducts({
  query = "",
  selectedCategories = [],
  keywordFilter = "",
  minPrice = 0,
  maxPrice = 100000,
  genderFilter = "all",
  colorFilter = [],
  sizeFilter = [],
  limit = 10,
  sort,
}: FilterProps): Promise<{ products: ProductType[]; count: number }> {
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

  const colorsFilter = colorFilter.map((color) => color.replace("HASH:", "#"));
  const keyWordsArray = keywordFilter && keywordFilter?.split(",");

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

  const keywordFilterCondition =
    keyWordsArray && keyWordsArray?.length > 0
      ? {
          keywords: {
            $in: keyWordsArray.map(
              (keyWord: string) =>
                new RegExp(`\\b${keyWord?.trim() || ""}\\b`, "i"),
            ),
          },
        }
      : {};

  const priceFilterCondition = {
    price: { $gte: minPrice || 0, $lte: maxPrice || 100000 },
  };

  const sizeFilterCondition =
    sizeFilter?.length > 0 ? { sizes: { $in: sizeFilter } } : {};

  const colorFilterCondition =
    colorsFilter?.length > 0 ? { colors: { $in: colorsFilter } } : {};

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
    const count = await Product.countDocuments(finalQuery);
    const data = await fetchDataBySection({ sort, finalQuery, limit });
    const products: ProductType[] = JSON.parse(JSON.stringify(data));
    return { products, count };
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

async function fetchDataBySection({
  sort,
  limit,
  finalQuery,
}: {
  sort?: string;
  limit: number;
  finalQuery: any;
}) {
  ["Price: Low to High", "Price: High to Low"];
  switch (sort) {
    case "Trending":
      return await Product.find(finalQuery).sort({ views: -1 }).limit(limit);
    case "New Arrivals":
      return await Product.find(finalQuery).limit(limit);
    case "Best Sellers":
      return await Product.find(finalQuery).limit(limit);
    case "Price: Low to High":
      return await Product.find(finalQuery).sort({ price: 1 }).limit(limit);
    case "Price: High to Low":
      return await Product.find(finalQuery).sort({ price: -1 }).limit(limit);
    default:
      return await Product.find(finalQuery).limit(limit);
  }
}
export async function getAllProperties(): Promise<{
  sizes: string[];
  colors: string[];
}> {
  try {
    // Using distinct to get unique sizes
    const sizes = await Product.distinct("sizes").exec();
    const colors = await Product.distinct("colors").exec();
    return { sizes, colors };
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw new Error("Unable to fetch sizes");
  }
}
export async function insertProducts(): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    // await Product.collection.drop();
    const data = await Product.insertMany(productsConst);
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

export const getCategoriesWithProductCount = async (): Promise<
  CategoryCount[]
> => {
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
