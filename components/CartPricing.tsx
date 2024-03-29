"use server";
import { fetchOffers } from "@/lib/actions/offer.actions";
import { CartProduct } from "@/types";
import Link from "next/link";
import React from "react";
import Coupon from "./cart/Coupon";
import { fetchPromoCode } from "@/lib/actions/promo-code.actions";

const CartPricing = async ({
  cart,
  coupon,
}: {
  cart: CartProduct[];
  coupon: string;
}) => {
  if (!cart.length || !cart[0]?.id) return null;
  const offers = await fetchOffers();
  const freeShippingMinValue = Number(
    offers.find((x) => x.title === "FREE_SHIPPING")?.description || 0,
  );

  const promoCode = await fetchPromoCode(coupon);
  const discountPercentage = promoCode.discount / 100 || 0;

  const subTotal = cart.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.amount,
    0,
  );
  const minSubTotal = cart.reduce(
    (acc, item) => acc + item.minPrice * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const discountValue = Math.ceil(discountPercentage * subTotal);
  const discount = subTotal - discountValue > minSubTotal ? discountValue : 0;
  const total = subTotal + shipping - discount;

  const errorMessage =
    coupon && !promoCode?.code
      ? "this coupon is not valid"
      : subTotal - discountValue > minSubTotal
        ? ""
        : "You can't apply this coupon";

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-300 p-5 dark:border-gray-700 md:max-w-lg ">
      <Coupon coupon={coupon} />
      <p className="text-sm text-pink-500">{errorMessage}</p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
          <p>Subtotal</p>
          <p>
            {subTotal.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 md:text-base">
            <p>Promo Code Discount</p>
            <p>
              {discount.toLocaleString("en-US", {
                style: "currency",
                currency: "EGP",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between text-lg font-bold md:text-xl">
        <p>Total</p>
        <p>
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "EGP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-300 md:text-base">
        Taxes and shipping calculated at checkout
      </p>
      <Link href={discount > 0 ? `/checkout?coupon=${coupon}` : "/checkout"}>
        <div className="group mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900">
          <p className="duration-500 group-hover:scale-110">
            Proceed To Checkout
          </p>
        </div>
      </Link>
      {freeShippingMinValue > 0 && (
        <Link
          href="/shop"
          className="w-full text-center text-xs  text-primary_color underline hover:no-underline dark:text-white sm:text-sm"
        >
          {`Add ${subTotal + 50 < freeShippingMinValue ? freeShippingMinValue - subTotal : 0} EGP more to enjoy FREE SHIPPING`}
        </Link>
      )}
    </div>
  );
};

export default CartPricing;
