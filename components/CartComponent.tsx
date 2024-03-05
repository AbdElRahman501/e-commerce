"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import BagCard from "./BagCard";
import { CartPricing, StoreContext } from ".";
import { CartItem, CartProduct } from "@/types";

const CartComponent = () => {
  const { cart } = useContext(StoreContext);
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (cart.length > 0) {
      fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: cart.map((item) => item.productId) }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data) return;
          if (data.products)
            setCartProducts(
              cart.map((cartItem: CartItem) => {
                const product = data.products.find(
                  (product: CartProduct) => product.id === cartItem.productId,
                );
                if (product) {
                  return {
                    ...product,
                    amount: cartItem.amount,
                    selectedColor: cartItem.selectedColor,
                    selectedSize: cartItem.selectedSize,
                  };
                }
              }),
            );
          setLoading(false);
        });
    }
  }, [cart]);

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
  return loading ? (
    <div className="flex min-h-screen items-center justify-center p-5 text-xl lg:px-20 ">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl md:text-3xl">
        Shopping Bag ({cart.length}){" "}
      </h1>
      <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
        <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
          {cartProducts.length > 0 &&
            cartProducts.map((item, index) => (
              <BagCard {...item} key={index} />
            ))}
        </div>
        <CartPricing cart={cartProducts} />
      </div>
    </div>
  );
};

export default CartComponent;
