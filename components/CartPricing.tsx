"use server";
import { fetchOffers } from "@/lib/actions/offer.actions";
import { CartProduct } from "@/types";
import Link from "next/link";
import React from "react";
import Coupon from "./cart/Coupon";
import { fetchPromoCode } from "@/lib/actions/promo-code.actions";
import { getPricesData } from "@/utils";

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

  const { subTotal, discount, total, errorMessage } = getPricesData({
    cart,
    promoCode,
    coupon,
  });

  const restShipping =
    subTotal + 50 < freeShippingMinValue ? freeShippingMinValue - subTotal : 0;

  const isAllInStock = cart.every((x) => x.quantity > 0);
  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-300 p-5 dark:border-gray-700 md:max-w-lg ">
      <Coupon coupon={coupon} success={discount > 0} error={!!errorMessage} />
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
          <div className="flex justify-between text-sm text-green-600 dark:text-gray-300 md:text-base">
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
      {isAllInStock ? (
        <Link href={discount > 0 ? `/checkout?coupon=${coupon}` : "/checkout"}>
          <div className="group mt-2 flex h-14 w-full items-center justify-center rounded-lg bg-primary_color px-5 uppercase text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
            <p className="duration-500 group-hover:scale-110">
              Proceed To Checkout
            </p>
          </div>
        </Link>
      ) : (
        <div>
          <div className="mt-2 flex h-14 w-full items-center justify-center rounded-lg bg-gray-600 px-5 font-bold uppercase  text-red-500 ">
            <p>You have item out of stock</p>
          </div>
        </div>
      )}
      {freeShippingMinValue > 0 &&
        (restShipping ? (
          <Link
            href="/shop"
            className="w-full text-center text-xs  text-primary_color underline hover:no-underline dark:text-white sm:text-sm"
          >
            {" "}
            Add{" "}
            {restShipping.toLocaleString("en-US", {
              style: "currency",
              currency: "EGP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            more to enjoy FREE SHIPPING
          </Link>
        ) : (
          <p className="w-full text-center text-xs sm:text-sm">
            You are having free shipping 🎉🎉
          </p>
        ))}
    </div>
  );
};

export default CartPricing;
