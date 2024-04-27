import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Image from "next/image";
import ImageUpload from "../ImageUpload";
import { CSS_COLORS } from "@/constants";
import CustomSelect from "../CustomeSelect";

const ImageEditor = ({
  images,
  setImages,
}: {
  images: Record<string, string[]>;
  setImages: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}) => {
  const handleInputChange = (event: any, color: string, index: number) => {
    const { value } = event.target;
    setImages((prevState) => ({
      ...prevState,
      [color]: prevState[color].map((img, idx) =>
        idx === index ? value : img,
      ),
    }));
  };

  const handleAddImage = (color: string, img: string) => {
    setImages((prevState) => ({
      ...prevState,
      [color]: [...prevState[color], img],
    }));
  };

  const handleRemoveImage = (color: string, index: number) => {
    setImages((prevState) => ({
      ...prevState,
      [color]: prevState[color].filter((img, idx) => idx !== index),
    }));
  };

  const handleAddColor = (newColor: string) => {
    if (newColor && !images[newColor]) {
      setImages((prevState) => ({
        ...prevState,
        [newColor]: [""],
      }));
    }
  };

  const handleRemoveColor = (color: string) => {
    setImages((prevState) => {
      const updatedImages = { ...prevState };
      delete updatedImages[color];
      return updatedImages;
    });
  };

  return (
    <>
      {Object.entries(images).map(([color, imgs], colorIndex) => (
        <div className="flex gap-1" key={colorIndex}>
          <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-300 px-2 text-center font-bold  dark:border-gray-700">
            <h2>{color}</h2>
            <span
              style={{ backgroundColor: color }}
              className="block h-7 w-7 rounded-full border border-gray-300"
            ></span>
            <button
              type="button"
              onClick={() => handleRemoveColor(color)}
              className="absolute -bottom-5 left-0 w-full text-sm  text-red-500 duration-200 group-hover:bottom-2"
            >
              Remove
            </button>
          </div>
          <div className="flex w-full flex-col gap-2">
            {imgs.map((img, index) => (
              <div key={index} className="mb-1 flex gap-1">
                <Image
                  src={img}
                  alt="jacket"
                  height={50}
                  width={50}
                  className="h-14 w-14 rounded-md"
                  style={{ objectFit: "cover" }}
                />
                <CustomInput
                  label="Image URL"
                  name="image"
                  type="text"
                  value={img}
                  onChange={(e) => handleInputChange(e, color, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(color, index)}
                  className="h-14 rounded-lg border border-gray-300 px-2 dark:border-gray-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <ImageUpload
              color={color}
              handleAddImage={(img) => handleAddImage(color, img)}
            />
          </div>
        </div>
      ))}
      <div className="flex gap-1">
        <CustomSelect
          options={CSS_COLORS}
          placeholder="New Color"
          onChange={(e) => handleAddColor(e)}
        />
      </div>
    </>
  );
};

export default ImageEditor;
