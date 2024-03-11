import { Order } from "@/lib";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const id = context.params.id;
  const isFetch = req.headers.get("Sec-Fetch-Mode") === "cors";

  if (!isFetch) {
    return notFound();
  }

  try {
    const order = await Order.findById(id);
    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: { error: `cannot find  order order with this id ${id}` },
    });
  }
}
