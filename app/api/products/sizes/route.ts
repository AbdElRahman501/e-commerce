import { getAllProperties } from "@/lib";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const isFetch = req.headers.get("Sec-Fetch-Mode") === "cors";

  if (!isFetch) {
    return notFound();
  }

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
