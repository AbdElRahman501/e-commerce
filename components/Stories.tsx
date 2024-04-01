"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DropDown_icon from "./icons/DropDown_icon";

const images = ["/panorama.png", "/panorama.png", "/panorama.png"];

const Stories = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(scrollToNext, 3000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const scrollToNext = () => {
    const nextScrollIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextScrollIndex);
    if (containerRef.current) {
      const nextScrollLeft = containerRef.current.offsetWidth * nextScrollIndex;
      containerRef.current.scrollTo({
        left: nextScrollLeft,
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
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length,
      );
    }
  };

  return (
    <div className="rounded-4xl relative aspect-[9/16] h-full w-full overflow-hidden ">
      <button
        onClick={scrollToPrev}
        className={`${currentIndex === 0 ? "hidden" : ""} absolute left-1 top-0 z-20 flex h-full w-10 items-center justify-center text-3xl `}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white">
          <DropDown_icon className="rotate-90" />
        </div>
      </button>
      <div
        ref={containerRef}
        className="scroll-bar-hidden flex aspect-[9/16] h-full snap-x snap-mandatory flex-row overflow-x-auto"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className=" relative aspect-[9/16] h-full min-w-full snap-center "
          >
            <Image
              src={image}
              alt="shop image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex === images.length - 1 ? "hidden" : ""} absolute right-1 top-0 z-20 flex h-full w-10 items-center justify-center text-3xl`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          <DropDown_icon className="-rotate-90" />
        </div>
      </button>
      <div className="absolute bottom-3 flex w-full justify-center text-white">
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

export default Stories;
