"use client";
import Image, { ImageProps } from "next/image";
import React, { useEffect, useState } from "react";
import Ex_icon from "./icons/Ex_icon";

const CustomImage = ({ src, alt, ...props }: ImageProps) => {
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (showFullImage) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showFullImage]);

  return (
    <>
      {showFullImage && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <div
            className="absolute left-0 top-0 h-full w-full bg-black opacity-75"
            onClick={() => setShowFullImage(false)}
          ></div>
          <button
            className="absolute top-6 z-50 m-4 aspect-square h-12 w-12 rounded-full bg-white   text-4xl text-black"
            onClick={() => setShowFullImage(false)}
          >
            <Ex_icon className="h-full w-full" />
          </button>
          <Image
            src={src}
            alt={alt}
            {...props}
            className="z-40 h-5/6"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        {...props}
        className="cursor-pointer"
        onClick={() => setShowFullImage(true)}
      />
      ;
    </>
  );
};

export default CustomImage;

// ImageComponent.tsx

// import { useState } from 'react';

// type ImageComponentProps = {
//   src: string;
// };

// const ImageComponent: React.FC<ImageComponentProps> = ({ src }) => {
//   const [showFullImage, setShowFullImage] = useState(false);

//   return (
//     <div>
//       {showFullImage ? (
//         <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
//           <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75" onClick={() => setShowFullImage(false)}></div>
//           <img src={src} alt="Full View Image" className="z-50 h-5/6" onClick={() => setShowFullImage(false)} />
//         </div>
//       ) : (
//         <img src={src} alt="Thumbnail" className="cursor-pointer" onClick={() => setShowFullImage(true)} />
//       )}
//     </div>
//   );
// };

// export default ImageComponent;
