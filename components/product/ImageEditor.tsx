import React, { useState } from "react";
import CustomInput from "../CustomInput";
import Image from "next/image";
import ImageUpload from "../ImageUpload";

interface ImageEditorProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ images, setImages }) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target;
    setImages(images.map((img, idx) => (idx === index ? value : img)));
  };

  const handleAddImage = (img: string) => {
    setImages([...images, img]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      {images.map((img, index) => (
        <div key={index} className="mb-1 flex gap-1">
          <Image
            src={img}
            alt="Image"
            height={50}
            width={50}
            className="h-14 w-14 rounded-md"
            style={{ objectFit: "cover" }}
          />
          <CustomInput
            label="Image URL"
            name={`image-${index}`}
            type="text"
            value={img}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="h-14 rounded-lg border border-gray-300 px-2 dark:border-gray-700"
          >
            Remove
          </button>
        </div>
      ))}
      <ImageUpload handleAddImage={handleAddImage} />
    </div>
  );
};

export default ImageEditor;
