import { createOrder, fetchOrders } from "@/lib";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { order, products } = await req.json();
    const createdOrder = await createOrder(order, products);
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
