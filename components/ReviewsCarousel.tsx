"use client";
import { ReviewType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import Rating from "./Rating";
import CustomImage from "./CustomImage";
import DropDown_icon from "./icons/DropDown_icon";

const ReviewsCarousel = ({ reviews = [] }: { reviews: ReviewType[] }) => {
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
    const nextScrollIndex = (currentIndex + 1) % reviews.length;
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
    <>
      <div
        ref={containerRef}
        className="scroll-bar-hidden flex snap-x snap-mandatory overflow-x-scroll md:overflow-hidden "
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-[1446px]:min-w-8xl flex min-w-[100vw] snap-center items-center justify-center p-6 text-center text-white "
          >
            <div className="w-full">
              <h2 className="text-base font-bold ">{review.name}</h2>
              <Rating rating={review.rating} />
              <div className="flex justify-center gap-1">
                {review.images.length > 0 &&
                  review.images.map((url, index) => (
                    <CustomImage
                      key={index}
                      src={url}
                      alt={"image"}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  ))}
              </div>
              <h6 className="w-full text-sm ">
                <strong>{review.title}</strong>
                {review.description}
              </h6>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={scrollToPrev}>
          <div className="rounded-full bg-white text-black hover:bg-black hover:text-white">
            <DropDown_icon className="h-6 w-6 rotate-90" />
          </div>
        </button>
        <button onClick={scrollToNext}>
          <div className="rounded-full bg-white text-black hover:bg-black hover:text-white">
            <DropDown_icon className="h-6 w-6 -rotate-90" />
          </div>
        </button>
      </div>
    </>
  );
};

export default ReviewsCarousel;
