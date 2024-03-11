import { CartProduct } from "@/types";
import Link from "next/link";
import React from "react";

const CartPricing = ({ cart }: { cart: CartProduct[] }) => {
  if (!cart.length || !cart[0]?.id) return null;
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const discount = subTotal * 0.1;
  const total = subTotal + shipping - discount;
  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-500 p-5 md:max-w-lg ">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Coupon code"
          className=" h-12 w-full rounded-2xl border border-gray-500 bg-transparent px-4  outline-none dark:placeholder:text-gray-300 "
        />
        <div>
          <button className="h-12 w-12  rounded-full bg-primary_color hover:bg-gray-900 ">
            <span className="m-auto block -translate-y-[1px] translate-x-[1px] text-3xl  text-white hover:scale-110">
              &#43;
            </span>
          </button>
        </div>
      </div>
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
      <Link
        href="/shop"
        className="w-full text-center text-xs  text-primary_color underline hover:no-underline dark:text-white sm:text-sm"
      >
        Add 200EGP more to enjoy FREE SHIPPING
      </Link>
    </div>
  );
};

export default CartPricing;
