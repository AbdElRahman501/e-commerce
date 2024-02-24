import Image from "next/image";
import React from "react";

const ProductImages = ({ images: imagesList }: { images: string[] }) => {
  const images = Array(2).fill(imagesList).flat().slice(0, 6);
  return (
    <div className="sticky top-0 grid h-full w-full min-w-[50vw] flex-1 gap-2 sm:relative sm:grid-cols-4  md:min-w-[40vw] lg:min-w-[30vw]">
      <div className="aspect-card col-span-4 max-h-full overflow-hidden sm:relative sm:rounded-3xl">
        <Image
          src={images[0]}
          alt="jacket"
          fill
          className="duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 col-span-4 flex w-full grid-cols-4 grid-rows-2 justify-center gap-2 p-2 sm:relative sm:grid">
        <div className="aspect-card relative col-span-2 row-span-2 max-h-full w-10 overflow-hidden  rounded-xl sm:w-auto sm:rounded-3xl">
          <Image
            src={images?.[1]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
        <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
          <Image
            src={images?.[2]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
        <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
          <Image
            src={images?.[3]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
        <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
          <Image
            src={images?.[4]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
        <div className="aspect-card relative max-h-full w-10 overflow-hidden rounded-xl sm:w-auto sm:rounded-3xl">
          <Image
            src={images?.[5]}
            alt="jacket"
            fill
            className="duration-300 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
