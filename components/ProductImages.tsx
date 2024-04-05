"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface YourComponentProps {
  images: string[];
  selectedImage?: string;
  title: string;
}

const ProductImages: React.FC<YourComponentProps> = ({
  images: imagesList,
  selectedImage,
  title,
}) => {
  const [images, setImages] = useState(imagesList);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }
    const selectedImageIndex = images.findIndex(
      (image) => image === selectedImage,
    );
    if (window.innerWidth > 640) {
      setImages(rearrangeArray(images, selectedImageIndex));
    } else {
      setCurrentIndex(selectedImageIndex);
      scrollToIndex(selectedImageIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const index = Math.round(
          scrollPosition / containerRef.current.offsetWidth,
        );
        setCurrentIndex(index);
      }
    };
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    const currentRef = containerRef.current;
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollToNext = () => {
    if (containerRef.current && currentIndex < images.length - 1) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrev = () => {
    if (containerRef.current && currentIndex > 0) {
      containerRef.current.scrollBy({
        left: -containerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative h-full w-full min-w-[50vw] flex-1 gap-2  md:min-w-[40vw] lg:min-w-[30vw]">
      <button
        onClick={scrollToPrev}
        className={`${currentIndex === 0 ? "hidden" : ""} absolute left-1 top-0 z-20 flex h-full w-10 items-center justify-center text-3xl sm:hidden `}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          <Image
            src={"/icons/arrow-down.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
            className="rotate-90"
          />
        </div>
      </button>
      <div
        className="scroll-bar-hidden  images-container relative h-full w-full snap-x snap-mandatory overflow-scroll max-sm:!flex sm:grid sm:gap-2 sm:overflow-hidden"
        ref={containerRef}
      >
        {images.map((item, index) => (
          <button
            onClick={() =>
              window.innerWidth > 640 &&
              setImages(rearrangeArray(images, index))
            }
            key={index}
            className={`area-${index + 1}  aspect-card relative min-w-[100vw] snap-center overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 sm:min-w-full sm:rounded-3xl`}
          >
            <Image
              src={item}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
              className="duration-300 hover:scale-110"
            />
          </button>
        ))}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex === images.length - 1 ? "hidden" : ""} absolute right-1 top-0 z-20 flex h-full w-10 items-center justify-center text-3xl sm:hidden`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          <Image
            src={"/icons/arrow-down.svg"}
            width={24}
            height={24}
            alt={"sort icon"}
            className="-rotate-90"
          />
        </div>
      </button>
      <div className="absolute bottom-2 right-2 flex w-full justify-center text-white  sm:hidden">
        <div className="flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

const rearrangeArray = (array: string[], index: number) => {
  if (index < 0 || index >= array.length) {
    return array;
  }
  const beforeIndex = array.slice(0, index);
  const afterIndex = array.slice(index + 1);
  return [array[index], ...beforeIndex, ...afterIndex];
};
