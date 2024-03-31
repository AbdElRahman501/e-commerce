"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { faqSection } from "@/constants";
import { AmountButton } from "@/components";
import { CartItem, ProductOnSaleType } from "@/types";
import { ProductImages } from ".";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUrl, formatPrice, getAllImages } from "@/utils";
import AddToCart from "./cart/AddToCart";
import AddToFav from "./favorite/AddToFav";

interface ProductDetailsComponent extends ProductOnSaleType {
  cart: CartItem[];
  isFav: boolean;
  preview?: boolean;
}
const ProductDetailsComponent = ({
  id,
  title,
  price,
  images,
  colors,
  sizes,
  categories,
  name,
  salePrice,
  cart,
  isFav,
  preview,
}: ProductDetailsComponent) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramColor = searchParams.get("color")?.replace("HASH:", "#") || "";
  const color: string = colors.find((c) => c === paramColor)
    ? paramColor
    : colors.length === 1
      ? colors[0]
      : "";
  const size: string = searchParams.get("size") || "";
  const amountSearchParams = searchParams.get("amount");
  const amount = amountSearchParams ? parseInt(amountSearchParams) : 1;

  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedSize, setSelectedSize] = useState<string>(size);
  const [amountValue, setAmountValue] = useState<number>(amount);

  function selectColor(color: string) {
    setSelectedColor(color);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("color", color.toString().replace("#", "HASH:"));
    const optionUrl = createUrl(pathname, newSearchParams);
    return router.replace(optionUrl, { scroll: false });
  }

  function selectSize(size: string) {
    setSelectedSize(size);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("size", size);
    const optionUrl = createUrl(pathname, newSearchParams);
    return router.replace(optionUrl, { scroll: false });
  }

  function setAmount(amount: number) {
    setAmountValue(amount);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("amount", amount.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    return router.replace(optionUrl, { scroll: false });
  }

  return (
    <div className="flex flex-col sm:flex-row sm:p-5 md:gap-4 lg:px-20">
      <ProductImages
        images={getAllImages(images)}
        selectedImage={images[selectedColor]?.[0] || ""}
        title={title}
      />
      <div className="z-10 flex flex-col gap-3 p-5 md:col-span-2 md:py-0">
        <div className="nav group w-fit text-xs text-gray-400">
          <Link
            href={"/shop"}
            className="duration-75 hover:!border-gray-600 hover:!text-gray-600 group-hover:border-gray-300 group-hover:text-gray-300  dark:hover:!border-gray-300 dark:hover:!text-gray-300 dark:group-hover:border-gray-600 dark:group-hover:text-gray-600"
          >
            Shop
          </Link>
          {categories.split(",").map((item, index) => (
            <div key={index} className="inline-block">
              <span className="mx-1 text-base">&#8250;</span>
              <Link
                href={`/shop?ctf=${item.trim()}`}
                className="duration-75 hover:!border-gray-600 hover:!text-gray-600 group-hover:border-gray-300 group-hover:text-gray-300  dark:hover:!border-gray-300 dark:hover:!text-gray-300 dark:group-hover:border-gray-600 dark:group-hover:text-gray-600"
              >
                {item}
              </Link>
            </div>
          ))}
        </div>
        <h6 className="text-lg font-bold ">{title}</h6>
        <p className="text-sm text-gray-400 ">{name}</p>
        {salePrice ? (
          <div className="flex items-center">
            <p className=" md:text-base ">{formatPrice(salePrice, "EGP")}</p>
            <sup className="text-xs text-gray-500 line-through">
              {formatPrice(price, "EGP")}
            </sup>
          </div>
        ) : (
          <p className=" font-bold  md:text-base ">
            {formatPrice(price, "EGP")}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">Size:</span>{" "}
            <strong>{selectedSize}</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => selectSize(item)}
                className={`${item === selectedSize ? " outline-2 outline-black dark:outline-white " : " outline-1 outline-gray-200 dark:outline-gray-700 "} rounded-xl p-2 px-4 text-sm outline duration-200 hover:scale-105 hover:outline-black dark:hover:outline-white`}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">Color:</span>{" "}
            <strong>{selectedColor}</strong>
          </p>
          <div className="flex flex-wrap gap-1">
            {colors.map((item, index) => (
              <button
                onClick={() => {
                  selectColor(item);
                }}
                key={index}
                className={`${item === selectedColor ? "outline-2 outline-black dark:outline-white " : "outline-1 outline-transparent"} rounded-full outline  outline-offset-2   duration-200 hover:scale-110`}
              >
                <span
                  style={{ backgroundColor: item }}
                  className="block h-7 w-7 rounded-full border border-gray-300"
                ></span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">Amount:</span>{" "}
          </p>
          <AmountButton
            className="h-10"
            amount={amountValue}
            setAmount={setAmount}
          />
        </div>
        <div
          className={` ${preview ? "hidden" : ""} mt-3 flex max-w-md items-center justify-between gap-3`}
        >
          <AddToCart
            cart={cart}
            cartItem={{
              amount: amountValue,
              productId: id,
              selectedColor,
              selectedSize,
            }}
          />
          <div className=" flex aspect-square h-14 w-14 items-center justify-center rounded-full border border-primary_bg bg-white py-1 text-lg dark:border-white ">
            <AddToFav id={id} inFav={isFav} className="invert" />
          </div>
        </div>
        <div className="mt-10">
          {faqSection.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between gap-3 border-b-2 border-gray-300 pb-3 ">
                <h1 className="question text-base font-medium duration-300 group-hover:scale-105">
                  {item.question}
                </h1>
                <h1 className="question text-2xl font-medium duration-300 group-hover:rotate-45 group-hover:scale-110  ">
                  <span>&#43;</span>
                </h1>
              </div>
              <div className="answer max-h-0 overflow-hidden text-sm font-medium text-gray-500 transition-all duration-1000  group-hover:max-h-96">
                <p className="pb-3">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
