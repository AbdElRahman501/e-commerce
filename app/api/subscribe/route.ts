import { sendPromoEmail } from "@/lib/actions/users.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (email) {
      await sendPromoEmail(email);
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
