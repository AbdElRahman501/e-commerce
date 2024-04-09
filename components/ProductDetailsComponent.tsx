"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CartItem, ProductOnSaleType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUrl, formatPrice, getAllImages } from "@/utils";
import dynamic from "next/dynamic";
import { toggleFav } from "./actions/fav.actions";
import Image from "next/image";

const AddToCart = dynamic(() => import("./cart/AddToCart"), { ssr: false });
const AmountButton = dynamic(() => import("./AmountButton"), { ssr: false });
const ProductImages = dynamic(() => import("./ProductImages"));

const CustomForm = dynamic(() => import("./CustomForm"));
const SubmitButton = dynamic(() => import("./SubmitButton"));
const HeartIcon = dynamic(() => import("./icons/HeartIcon"));
const FAQCard = dynamic(() => import("./FAQCard"));

const description: {
  title: string;
  content: {
    title?: string;
    list?: string[];
    images?: string[];
    description?: string;
  }[];
}[] = [
  {
    title: "customization",
    content: [
      {
        title: "printing",
        list: ["type: DTF Printing"],
      },
    ],
  },
  {
    title: "size chart",
    content: [
      {
        images: [
          "https://printleteg.com/wp-content/uploads/2023/07/OVERSIZED-T-SHIRT-SIZE-CHART-PRINTLET-570x896.jpg",
        ],
      },
    ],
  },
  {
    title: "washing instructions",
    content: [
      {
        list: [
          "Wash inside out.",
          "Wash with a temperature below 30 celsius.",
          "Do not use fabric softeners.",
          "Delicate cycle on your machine is preferred Iron inside out.",
        ],
      },
    ],
  },
];

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
    <div className="max-w-8xl mx-auto flex flex-col sm:flex-row sm:p-5 md:gap-4 lg:px-20">
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
          <CustomForm
            action={toggleFav}
            data={id}
            className="flex aspect-square h-14 w-14 items-center justify-center rounded-full border border-primary_bg bg-white py-1 text-lg text-black dark:border-white "
          >
            <SubmitButton type="submit">
              {isFav ? (
                <HeartIcon
                  fillRule="nonzero"
                  className="h-6 w-6 text-red-800  duration-200 hover:scale-110"
                />
              ) : (
                <HeartIcon
                  fillRule="evenodd"
                  className="h-6 w-6  duration-200 hover:scale-110"
                />
              )}
            </SubmitButton>
          </CustomForm>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          {description.map((item, index) => (
            <FAQCard key={index} question={item.title}>
              {item.content.map((content, i) => (
                <div key={i}>
                  <p className="mt-3">{content.title || ""}</p>
                  <ul className="mt-3">
                    {content.list?.map((listItem, listIndex) => (
                      <li
                        key={listIndex}
                        className="list-inside list-disc py-1"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <p>{content.description}</p>
                  {content.images?.map((image, imageIndex) => (
                    <Image
                      key={imageIndex}
                      src={image}
                      alt="image"
                      width={200}
                      height={200}
                      className="mt-3 w-full "
                    />
                  ))}
                </div>
              ))}
            </FAQCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
