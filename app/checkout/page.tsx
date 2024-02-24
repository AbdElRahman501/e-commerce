"use client";
import Image from "next/image";
import React from "react";

const CheckOutPage = () => {
  return (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">Check Out</h1>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="flex w-full flex-col gap-2 ">
          <div className="flex w-full  gap-2">
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="first name">First name</label>
              <input
                type="text"
                name="first name"
                id="first name"
                placeholder="Enter your first name"
                className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label htmlFor="last name">Last Name</label>
              <input
                type="text"
                name="last name"
                id="last name"
                placeholder="Enter your last name"
                className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone number"> Phone Number </label>
            <input
              type="number"
              name="phone number"
              id="phone number"
              placeholder="Enter your phone number"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="state"> State </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter your state"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="street address"> Street Address </label>
            <input
              type="text"
              name="street address"
              id="street address"
              placeholder="Enter your street address"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="street address"> Street Address </label>
            <input
              type="text"
              name="street address"
              id="street address"
              placeholder="Enter your street address"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="comment"> Comment </label>
            <textarea
              name="comment"
              id="comment"
              placeholder="Enter your comment"
              className="h-20 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5>Payment</h5>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={true}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              ></input>
              <p>Cash on delivery</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="promo code"> Promo Code </label>
            <input
              type="text"
              name="promo code"
              id="promo code"
              placeholder="Enter your promo code"
              className="h-14 w-full rounded-2xl  border border-gray-400 bg-transparent p-2 px-4  pe-10 text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 ">
          <h1 className="pb-5 text-xl font-semibold md:text-3xl">Your Order</h1>

          <div className="relative flex w-full gap-5 border-b pb-2 ">
            <div className="aspect-card relative h-28 overflow-hidden rounded-2xl border md:h-32">
              <Image
                src={"/jacket.png"}
                alt="jacket"
                fill
                className="duration-300 hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <h2 className="font-regular w-3/4 text-sm text-primary_color dark:text-gray-300 md:text-base  ">
                name
              </h2>
              <h2 className="text-base font-bold md:text-lg">600 EGP</h2>
            </div>
            <Image
              src="/icons/remove.svg"
              alt="remove"
              width={20}
              height={20}
              className="absolute right-0 top-2 cursor-pointer duration-300 hover:scale-110"
            />
          </div>

          <div className="flex flex-col gap-2 border-b border-gray-500 pb-2">
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Subtotal
              </p>
              <p className="  font-medium ">200 EGP</p>
            </div>
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Discounts
              </p>
              <p className="  font-medium text-green-600 ">-100 EGP</p>
            </div>
            <div className="flex justify-between">
              <p className=" font-bold text-gray-600 dark:text-gray-300">
                Shipping
              </p>
              <p className="  font-medium ">100 EGP</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className=" font-bold text-gray-600 dark:text-gray-300">Total</p>
            <p className="  font-medium ">200 EGP</p>
          </div>

          <button
            type="submit"
            className="group mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
          >
            <p className="duration-500 group-hover:scale-110">
              Place Order 600 EGP
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;
