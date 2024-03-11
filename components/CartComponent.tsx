"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import BagCard from "./BagCard";
import { CartPricing, CartSkeleton, LoadingLogo, StoreContext } from ".";
import { CartProduct } from "@/types";
import { getCartProducts } from "@/utils";

const CartComponent = () => {
  const { cart } = useContext(StoreContext);
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getCartProducts(cart, setCartProducts, setLoading);
  }, [cart]);

  if (cart.length === 0 && !loading) {
    return (
      <div className="p-5 lg:px-20">
        <h1 className="pb-5 text-xl md:text-3xl">Shopping Bag</h1>

        <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
          {" "}
          <h3 className="text-xl font-bold">Your cart is empty </h3>
          <Link href="/shop" className=" underline hover:no-underline ">
            Add some products
          </Link>
        </div>
      </div>
    );
  }
  return loading || cartProducts.length === 0 ? (
    <LoadingLogo />
  ) : (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl md:text-3xl">
        Shopping Bag ({cart.length}){" "}
      </h1>
      <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
        {
          <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
            {cartProducts?.map(
              (item, index) => item.id && <BagCard {...item} key={index} />,
            )}
          </div>
        }
        <CartPricing cart={cartProducts} />
      </div>
    </div>
  );
};

export default CartComponent;
