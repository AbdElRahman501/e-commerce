"use client";
import { CartProduct, OfferType, PromoCodeType } from "@/types";
import { fetchDiscount, fetchOffers } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartPricing = ({ cart }: { cart: CartProduct[] }) => {
  const [discount, setDiscount] = React.useState(0);
  const [error, setError] = React.useState("");
  const [code, setCode] = React.useState("");
  const [offers, setOffers] = React.useState<OfferType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    fetchOffers(setOffers);
  }, []);

  if (!cart.length || !cart[0]?.id) return null;

  const subTotal = cart.reduce((acc, item) => {
    const price = item.salePrice ? item.salePrice : item.price;
    return acc + price * item.amount;
  }, 0);

  const minSubTotal = cart.reduce(
    (acc, item) => acc + item.minPrice * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const total = subTotal + shipping - discount;

  const freeShippingMinValue =
    offers.find((x) => x.title === "free shipping")?.description || 0;
  const minValue = Number(freeShippingMinValue);
  const toFreeShipping = subTotal + 50 < minValue ? minValue - subTotal : 0;

  function fetchHandler(data: any) {
    setLoading(false);
    if (!data) return;
    if (data.error) setError && setError(data.error);
    if (data.discount) {
      const discountOffer: PromoCodeType = data.discount;
      const discountPercentage = discountOffer.discount / 100 || 0;
      const discountValue = Math.ceil(discountPercentage * subTotal);
      if (subTotal - discountValue > minSubTotal) {
        setDiscount(discountValue);
        setSuccess(true);
      } else {
        setError("You can't use this coupon");
      }
      setError("");
    }
  }

  function handlePromoCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const code = val.promoCode as HTMLInputElement;
    setCode(code.value);
    setLoading(true);
    fetchDiscount(code.value, fetchHandler);
  }

  return (
    <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-500 p-5 md:max-w-lg ">
      <form onSubmit={handlePromoCode} className="flex gap-2">
        <input
          type="text"
          name="promoCode"
          onChange={() => setSuccess(false)}
          placeholder="Coupon code"
          className=" h-12 w-full rounded-2xl border border-gray-500 bg-transparent px-4  outline-none dark:placeholder:text-gray-300 "
        />
        <div>
          <button
            type="submit"
            disabled={loading || success}
            className="enabled:group h-12  w-12 rounded-full bg-primary_color enabled:hover:bg-gray-900 "
          >
            {loading ? (
              <div className="m-auto block group-hover:scale-110">
                <div className="flex items-center justify-center gap-1 dark:invert">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
                </div>
              </div>
            ) : success ? (
              <div className="flex items-center justify-center">
                <Image
                  src={"/icons/check.svg"}
                  alt="cart icon"
                  width={24}
                  height={24}
                  className="w-auto duration-300 "
                />
              </div>
            ) : (
              <span className="m-auto block -translate-y-[1px] translate-x-[1px] text-3xl  text-white group-hover:scale-110">
                &#43;
              </span>
            )}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
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
      <Link href={`/checkout?code=${discount && code}`}>
        <button className="group mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900">
          <p className="duration-500 group-hover:scale-110">
            Proceed To Checkout
          </p>
        </button>
      </Link>
      {toFreeShipping > 0 && (
        <Link
          href="/shop"
          className="w-full text-center text-xs  text-primary_color underline hover:no-underline dark:text-white sm:text-sm"
        >
          {`Add ${toFreeShipping} EGP more to enjoy FREE SHIPPING`}
        </Link>
      )}
    </div>
  );
};

export default CartPricing;
