import React from "react";
import ArrowButton from "./ArrowButton";
import Image from "next/image";
import { CollectionType } from "@/types";
import Link from "next/link";

const CollectionCard = ({
  name,
  image,
  url,
  className,
  index = 0,
}: CollectionType & { className?: string; index?: number }) => {
  return (
    <Link href={url} key={name} className={className}>
      <div className="rounded-4xl relative aspect-square h-full w-full cursor-pointer overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          priority={index < 3}
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
        <ArrowButton className="absolute right-3 top-3 z-10 bg-white  text-3xl text-black  hover:bg-black hover:text-white " />
      </div>
    </Link>
  );
};

export default CollectionCard;
