import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RemoveButton from "./cart/RemoveButton";
import { EditItemQuantityButton } from "./cart/edit-item-quantity-button";
import { getImageUrl } from "@/utils";

type Props = CartProduct & {
  readonly?: boolean;
  removable?: boolean;
};

const BagCard = ({
  images,
  title,
  price,
  amount,
  selectedOptions,
  id,
  readonly,
  salePrice,
  variations,
  quantity,
}: Props) => {
  const isInStock = quantity > 0;

  return (
    <div className=" flex w-full border-b border-gray-200 pb-2 dark:border-gray-700 ">
      <div className=" flex w-full gap-5 ">
        <Link
          href={`/product/${id}`}
          style={{ pointerEvents: readonly ? "none" : "auto" }}
          className="relative"
        >
          <div className="aspect-card relative h-28 overflow-hidden rounded-md md:h-32">
            {!isInStock && (
              <div className="absolute z-10 flex h-full w-full items-center justify-center bg-black text-center  font-extrabold text-white opacity-40 ">
                OUT OF STOCK
              </div>
            )}
            <Image
              src={getImageUrl(variations, selectedOptions) || images[0]}
              alt="jacket"
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
              className="duration-300 hover:scale-110"
            />
          </div>
          <p className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full bg-black p-1 text-center text-xs text-white dark:bg-white dark:text-black ">
            {amount}
          </p>
        </Link>
        <div className="flex flex-1 flex-col justify-between text-gray-600 dark:text-gray-300 xl:flex-row">
          <div className="flex flex-1 flex-col justify-start gap-2 xl:justify-center">
            <Link
              href={`/product/${id}`}
              className="font-regular line-clamp-1 w-3/4 text-sm font-semibold text-black hover:underline dark:text-white xl:text-base  "
            >
              {title}
            </Link>
            {salePrice ? (
              <p className=" text-sm  xl:text-base ">
                {(salePrice * amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            ) : (
              <p className="text-sm  xl:text-base ">
                {(price * amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
            <div className="flex items-center gap-1 text-xs xl:text-sm">
              <p className="text-center">
                {Object.values(selectedOptions).join(" / ")}
              </p>
            </div>
          </div>
          {!readonly && (
            <div className="flex flex-1 items-center">
              <div
                className={` flex h-8 max-w-max items-center justify-between gap-1 overflow-hidden rounded-xl text-xs outline outline-1 outline-gray-200 dark:outline-gray-700 xl:h-12`}
              >
                <EditItemQuantityButton
                  item={{ productId: id, amount, selectedOptions }}
                  type="minus"
                />

                <p className="w-1/3 p-2 text-center ">{amount}</p>

                <EditItemQuantityButton
                  item={{ productId: id, amount, selectedOptions }}
                  type="plus"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {!readonly && (
        <RemoveButton cartItem={{ productId: id, amount, selectedOptions }} />
      )}
    </div>
  );
};

export default BagCard;
