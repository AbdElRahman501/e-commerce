import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BagCard = ({
  images,
  title,
  price,
  amount,
  selectedColor,
  selectedSize,
  id,
}: CartProduct) => {
  return (
    <div className="relative flex w-full gap-5 border-b pb-2 ">
      <Link
        href={{ pathname: "/product-detail", query: { id: id } }}
        className="aspect-card relative h-28 overflow-hidden rounded-2xl border md:h-32"
      >
        <Image
          src={images[selectedColor]}
          alt="jacket"
          fill
          className="duration-300 hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="font-regular w-3/4 text-sm text-primary_color dark:text-gray-300 md:text-base  ">
          {title}
        </h2>
        <h2 className="text-base font-bold md:text-lg">{price} EGP</h2>
        <div className="flex  gap-2">
          <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
            <div className={` w-12 rounded-full px-2  duration-200`}>
              <span
                style={{ backgroundColor: selectedColor }}
                className="block h-5 w-5 rounded-full border border-gray-400"
              ></span>
            </div>
            <button
              type="button"
              className="h-full w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
            >
              <Image
                src={"/icons/arrow-down.svg"}
                width={24}
                height={24}
                alt={"sort icon"}
                className="hover:invert dark:invert"
              />
            </button>
          </div>
          <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
            <p className="w-12 text-center">{selectedSize}</p>
            <button
              type="button"
              className="h-full w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
            >
              <Image
                src={"/icons/arrow-down.svg"}
                width={24}
                height={24}
                alt={"sort icon"}
                className="hover:invert dark:invert"
              />
            </button>
          </div>
          <div className="flex h-8 items-center justify-between overflow-hidden rounded-xl border border-primary_color dark:border-white ">
            <button
              type="button"
              className="w-6 flex-1 text-2xl enabled:hover:bg-primary_color enabled:hover:text-white disabled:opacity-25 "
            >
              <span>&#8722;</span>
            </button>
            <input
              type="number"
              name="amount"
              id="amount"
              min={1}
              value={amount}
              readOnly
              step={1}
              className="w-6 bg-transparent text-center outline-none "
            />
            <button
              type="button"
              className="w-6 flex-1 text-2xl hover:bg-primary_color hover:text-white"
            >
              <span>&#43;</span>
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/icons/remove.svg"
        alt="remove"
        width={20}
        height={20}
        className="absolute right-0 top-2 cursor-pointer duration-300 hover:scale-110"
      />
    </div>
  );
};

export default BagCard;
