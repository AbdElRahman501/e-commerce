import React, { useState } from "react";
import CustomInput from "../CustomInput";

const ImageEditor = ({
  images,
  setImages,
}: {
  images: Record<string, string[]>;
  setImages: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}) => {
  const [newColor, setNewColor] = useState("");

  const handleInputChange = (event: any, color: string, index: number) => {
    const { value } = event.target;
    setImages((prevState) => ({
      ...prevState,
      [color]: prevState[color].map((img, idx) =>
        idx === index ? value : img,
      ),
    }));
  };

  const handleAddImage = (color: string) => {
    setImages((prevState) => ({
      ...prevState,
      [color]: [...prevState[color], ""],
    }));
  };

  const handleRemoveImage = (color: string, index: number) => {
    setImages((prevState) => ({
      ...prevState,
      [color]: prevState[color].filter((img, idx) => idx !== index),
    }));
  };

  const handleAddColor = () => {
    if (newColor && !images[newColor]) {
      setImages((prevState) => ({
        ...prevState,
        [newColor]: [],
      }));
      setNewColor("");
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
        <div key={colorIndex}>
          <div className="mb-2 flex items-center">
            <h2 className="mb-2 text-xl font-bold">{color}</h2>
            <button
              type="button"
              onClick={() => handleRemoveColor(color)}
              className="ml-2 rounded bg-red-500 px-2 py-1 text-white"
            >
              Remove Color
            </button>
          </div>
          {imgs.map((img, index) => (
            <div key={index} className="mb-1 flex">
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
                className="rounded bg-red-500 px-2 py-1 text-white"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddImage(color)}
            className="rounded bg-blue-500 px-2 py-1 text-white"
          >
            Add Image
          </button>
        </div>
      ))}
      <div className="flex">
        <CustomInput
          label="New Color"
          name="color"
          type="text"
          placeholder="New Color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddColor}
          className="rounded bg-green-500 px-2 py-1 text-white"
        >
          Add Color
        </button>
      </div>
    </>
  );
};

export default ImageEditor;
