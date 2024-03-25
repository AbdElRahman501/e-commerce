"use server";
import { fetchOffers } from "@/lib/actions/offer.actions";
import { CartProduct } from "@/types";
import Link from "next/link";
import React from "react";
import Coupon from "./cart/Coupon";

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
    offers.find((x) => x.title === "free shipping")?.description || 0,
  );

  const subTotal = cart.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const discount = subTotal * 0.1;
  const total = subTotal + shipping - discount;

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-500 p-5 md:max-w-lg ">
      <Coupon coupon={coupon} />
      <div className="flex flex-col gap-2 border-b border-gray-500 pb-2">
        <div className="flex justify-between">
          <p className=" font-bold text-gray-600 dark:text-gray-300">
            Subtotal
          </p>
          <p className="  font-medium ">{subTotal.toFixed(2)} EGP</p>
        </div>
        <div className="flex justify-between">
          <p className=" font-bold text-gray-600 dark:text-gray-300">
            Discounts
          </p>
          <p className="  font-medium text-green-600 ">
            -{discount.toFixed(2)} EGP
          </p>
        </div>
        <div className="flex justify-between">
          <p className=" font-bold text-gray-600 dark:text-gray-300">
            Shipping
          </p>
          <p className="  font-medium ">Calculated during Checkout</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className=" font-bold text-gray-600 dark:text-gray-300">Total</p>
        <p className="  font-medium ">{total.toFixed(2)} EGP</p>
      </div>
      <Link href="/checkout">
        <button className="group mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900">
          <p className="duration-500 group-hover:scale-110">
            Proceed To Checkout
          </p>
        </button>
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
