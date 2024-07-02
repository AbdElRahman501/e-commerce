import { sendEmail } from "@/lib/actions/order.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { order, cartProducts } = await req.json();
    if (order && cartProducts) {
      await sendEmail(order, cartProducts);
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({
        status: 500,
        body: { error: "Failed to send email" },
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { error: "Failed to send email" },
    });
  }
}
