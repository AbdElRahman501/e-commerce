"use client";
import { usePathname, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import { faqSection } from "@/constants";
import { AmountButton, StoreContext } from "@/components";
import { ProductOnSaleType } from "@/types";
import Image from "next/image";
import { ProductImages } from ".";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUrl, getAllImages } from "@/utils";

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
}: ProductOnSaleType) => {
  const { cart, setCart, favorite, setFavorite } =
    React.useContext(StoreContext);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const color: string = searchParams.get("color")?.replace("HASH:", "#") || "";
  const size: string = searchParams.get("size") || "";
  const amountSearchParams = searchParams.get("amount");
  const amount = amountSearchParams ? parseInt(amountSearchParams) : 1;
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>(color);
  const [selectedSize, setSelectedSize] = useState<string>(size);
  const [amountValue, setAmountValue] = useState<number>(amount);

  useEffect(() => {
    setAudio(new Audio("/sounds/short-success.mp3"));
  }, []);

  const isFav = favorite.includes(id);
  const isInCart = cart.some(
    (item) =>
      item.productId === id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize,
  );

  function addToCart() {
    if (isInCart) {
      router.push("/cart");
    } else {
      setCart((prev) => {
        return [
          ...prev,
          {
            productId: id,
            amount: amountValue,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
          },
        ];
      });
      audio?.play();
    }
  }

  function toggleFavorite() {
    setFavorite((prev) => {
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  }

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
        <h6 className="text-lg ">{title}</h6>
        <p className="text-sm text-gray-400 ">{name}</p>
        {salePrice ? (
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 line-through ">{price} EGP</p>
            <p className=" text-xl font-bold ">{salePrice} EGP</p>
          </div>
        ) : (
          <p className="text-xl font-bold">{price} EGP</p>
        )}
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-bold text-primary_color dark:text-white">
            Sizes
          </h1>
          <div className="flex flex-wrap gap-2">
            {sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => selectSize(item)}
                className={`${item === selectedSize ? "scale-110 !bg-primary_color !text-white dark:!bg-white dark:!text-primary_color" : ""} flex h-10 w-14 items-center justify-center rounded-xl border border-primary_bg py-1 text-lg text-primary_color duration-200 hover:scale-110 hover:bg-gray-300 dark:border-white dark:text-white`}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-bold text-primary_color dark:text-white">
            Colors
          </h1>
          <div className="flex flex-wrap gap-1">
            {colors.map((item, index) => (
              <button
                onClick={() => {
                  selectColor(item);
                }}
                key={index}
                className={`${item === selectedColor ? "scale-110  border-blue-900  dark:border-blue-400" : "border-transparent"} rounded-full border-2  p-1 duration-200 hover:scale-110`}
              >
                <span
                  style={{ backgroundColor: item }}
                  className="block h-10 w-10 rounded-full border border-gray-300"
                ></span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-bold text-primary_color dark:text-white">
            Amount
          </h1>
          <AmountButton
            amount={amountValue}
            setAmount={setAmount}
            width="w-10"
          />
        </div>
        <div className="mt-3 flex max-w-md items-center justify-between gap-3">
          <button
            type="button"
            onClick={addToCart}
            disabled={!selectedColor || !selectedSize || !amountValue}
            className=" flex h-12 w-full items-center gap-3 rounded-full bg-primary_color p-1 text-white duration-300 enabled:hover:bg-gray-900 disabled:opacity-70 "
          >
            <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white ">
              <Image
                src={isInCart ? "/icons/check.svg" : "/icons/cart.svg"}
                alt="cart icon"
                width={24}
                height={24}
                className="w-auto duration-300 "
              />
            </div>
            <p className="w-full text-center text-lg duration-500">
              {isInCart ? "In my cart" : "Add to cart"}
            </p>
          </button>
          <button
            type="button"
            onClick={toggleFavorite}
            className=" flex aspect-square h-12 w-12 items-center justify-center rounded-full border  border-primary_bg bg-white py-1 text-lg dark:border-white "
          >
            <div className="relative h-6 w-6">
              <Image
                src={isFav ? "/icons/heart-fill.svg" : "/icons/heart.svg"}
                alt="heart icon"
                fill
                sizes="100%"
                className="duration-200 hover:scale-125"
              />
            </div>
          </button>
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
