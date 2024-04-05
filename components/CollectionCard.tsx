import React from "react";
import ArrowButton from "./ArrowButton";
import Image from "next/image";
import { CollectionType } from "@/types";

const CollectionCard = ({
  name,
  image,
  url,
  className,
}: CollectionType & { className?: string }) => {
  return (
    <div
      key={name}
      className={
        className
          ? className
          : "rounded-4xl relative aspect-square h-full w-full overflow-hidden"
      }
    >
      <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />

      <ArrowButton
        href={url}
        className="absolute right-3 top-3 bg-white  text-3xl text-black  hover:bg-black hover:text-white "
      />
    </div>
  );
};

export default CollectionCard;
