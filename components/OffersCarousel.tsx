"use client";
import { OfferType } from "@/types";
import Image from "next/image";
import React from "react";

const OffersCarousel = ({ offers }: { offers: OfferType[] }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
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

  const scrollToNext = () => {
    if (containerRef.current && currentIndex < offers.length - 1) {
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
  React.useEffect(() => {
    const interval = setInterval(scrollToNext, 3000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (offers.length === 0) return null;

  return (
    <div className="relative mb-5 h-60 w-full  ">
      <button
        onClick={scrollToPrev}
        className={`${currentIndex === 0 ? "hidden" : ""} absolute left-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl  `}
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
        ref={containerRef}
        className="scroll-bar-hidden relative mb-5  flex h-60 w-full snap-x snap-mandatory overflow-scroll "
      >
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`relative h-full min-w-[100vw] snap-center overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 `}
          >
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
              className="cursor-pointer duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex === offers.length - 1 ? "hidden" : ""} absolute right-1 top-0 z-10 flex h-full w-10 items-center justify-center text-3xl `}
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
      <div className="absolute bottom-2 right-2 flex w-full justify-center text-white  ">
        <div className="flex space-x-1">
          {offers.map((_, index) => (
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

export default OffersCarousel;
