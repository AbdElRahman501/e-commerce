import { Product } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const id = context.params.id;
  try {
    const product = await Product.findById(id);
    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: { error: `cannot find  product product with this id ${id}` },
    });
  }
}
