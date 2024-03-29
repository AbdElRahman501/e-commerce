import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { Offer, Product } from "@/lib";
import {
  CategoryCount,
  FilterProps,
  OfferType,
  ProductOnSaleType,
  Product as ProductType,
} from "@/types";
import { getSalePrice, modifyProducts, sorProductPriceOffer } from "@/utils";
import { cache } from "react";

export const fetchFilteredProducts = cache(
  async ({
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
  }: FilterProps): Promise<{
    products: ProductOnSaleType[];
    count: number;
  }> => {
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

    const colorsFilter = colorFilter.map((color) =>
      color.replace("HASH:", "#"),
    );
    const keyWordsArray = keywordFilter && keywordFilter?.split(",");

    const categoryFilterCondition =
      selectedCategories?.length > 0
        ? {
            categories: {
              $in: selectedCategories.map(
                (category: string) =>
                  new RegExp(`\\b${category || ""}\\b`, "i"),
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
      sizeFilter?.length > 0
        ? {
            sizes: {
              $in: sizeFilter.map(
                (size: string) =>
                  new RegExp(`\\b${size.trim().toLowerCase()}\\b`, "i"),
              ),
            },
          }
        : {};
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
      const offers: OfferType[] = await Offer.find({});
      const data = await fetchDataBySection({
        sort,
        finalQuery,
        limit,
        offers,
      });
      const products: ProductType[] = JSON.parse(JSON.stringify(data));
      const modifiedProducts: ProductOnSaleType[] = modifyProducts(
        products,
        offers,
      );
      return { products: modifiedProducts, count };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
);
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
  offers,
}: {
  sort?: string;
  limit: number;
  finalQuery: any;
  offers: OfferType[];
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
      return sorProductPriceOffer({
        products: await Product.find(finalQuery)
          .sort({ price: 1 })
          .limit(limit),
        offers,
        ascending: true,
      });
    case "Price: High to Low":
      return sorProductPriceOffer({
        products: await Product.find(finalQuery)
          .sort({ price: -1 })
          .limit(limit),
        offers,
        ascending: false,
      });
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
export async function fetchProduct(
  id: string,
): Promise<ProductOnSaleType | null> {
  try {
    await connectToDatabase();
    const data = await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });
    const product: ProductType = JSON.parse(JSON.stringify(data));
    const offers: OfferType[] = await Offer.find({});
    const { salePrice, saleValue } = getSalePrice(offers, product);
    return { ...product, salePrice, saleValue };
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}
export async function fetchProductsById(
  ids: string[],
): Promise<ProductOnSaleType[]> {
  try {
    const objectIdArray = ids.map((id) => new mongoose.Types.ObjectId(id));
    await connectToDatabase();
    const data = await Product.find({
      _id: {
        $in: objectIdArray,
      },
    });
    const offers: OfferType[] = await Offer.find({});
    const products: ProductType[] = JSON.parse(JSON.stringify(data));
    const modifiedProducts: ProductOnSaleType[] = modifyProducts(
      products,
      offers,
    );
    return modifiedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function soldProducts(ids: string[]): Promise<void> {
  try {
    const objectIdArray = ids.map((id) => new mongoose.Types.ObjectId(id));
    await connectToDatabase();
    const data = await Product.updateMany(
      { _id: { $in: objectIdArray } },
      { $inc: { sales: 1 } },
    );
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
          categories: {
            $split: [{ $trim: { input: "$categories", chars: " " } }, ", "],
          }, // Split the trimmed categories by comma and space
        },
      },
      {
        $unwind: "$categories", // Unwind the categories array
      },
      {
        $group: {
          _id: { $toLower: { $trim: { input: "$categories", chars: " " } } }, // Convert trimmed category name to lowercase for case insensitivity
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

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    const data = await Product.findByIdAndDelete(id);
    return "Product deleted successfully";
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// export async function updateProduct(formData: FormData) {

//   const title = formData.get("title")?.toString() || "";
//   const keywords = formData.get("keywords")?.toString() || "";
//   const categories = formData.get("categories")?.toString() || "";
//   const description = formData.get("description")?.toString() || "";
//   const price = formData.get("price")?.toString() || "";
//   const minPrice = formData.get("minPrice")?.toString() || "";
//   const sizes = formData.get("sizes")?.toString() || "";

//   try {

//     await connectToDatabase();

//     const { id, ...rest } = newProduct;
//     const data = await Product.findByIdAndUpdate(id, rest, {
//       new: true,
//     });
//     const productUpdated: ProductType = JSON.parse(JSON.stringify(data));
//     return productUpdated;
//   } catch (error) {
//     console.error("Error updating product:", error);
//     throw error;
//   }
// }
