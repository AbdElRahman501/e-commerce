"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CartItem, ProductOnSaleType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUrl,
  formatPrice,
  getAllImages,
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
  price,
  images,
  colors,
  sizes,
  categories,
  name,
  salePrice,
  cart,
  isFav: initialFav,
  preview,
  content,
  productVariants,
  mainProduct,
  productMainProduct,
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
  const [isFav, setIsFav] = useState<boolean>(initialFav);

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
    <div className="mx-auto flex w-full max-w-8xl flex-col sm:flex-row sm:p-5 md:gap-4 lg:px-20">
      <ProductImages
        images={getAllImages(images)}
        selectedImage={images[selectedColor]?.[0] || ""}
        title={title}
      />
      <div className="z-10 flex w-full flex-col gap-3 p-5 sm:w-5/12 md:col-span-2 md:py-0">
        <div className="flex items-center justify-between">
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
          <ShareModal images={images} title={title} />
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
                className={`${item === selectedSize ? " border-black dark:border-white " : " border-gray-200 dark:border-gray-700 "} rounded-xl border-2 p-2 px-4 text-sm duration-200 hover:scale-105 hover:border-black dark:hover:border-white`}
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
          <div className="flex flex-wrap gap-2">
            {colors.map((item, index) => (
              <button
                onClick={() => {
                  selectColor(item);
                }}
                key={index}
                className={`${item === selectedColor ? " border-black dark:border-white " : "border-1 border-transparent"} rounded-full border-2 p-[1px]  duration-200 hover:scale-110`}
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
          <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full border border-primary_bg bg-white py-1 text-lg text-black dark:border-white ">
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
        {productVariants && productVariants.length > 0 && (
          <div>
            <h1 className="mt-2 text-lg font-bold">Variations Available</h1>
            {productVariants.map((product, index) => (
              <Link
                key={index}
                href={`/product/${product.id}?color=${selectedColor}&size=${selectedSize}`}
                className="mt-3 flex max-w-md items-center gap-3"
              >
                <Image
                  src={
                    product.images[selectedColor]?.[0] ||
                    getAllImages(product.images)[0]
                  }
                  alt={title + " " + product.title}
                  width={200}
                  height={200}
                  className="w-20 rounded-lg"
                />
                <div>
                  <p className="hover:underline">{product.title}</p>
                  <div className="relative">
                    <p className="text-sm text-[#1a1a1ab3] dark:text-gray-300 md:text-base ">
                      {formatPrice(product.price, "EGP")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {productMainProduct && (
          <div>
            <h1 className="mt-2 text-lg font-bold">Main Product</h1>
            <Link
              href={`/product/${productMainProduct.id}?color=${selectedColor}&size=${selectedSize}`}
              className="mt-3 flex max-w-md items-center gap-3"
            >
              <Image
                src={
                  productMainProduct.images[selectedColor]?.[0] ||
                  getAllImages(productMainProduct.images)[0]
                }
                alt={title + " " + productMainProduct.title}
                width={200}
                height={200}
                className="w-20 rounded-lg"
              />
              <div>
                <p className="hover:underline">{productMainProduct.title}</p>
                <div className="relative">
                  <p className="text-sm text-[#1a1a1ab3] dark:text-gray-300 md:text-base ">
                    {formatPrice(productMainProduct.price, "EGP")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="mt-10 flex flex-col gap-4">
          {Object.entries(content || {}).map(([title, items], index) => (
            <FAQCard key={index} question={title}>
              {items.map((item, i) => (
                <div key={i}>
                  <p className="mt-3">{item.title || ""}</p>
                  <ul className="mt-3">
                    {item.list?.map((listItem, listIndex) => (
                      <li
                        key={listIndex}
                        className="list-inside list-disc py-1"
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                  <p>{item.description}</p>
                  {item.images?.map((image, imageIndex) => (
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
