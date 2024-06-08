"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CartItem, ProductOnSaleType } from "@/types";
import Link from "next/link";
import {
  addToCartCheck,
  calculateMinPrice,
  calculatePrice,
  formatPrice,
  getFirstOptionsWithSubVariants,
  getImageUrl,
  getSale,
  getSelectedOptionsFromURL,
  toggleFavoriteItem,
} from "@/utils";
import { toggleFav } from "./actions/fav.actions";
import Image from "next/image";
import AmountButton from "./AmountButton";
import AddToCart from "./cart/AddToCart";
import ProductImages from "./ProductImages";
import HeartIcon from "./icons/HeartIcon";
import FAQCard from "./FAQCard";
import ShareModal from "./ShareModal";
import Variation from "./Variation";

interface ProductDetailsComponent extends ProductOnSaleType {
  cart: CartItem[];
  isFav: boolean;
  preview?: boolean;
  productVariants?: ProductOnSaleType[];
  productMainProduct?: ProductOnSaleType | null;
}
const ProductDetailsComponent = ({
  id,
  title,
  price: basePrice,
  minPrice: baseMinPrice,
  images,
  categories,
  name,
  salePrice: baseSalePrice,
  saleValue,
  cart,
  isFav: initialFav,
  preview,
  content,
  variations,
  collections,
}: ProductDetailsComponent) => {
  const searchParams = useSearchParams();

  const baseVariants = getFirstOptionsWithSubVariants(variations);
  const paramSelectedOptions = getSelectedOptionsFromURL(
    variations,
    searchParams,
  );

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({ ...baseVariants, ...paramSelectedOptions });

  const price = calculatePrice(basePrice, selectedOptions, variations);
  const minPrice = calculateMinPrice(baseMinPrice, selectedOptions, variations);
  const salePrice = getSale(minPrice, price, saleValue);

  const [amountValue, setAmountValue] = useState<number>(1);
  const [isFav, setIsFav] = useState<boolean>(initialFav);

  const toggleFavItemAction = () => {
    if (typeof window == "undefined") return;
    const favData = localStorage.getItem("favoriteItems");
    const favorite: string[] = favData ? JSON.parse(favData) : [];
    localStorage.setItem(
      "favoriteItems",
      JSON.stringify(toggleFavoriteItem(favorite, id)),
    );
  };

  return (
    <div className="relative mx-auto flex w-full max-w-8xl flex-col sm:flex-row sm:p-5 md:gap-4 lg:px-20">
      <ProductImages
        images={images}
        selectedImage={getImageUrl(variations, selectedOptions) || images[0]}
        title={title}
      />
      <div className="sticky top-16 z-10 flex h-fit w-full flex-col gap-3 p-5 sm:w-5/12 md:col-span-2 md:py-0">
        <div className="flex items-center justify-between">
          <div className="nav group w-fit text-xs text-gray-400">
            <Link
              href={"/shop"}
              className="duration-75 hover:!border-gray-600 hover:!text-gray-600 group-hover:border-gray-300 group-hover:text-gray-300  dark:hover:!border-gray-300 dark:hover:!text-gray-300 dark:group-hover:border-gray-600 dark:group-hover:text-gray-600"
            >
              Shop
            </Link>
            {collections.map((item, index) => (
              <div key={index} className="inline-block">
                <span className="mx-1 text-base">&#8250;</span>
                <Link
                  href={{
                    pathname: "/shop",
                    query: { cl: item.trim() },
                  }}
                  className="duration-75 hover:!border-gray-600 hover:!text-gray-600 group-hover:border-gray-300 group-hover:text-gray-300  dark:hover:!border-gray-300 dark:hover:!text-gray-300 dark:group-hover:border-gray-600 dark:group-hover:text-gray-600"
                >
                  {item}
                </Link>
              </div>
            ))}
            {categories.split(",").map((item, index) => (
              <div key={index} className="inline-block">
                <span className="mx-1 text-base">&#8250;</span>
                <Link
                  href={{
                    pathname: "/shop",
                    query: { ctf: item.trim(), cl: collections[0] || "" },
                  }}
                  className="duration-75 hover:!border-gray-600 hover:!text-gray-600 group-hover:border-gray-300 group-hover:text-gray-300  dark:hover:!border-gray-300 dark:hover:!text-gray-300 dark:group-hover:border-gray-600 dark:group-hover:text-gray-600"
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>
          <ShareModal variations={variations} images={images} title={title} />
        </div>
        <h6 className="text-lg font-bold ">{title}</h6>
        <p className="text-sm text-gray-400 ">{name}</p>
        <div className="flex items-center gap-2">
          {salePrice && (
            <p className=" md:text-base ">{formatPrice(salePrice, "EGP")}</p>
          )}
          <p
            className={`${salePrice ? "line-through opacity-60" : ""} md:text-base `}
          >
            {formatPrice(price, "EGP")}
          </p>
        </div>
        <Variation
          basePrice={basePrice}
          variations={variations}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="flex flex-col gap-3">
          <p className="text-sm dark:text-white">
            <span className="text-gray-500">Amount:</span>{" "}
            <strong>{amountValue}</strong>
          </p>
          <AmountButton
            className="h-10"
            amount={amountValue}
            setAmount={setAmountValue}
          />
        </div>
        <div
          className={` ${preview ? "hidden" : ""} mt-3 flex max-w-md items-center justify-between gap-3`}
        >
          <AddToCart
            cart={cart}
            disabled={!addToCartCheck(baseVariants, selectedOptions)}
            cartItem={{
              amount: amountValue,
              productId: id,
              selectedOptions,
            }}
          />
          <div className="flex aspect-square h-14 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-black dark:border-white ">
            <button
              type="button"
              onClick={async () => {
                setIsFav(!isFav);
                await toggleFav(id);
                toggleFavItemAction();
              }}
            >
              <HeartIcon
                fillRule={isFav ? "nonzero" : "evenodd"}
                className={`${isFav ? "text-red-800" : ""} w-8  duration-200 hover:scale-110`}
              />
            </button>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          {content.map((item, index) => (
            <FAQCard key={index} question={item.name}>
              <div dangerouslySetInnerHTML={{ __html: item.html }} />
            </FAQCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
