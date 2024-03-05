"use client";
import { BagCard, StoreContext } from "@/components";
import { CartItem, CartProduct, Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const OrderConfirmationPage = ({ params }: { params: { id: string } }) => {
  const orderId = params.id;
  const { setCart } = useContext(StoreContext);
  const router = useRouter();
  const [order, setOrder] = React.useState<Order>();
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  if (!orderId) {
    router.push("/");
  }
  const fetchProducts = ({ ids, cart }: { ids: string[]; cart: CartItem[] }) =>
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return setLoading(false);
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

  useEffect(() => {
    fetch(`/api/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return setLoading(false);
        if (!data.order) return setLoading(false);
        setOrder(data.order);
        fetchProducts({
          ids: data.order.products.map((item: CartItem) => item.productId),
          cart: data.order.products,
        });
      });
  }, [orderId]);

  useEffect(() => {
    if (order) {
      setCart([]);
    }
  }, [order]);

  if (!order || loading) {
    return (
      <div className="flex min-h-[88vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-500">
          {loading ? "Loading..." : "No Order found"}
        </h1>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText("EG-0416");
    setCopied(true);
  };
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5 lg:px-20">
      <h1 className="max-w-md pb-5 text-center text-xl font-medium text-primary_color dark:text-white md:text-3xl">
        Thank You{" "}
        <span className="font-bold"> {order.personalInfo?.firstName}</span>,{" "}
        <br /> Your order has been received
      </h1>
      <button
        onClick={copyToClipboard}
        type="button"
        className="group flex w-full justify-center text-center text-xl font-medium text-gray-600 duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white"
      >
        <div className="relative h-6 w-6">
          <Image
            src={copied ? "/icons/check.svg" : "/icons/copy.svg"}
            alt="copy"
            fill
            sizes="100%"
            className={`${copied ? "" : "dark:invert"} opacity-60 duration-300 group-hover:scale-110 `}
          />
        </div>
        <span>Order #{order.id}</span>
      </button>
      <div className="flex w-full flex-col-reverse items-center justify-evenly rounded-md bg-gray-200 p-5 dark:bg-gray-700 sm:flex-row  lg:p-10">
        {order.personalInfo && (
          <div className=" flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-lg sm:text-2xl">
              {order.personalInfo.firstName + " " + order.personalInfo.lastName}
            </h2>
            <h3 className="text-base text-blue-800 dark:text-gray-200 sm:text-lg">
              {order.personalInfo.email}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              {order.personalInfo.state}-{order.personalInfo.streetAddress}
            </p>
          </div>
        )}
        <div className=" text-center text-primary_color dark:text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {order.total.toFixed(2)} EGP{" "}
          </h2>
          <h3 className="text-base sm:text-lg">Cash on delivery </h3>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-2 rounded-3xl border border-gray-500 p-5 md:max-w-lg ">
        <div className=" flex w-full flex-col gap-5 md:max-w-lg ">
          {cartProducts.length > 0
            ? cartProducts.map((item: CartProduct, index: number) => (
                <BagCard readonly removable {...item} key={index} />
              ))
            : "Your cart is empty"}
        </div>
        <div className="flex flex-col gap-2 border-b border-gray-500 pb-2">
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">
              Subtotal
            </p>
            <p className="  font-medium ">{order.subTotal.toFixed(2)} EGP</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">
              Discounts
            </p>
            <p className="  font-medium text-green-600 ">
              -{order.discount.toFixed(2)} EGP
            </p>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">
              Shipping
            </p>
            <p className="  font-medium ">{order.shipping.toFixed(2)} EGP</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className=" font-bold text-gray-600 dark:text-gray-300">Total</p>
          <p className="  font-medium ">{order.total.toFixed(2)} EGP</p>
        </div>
      </div>
      <Link
        href="/shop"
        className="group mt-2 flex h-12 w-full max-w-72 items-center justify-center rounded-2xl border-2 border-primary_color uppercase hover:bg-primary_color dark:border-gray-300"
      >
        <p className="text-center text-primary_color duration-500 group-hover:scale-110 group-hover:text-white dark:text-gray-300">
          Return to Shop
        </p>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;