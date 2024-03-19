import { fetchFilteredProducts } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const filter = await req.json();
  try {
    const data = await fetchFilteredProducts(filter);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
