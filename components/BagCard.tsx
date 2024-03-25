import { CartProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RemoveButton from "./cart/RemoveButton";
import { EditItemQuantityButton } from "./cart/edit-item-quantity-button";

type Props = CartProduct & {
  readonly?: boolean;
  removable?: boolean;
};

const BagCard = ({
  images,
  title,
  price,
  amount,
  selectedColor,
  selectedSize,
  id,
  readonly,
  salePrice,
}: Props) => {
  return (
    <div className="relative flex w-full gap-5 border-b pb-2 ">
      <Link
        href={`/product/${id}`}
        style={{ pointerEvents: readonly ? "none" : "auto" }}
        className="aspect-card relative h-28 overflow-hidden rounded-2xl border md:h-32"
      >
        <Image
          src={images[selectedColor][0]}
          alt="jacket"
          fill
          style={{ objectFit: "cover" }}
          sizes="100%"
          className="duration-300 hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="font-regular w-3/4 text-sm text-primary_color dark:text-gray-300 md:text-base  ">
          {title}
        </h2>
        {salePrice ? (
          <div className="flex flex-col ">
            <p className="text-xs text-gray-500 line-through">{price} EGP</p>
            <p className=" text-sm font-bold md:text-base ">{salePrice} EGP</p>
          </div>
        ) : (
          <p className="text-sm font-bold  md:text-base ">{price} EGP</p>
        )}
        <div className="flex  gap-2">
          <div
            className={`w-8 scale-110 rounded-full p-1 outline outline-2 outline-offset-1 outline-blue-900 duration-200 hover:scale-110 dark:outline-blue-400`}
          >
            <span
              style={{ backgroundColor: selectedColor }}
              className="block aspect-square w-full rounded-full border"
            ></span>
          </div>

          <div className="relative flex h-8 items-center justify-between rounded-xl outline outline-1 ">
            <p className="w-12 text-center">{selectedSize}</p>
          </div>
          <div className="flex h-8 max-w-max items-center justify-between gap-1 overflow-hidden rounded-xl outline outline-1">
            {!readonly && (
              <EditItemQuantityButton
                item={{ productId: id, amount, selectedColor, selectedSize }}
                type="minus"
              />
            )}
            <p className="w-8 bg-transparent px-2 text-center outline-none">
              {amount}
            </p>
            {!readonly && (
              <EditItemQuantityButton
                item={{ productId: id, amount, selectedColor, selectedSize }}
                type="plus"
              />
            )}
          </div>
        </div>
      </div>
      {!readonly && (
        <RemoveButton
          cartItem={{ productId: id, amount, selectedColor, selectedSize }}
        />
      )}
    </div>
  );
};

export default BagCard;
