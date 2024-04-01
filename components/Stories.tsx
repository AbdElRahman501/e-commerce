"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DropDown_icon from "./icons/DropDown_icon";
import { StoryType } from "@/types";

const Stories = ({ stories = [] }: { stories: StoryType[] }) => {
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
    const interval = setInterval(scrollToNext, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const scrollToNext = () => {
    const nextScrollIndex = (currentIndex + 1) % stories.length;
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
    }
  };

  return (
    <div className="rounded-4xl group relative aspect-[9/16] h-full w-full overflow-hidden ">
      <div className="absolute top-2 z-10 flex w-full justify-center gap-[2px]">
        {stories.map((_, index) => (
          <div key={index} className="w-full">
            <div
              className={` ${currentIndex === index ? "w-0 transition-[width] duration-[5s]" : "w-full"} h-[2px] ${index <= currentIndex ? "bg-white" : "bg-white/50"}  ease-linear`}
            ></div>
          </div>
        ))}
      </div>
      <button
        onClick={scrollToPrev}
        className={`${currentIndex === 0 ? "hidden" : ""} absolute  left-1 top-0 z-20 flex h-full w-10 items-center justify-center text-3xl `}
      >
        <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white group-hover:flex">
          <DropDown_icon className="rotate-90" />
        </div>
      </button>
      <div
        ref={containerRef}
        className="scroll-bar-hidden flex aspect-[9/16] h-full snap-x snap-mandatory flex-row overflow-x-auto"
      >
        {stories.map((story, index) => (
          <div
            key={index}
            className=" relative aspect-[9/16] h-full min-w-full snap-center "
          >
            <Image
              src={story.image}
              alt="shop image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex === stories.length - 1 ? "hidden" : "hidden group-hover:flex"}  absolute right-1 top-0 z-20 h-full w-10 items-center justify-center text-3xl`}
      >
        <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white  group-hover:flex">
          <DropDown_icon className="-rotate-90" />
        </div>
      </button>
      {/* <div className="absolute bottom-3 flex w-full justify-center text-white">
        <div className="flex space-x-1">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Stories;
