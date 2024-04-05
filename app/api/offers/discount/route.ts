import PromoCode from "@/lib/models/promoCode.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();
  try {
    const discount = await PromoCode.findOne({
      code,
      limit: { $gt: 0 },
    });
    if (!discount) {
      return NextResponse.json({
        status: 500,
        error: "this code is not valid",
      });
    }
    return NextResponse.json({ discount });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "this code is not valid",
    });
  }
}

// export async function GET(req: Request) {
//   try {
//     await PromoCode.deleteMany({});
//     console.log("🚀 ~ GET ~ discounts:", discounts);
//     return NextResponse.json({ discounts });
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       error: "this code is not valid",
//     });
//   }
// }
