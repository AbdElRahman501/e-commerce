import { createOrder, fetchOrders } from "@/lib";
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

export async function GET(req: Request) {
  try {
    const orders = await fetchOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to fetch profile data" },
    });
  }
}
