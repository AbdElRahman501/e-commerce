import { getCategoriesWithProductCount } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categoriesWithProductCount = await getCategoriesWithProductCount();
    return NextResponse.json({ categoriesWithProductCount });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
