import { Offer } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const offers = await Offer.find({});
    return NextResponse.json({ offers });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch offers data" },
    });
  }
}
