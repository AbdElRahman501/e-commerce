"use client";
import Image, { ImageProps } from "next/image";
import React, { MouseEvent, useState } from "react";

const ZoomableImage = ({
  alt,
  src,
  parentClassName,
  ...props
}: ImageProps & { parentClassName?: string }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const {
      left,
      top: topOffset,
      width,
      height,
    } = e.currentTarget.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const top = topOffset + scrollTop;
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition,
      }}
      className="group h-full w-full cursor-zoom-in bg-no-repeat object-cover"
    >
      <Image alt={alt} src={src} {...props} />
    </div>
  );
};

export default ZoomableImage;
