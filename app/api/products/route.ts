import { fetchProductsById } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return new Response("Hello, Next.js!");
}
export async function POST(req: Request) {
  try {
    const { ids } = await req.json();
    const products = await fetchProductsById(ids);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
