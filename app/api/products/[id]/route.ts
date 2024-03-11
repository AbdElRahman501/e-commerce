import { Product } from "@/lib";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const isFetch = req.headers.get("Sec-Fetch-Mode") === "cors";

  if (!isFetch) {
    return notFound();
  }
  const id = context.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });
    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: { error: `cannot find  product product with this id ${id}` },
    });
  }
}
export async function PUT(req: Request, context: any) {
  const id = context.params.id;
  try {
    const { newProduct } = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct);
    return NextResponse.json({ updatedProduct });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: { error: `cannot find  product product with this id ${id}` },
    });
  }
}
export async function DELETE(req: Request, context: any) {
  const id = context.params.id;
  try {
    await Product.findOneAndDelete(id);
    return NextResponse.json({ status: 200, body: { success: true } });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: { error: `cannot find  product product with this id ${id}` },
    });
  }
}
