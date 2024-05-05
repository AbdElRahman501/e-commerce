"use client";
import React from "react";
import DropDown_icon from "./icons/DropDown_icon";

const SliderHead = ({
  children,
  length,
  containerClass,
  carouselClass,
}: {
  children: React.ReactNode;
  length: number;
  containerClass?: string;
  carouselClass?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollLeft;
        const index = Math.round(
          (scrollPosition * (length - 1)) /
            (containerRef.current.offsetWidth / length),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToNext = () => {
    if (containerRef.current && currentIndex < length - 1) {
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

  return (
    <div className={containerClass}>
      <button
        onClick={scrollToPrev}
        className={` ${currentIndex === 0 || isTouchDevice ? "hidden" : ""} absolute  left-1 top-0 z-30 flex h-full w-10 items-center justify-center text-3xl 2xl:hidden `}
      >
        <div className="w-10 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white group-hover:flex">
          <DropDown_icon className="rotate-90" />
        </div>
      </button>
      <div ref={containerRef} className={carouselClass}>
        {children}
      </div>
      <button
        onClick={scrollToNext}
        className={`${currentIndex > length - 1 || isTouchDevice ? "hidden" : ""} absolute right-1 top-0 z-20 h-full w-10 items-center justify-center text-3xl 2xl:hidden`}
      >
        <div className="w-10 items-center justify-center rounded-full bg-white text-black hover:bg-black hover:text-white  group-hover:flex">
          <DropDown_icon className="-rotate-90" />
        </div>
      </button>
    </div>
  );
};

export default SliderHead;
