"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import FullSizeIcon from "./icons/FullSizeIcon";
import Ex_icon from "./icons/Ex_icon";
import ZoomableImage from "./ZoomableImage";

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
  const [showFullImage, setShowFullImage] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

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

  useEffect(() => {
    const onTouchStart = () => {
      setIsTouchDevice(true);
    };

    // Check if the device supports touch events
    if ("ontouchstart" in window || navigator.maxTouchPoints) {
      setIsTouchDevice(true);
    }

    document.addEventListener("touchstart", onTouchStart);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  useEffect(() => {
    if (showFullImage) {
      document.body.classList.add("scroll-Lock");
    } else {
      document.body.classList.remove("scroll-Lock");
    }
    return () => {
      document.body.classList.remove("scroll-Lock");
    };
  }, [showFullImage]);

  return (
    <div className="relative h-full w-full flex-1 gap-2 sm:w-4/6 ">
      <button
        onClick={scrollToPrev}
        className={`${currentIndex === 0 ? "hidden" : ""} absolute left-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl sm:hidden `}
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
      {showFullImage && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <div
            className="absolute left-0 top-0 h-full w-full bg-black opacity-75"
            onClick={() => setShowFullImage(false)}
          ></div>
          <button
            className="absolute top-6 z-50 m-4 aspect-square h-12 w-12 rounded-full bg-white text-4xl text-black"
            onClick={() => setShowFullImage(false)}
          >
            <Ex_icon className="h-full w-full" />
          </button>
          <Image
            src={images[currentIndex]}
            alt={title}
            fill
            sizes="200%"
            className="z-40 h-5/6"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      {isTouchDevice && (
        <div
          onClick={() => setShowFullImage(true)}
          className="absolute right-3 top-3 z-20 cursor-pointer rounded-lg bg-white p-2"
        >
          <FullSizeIcon className="w-6 text-black" />
        </div>
      )}
      <div
        className="scroll-bar-hidden images-container  relative h-full w-full snap-x snap-mandatory overflow-scroll max-sm:!flex sm:grid sm:gap-2 sm:overflow-hidden"
        ref={containerRef}
      >
        {images.map((item, index) => (
          <div
            onClick={() =>
              window.innerWidth > 640 &&
              setImages(rearrangeArray(images, index))
            }
            key={index}
            className={`area-${index + 1}  aspect-card relative min-w-[100vw] snap-center overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 sm:min-w-full sm:rounded-3xl`}
          >
            {!isTouchDevice && index === 0 ? (
              <ZoomableImage
                src={item}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                sizes="100%"
                className="group-hover:opacity-0"
              />
            ) : (
              <Image
                src={item}
                alt={title}
                fill
                priority={index === 0}
                style={{ objectFit: "cover" }}
                sizes="100%"
                className="cursor-pointer duration-700 hover:scale-105"
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex === images.length - 1 ? "hidden" : ""} absolute right-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl sm:hidden`}
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
