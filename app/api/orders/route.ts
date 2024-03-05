import { createOrder } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { order } = await req.json();
    const createdOrder = await createOrder(order);
    if (createdOrder) {
      return NextResponse.json({ orderId: createdOrder.id });
    } else {
      return NextResponse.json({
        status: 500,
        body: { error: "Failed to create order" },
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
