import { Product } from "@/lib";
import { NextResponse } from "next/server";

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
