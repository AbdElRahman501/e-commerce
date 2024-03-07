"use client";
import { BagCard, CustomInput, StoreContext } from "@/components";
import { formInputs, initialPersonalInfo } from "@/constants";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartProduct, PersonalInfo } from "@/types";
import Link from "next/link";
import { getCartProducts } from "@/utils";

const CheckOutPage = () => {
  const { cart, products } = useContext(StoreContext);
  const [data, setData] = useState<PersonalInfo>(initialPersonalInfo);
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setCartProducts(getCartProducts(cart, products));
  }, [cart, products]);

  const router = useRouter();
  const subTotal = cartProducts.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );
  const shipping = subTotal > 100 ? 0 : 10;
  const discount = subTotal * 0.1;
  const total = subTotal + shipping - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      products: cart,
      personalInfo: data,
      id: Date.now().toString(),
      subTotal: subTotal,
      shipping: shipping,
      discount: discount,
      total: total,
    };
    setLoading(true);
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order, products: cartProducts }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.orderId) return;
        setLoading(false);
        router.push(`/confirmation/${data.orderId}`);
      });
  };

  if (cart.length === 0) {
    return (
      <div className="p-5 lg:px-20">
        <h1 className="pb-5 text-xl md:text-3xl">Check Out</h1>

        <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
          {" "}
          <h3 className="text-xl font-bold">
            Your cart is empty, you cannot checkout{" "}
          </h3>
          <Link href="/shop" className=" underline hover:no-underline ">
            Add some products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="flex w-full flex-col gap-2 ">
          <div className="flex w-full  gap-2">
            <CustomInput
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              required={true}
              minLength={2}
              maxLength={30}
              data={data}
              setData={setData}
            />
            <CustomInput
              label="Last Name"
              type="text"
              placeholder="Enter your Last name"
              name="lastName"
              required={true}
              minLength={2}
              maxLength={30}
              data={data}
              setData={setData}
            />
          </div>
          {formInputs.map((input, index) => (
            <CustomInput key={index} {...input} data={data} setData={setData} />
          ))}
        </div>
        <div className="flex w-full flex-col gap-5 ">
          <h1 className="pb-5 text-xl font-semibold md:text-3xl">Your Order</h1>

          {cartProducts.map((item, index) => (
            <BagCard readonly {...item} key={index} />
          ))}

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
              <p className="  font-medium ">{shipping.toFixed(2)} EGP</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">Total</p>
            <p className="  font-medium ">{total.toFixed(2)} EGP</p>
          </div>

          <button
            type="submit"
            className="group mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
          >
            <p className="duration-500 group-hover:scale-110">
              {loading ? "Loading..." : `Place Order ${total.toFixed(0)} EGP`}
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
