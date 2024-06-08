import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import { Product } from "@/lib";
import {
  CategoryCount,
  CollectionCount,
  FilterProps,
  OfferType,
  ProductOnSaleType,
  Product as ProductType,
  Variation,
} from "@/types";
import { getSalePrice, modifyProducts } from "@/utils";
import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";
import { notFound } from "next/navigation";
import { fetchOffers } from "./offer.actions";
import { tags } from "@/constants";
import { fetchCollections } from "./store.actions";

export const fetchFilteredProducts = unstable_cache(
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
    idsToExclude = [],
    minLimit = 0,
    collection = "",
  }: FilterProps): Promise<ProductOnSaleType[]> => {
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
                  new RegExp(`\\b${keyWord?.trim() || ""}`, "i"),
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
            "variations.options.name": {
              $in: sizeFilter.map(
                (size) => new RegExp(`\\b${size.trim().toLowerCase()}\\b`, "i"),
              ),
            },
          }
        : {};
    const colorFilterCondition =
      colorsFilter?.length > 0
        ? {
            "variations.options.name": { $in: colorsFilter },
          }
        : {};

    const genderFilterCondition = genderFilter
      ? genderFilter !== "all"
        ? { $or: [{ gender: genderFilter }, { gender: "all" }] }
        : { $or: [{ gender: "male" }, { gender: "female" }, { gender: "all" }] }
      : {};

    const collectionCondition = collection ? { collections: collection } : {};

    const objectIdArray = idsToObjectId(idsToExclude);
    const excludeCondition = { _id: { $nin: objectIdArray } };

    const finalQuery: any = {
      $and: [
        collectionCondition,
        textSearchCondition,
        categoryFilterCondition,
        keywordFilterCondition,
        priceFilterCondition,
        sizeFilterCondition,
        colorFilterCondition,
        genderFilterCondition,
        excludeCondition,
      ],
    };

    try {
      await connectToDatabase();
      const offers: OfferType[] = await fetchOffers();
      const data = await fetchDataBySection({
        sort,
        finalQuery,
        limit,
        offers,
      });
      let products: ProductType[] = JSON.parse(JSON.stringify(data));
      let modifiedProducts: ProductOnSaleType[] = modifyProducts(
        products,
        offers,
      );

      if (minLimit > products.length) {
        const countNew = await Product.countDocuments({
          $and: [excludeCondition],
        });
        const updatedFinalQuery = {
          $and: [countNew > minLimit ? excludeCondition : {}],
        };
        const additionalData = await fetchDataBySection({
          sort,
          finalQuery: updatedFinalQuery,
          limit: minLimit,
          offers,
        });
        const additionalProducts: ProductType[] = JSON.parse(
          JSON.stringify(additionalData),
        );
        products = removeDuplicatesById([...products, ...additionalProducts]);
        modifiedProducts = modifyProducts(products, offers);
      }
      return modifiedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  [tags.products],
  {
    tags: [tags.products],
    revalidate: 60 * 60 * 24,
  },
);

function removeDuplicatesById<T extends { id: string | number }>(
  array: T[],
): T[] {
  const uniqueIds: { [id: string]: boolean } = {};
  return array.filter((item) => {
    if (!uniqueIds[item.id]) {
      uniqueIds[item.id] = true;
      return true;
    }
    return false;
  });
}

export async function fetchProducts(): Promise<ProductOnSaleType[]> {
  try {
    await connectToDatabase();
    const data = await Product.find({});
    const products: ProductType[] = JSON.parse(JSON.stringify(data));
    const offers: OfferType[] = await fetchOffers();
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

export async function likeProduct(id: string) {
  try {
    await connectToDatabase();
    Product.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  } catch (error) {
    console.log(error);
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
      return await Product.find(finalQuery)
        .sort({ createdAt: -1 })
        .limit(limit);
    case "Best Sellers":
      return await Product.find(finalQuery).sort({ sales: -1 }).limit(limit);
    case "Price: Low to High":
      return await Product.find(finalQuery).sort({ price: 1 }).limit(limit);
    case "Price: High to Low":
      return await Product.find(finalQuery).sort({ price: -1 }).limit(limit);
    default:
      return await Product.find(finalQuery).limit(limit);
  }
}
export const getAllProperties = unstable_cache(
  async () => {
    try {
      await connectToDatabase();
      const products = await Product.find({}, "variations").exec();

      const sizes = new Set<string>();
      const colors = new Set<string>();

      products.forEach((product) => {
        product.variations.forEach((variation: Variation) => {
          if (variation.type === "size") {
            variation.options.forEach((option) => sizes.add(option.name));
          } else if (variation.type === "color") {
            variation.options.forEach((option) => colors.add(option.name));
          }
        });
      });

      return { sizes: Array.from(sizes), colors: Array.from(colors) };
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("Unable to fetch properties");
    }
  },
  [tags.properties],
  {
    tags: [tags.properties],
    revalidate: 60 * 60 * 24,
  },
);

export const fetchProduct = unstable_cache(
  async (id: string): Promise<ProductOnSaleType | null> => {
    try {
      await connectToDatabase();
      const data = await Product.findByIdAndUpdate(id, {
        $inc: { views: 1 },
      });
      const product: ProductType = JSON.parse(JSON.stringify(data));
      const offers: OfferType[] = await fetchOffers();
      const { salePrice, saleValue } = getSalePrice(offers, product);
      return { ...product, salePrice, saleValue };
    } catch (error) {
      console.error("Error fetching product detail:", error);
      return null;
    }
  },
  [tags.products],
  {
    tags: [tags.products],
    revalidate: 60 * 60 * 24,
  },
);

export const getProduct = cache(async (id: string) => {
  const product = await fetchProduct(id);
  if (!product) return notFound();
  return product;
});

export const fetchProductsById = unstable_cache(
  async (ids: string[]): Promise<ProductOnSaleType[]> => {
    try {
      await connectToDatabase();
      const objectIdArray = idsToObjectId(ids);
      const data = await Product.find({
        _id: {
          $in: objectIdArray,
        },
      });
      const offers: OfferType[] = await fetchOffers();
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
  },
  [tags.products],
  {
    tags: [tags.products],
    revalidate: 60 * 60 * 24,
  },
);

function idsToObjectId(array: string[]) {
  if (!array || array.length === 0) return [];
  const objectIdArray = array.map((id) => new mongoose.Types.ObjectId(id));
  return objectIdArray;
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

export const getCategoriesWithProductCount = async (
  collectionName: string,
): Promise<CategoryCount[]> => {
  try {
    await connectToDatabase();
    // Aggregate pipeline to group products by categories and count the number of products in each category
    const aggregationPipeline = [
      {
        $match: {
          collections: collectionName, // Match products that contain the collectionName in their collections array
        },
      },
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

export const getCollectionsWithCategories = unstable_cache(
  async (): Promise<CollectionCount[]> => {
    try {
      const collectionsData = await fetchCollections();
      const collections = collectionsData.map((collection) => collection.name);
      const result: CollectionCount[] = [];
      for (const collection of collections) {
        const categories = await getCategoriesWithProductCount(collection);
        const count = categories.reduce(
          (acc, category) => acc + category.count,
          0,
        );
        result.push({
          name: collection,
          count,
          categories,
        });
      }

      return result;
    } catch (error) {
      console.error("Error fetching collections with categories:", error);
      throw error;
    }
  },
  [tags.categories, tags.collections],
  {
    tags: [tags.categories, tags.collections],
    revalidate: 60 * 60 * 24,
  },
);

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    const data = await Product.findByIdAndDelete(id);
    revalidateTag(tags.products);
    revalidateTag(tags.properties);
    revalidateTag(tags.categories);
    return "Product deleted successfully";
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function updateProductById(newProduct: ProductType) {
  try {
    await connectToDatabase();
    const { id, ...rest } = newProduct;
    const data = await Product.findByIdAndUpdate(id, rest, {
      new: true,
    });
    const productUpdated: ProductType = JSON.parse(JSON.stringify(data));
    revalidateTag(tags.products);
    revalidateTag(tags.properties);
    revalidateTag(tags.categories);
    return productUpdated;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
export async function duplicateProductById(id: string) {
  try {
    await connectToDatabase();
    const data = await Product.findById(id);
    const product = JSON.parse(JSON.stringify(data));
    delete product._id;
    delete product.createdAt;
    delete product.updatedAt;
    delete product.views;
    delete product.sales;
    const newProduct: ProductType = await Product.create(product);
    revalidateTag(tags.products);
    revalidateTag(tags.properties);
    revalidateTag(tags.categories);
    return newProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

const tokenize = (text: string): string[] => {
  return text.toLowerCase().match(/\w+/g) || [];
};

const countKeywordMatches = (keywords: string[], text: string): number => {
  const keywordSet = new Set(keywords);
  const textTokens = tokenize(text);
  return textTokens.filter((token) => keywordSet.has(token)).length;
};

export const findBestMatchProducts = unstable_cache(
  async (product: ProductType, limit = 4): Promise<ProductOnSaleType[]> => {
    const keywords = tokenize(product.keywords);

    const objectIdArray = idsToObjectId([product.id]);
    const excludeCondition = { _id: { $nin: objectIdArray } };

    const finalQuery: any = {
      $and: [excludeCondition],
    };

    try {
      const data = await Product.find(finalQuery);
      const products: ProductType[] = JSON.parse(JSON.stringify(data));
      const rankedProducts = products
        .map((product) => ({
          product,
          matchCount: countKeywordMatches(keywords, product.keywords),
        }))
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, limit);

      const offers: OfferType[] = await fetchOffers();
      const modifiedProducts: ProductOnSaleType[] = modifyProducts(
        rankedProducts.map((item) => item.product),
        offers,
      );

      return modifiedProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
  [tags.products],
  { tags: [tags.products] },
);
