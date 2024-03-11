import { fetchFilteredProducts } from "@/lib";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isFetch = req.headers.get("Sec-Fetch-Mode") === "cors";

  if (!isFetch) {
    return notFound();
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const priceSorting = Number(searchParams.get("priceSorting")) || 0;
  const categoriesString: string = searchParams.get("selectedCategories") || "";
  const selectedCategories = categoriesString
    ? categoriesString.split(",")
    : [];
  const keywordFilter = searchParams.get("keywordFilter") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000;
  const limit = Number(searchParams.get("limit")) || 10;
  const genderFilter = searchParams.get("genderFilter") || "all";
  const colorsString: string = searchParams.get("colorFilter") || "";
  const colorFilter = colorsString ? colorsString.split(",") : [];
  const sizesString: string = searchParams.get("sizeFilter") || "";
  const sizeFilter = sizesString ? sizesString.split(",") : [];

  try {
    const data = await fetchFilteredProducts({
      query,
      priceSorting,
      selectedCategories,
      keywordFilter,
      minPrice,
      maxPrice,
      genderFilter,
      colorFilter,
      sizeFilter,
      limit,
    });
    const { products, count } = data;
    return NextResponse.json({ products, count });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
