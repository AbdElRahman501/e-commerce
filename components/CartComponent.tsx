"use client";
import Link from "next/link";
import React, { useContext } from "react";
import BagCard from "./BagCard";
import { CartPricing, StoreContext } from ".";

const CartComponent = () => {
  const { cart } = useContext(StoreContext);

  if (cart.length === 0) {
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
  return (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl md:text-3xl">
        Shopping Bag ({cart.length}){" "}
      </h1>
      <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
        <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
          {cart.length > 0
            ? cart.map((item, index) => <BagCard {...item} key={index} />)
            : "Your cart is empty"}
        </div>
        <CartPricing cart={cart} />
      </div>
    </div>
  );
};

export default CartComponent;
