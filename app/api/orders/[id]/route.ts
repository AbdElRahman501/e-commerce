import { Order } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const id = context.params.id;
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
