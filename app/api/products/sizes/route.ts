import { getAllProperties } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const data = await getAllProperties();
    return NextResponse.json({ allSizes: data.sizes, allColors: data.colors });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
