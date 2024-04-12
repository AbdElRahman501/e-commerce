"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { uploadImage } from "./actions/upload.actions";
import LoadingDots from "./loading-dots";

export default function ImageUpload({
  handleAddImage,
  color,
}: {
  color?: string;
  handleAddImage: (url: string) => void;
}) {
  const [previewSource, setPreviewSource] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setMounted(false);
    previewFile(file);
  };
  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result?.toString() || "");
    };
  };

  const [response, formAction] = useFormState(uploadImage, null);
  const actionWithVariant = formAction.bind(null, previewSource);

  useEffect(() => {
    if (!mounted && response && response.secure_url && handleAddImage) {
      handleAddImage(response.secure_url);
      setPreviewSource("");
      setMounted(true);
      setLoading(false);
    }
  }, [response, handleAddImage, mounted]);

  return (
    <div className="center-height-container  flex gap-1">
      {previewSource && (
        <Image
          src={previewSource}
          alt="chosen"
          width={50}
          height={50}
          className="h-14 w-14"
        />
      )}
      <label htmlFor={`image${color}`} className="w-full cursor-pointer">
        <input
          type="file"
          name="uploadedImage"
          id={`image${color}`}
          hidden
          onChange={handelFileInputChange}
        />
        <div className="text- flex h-14 w-full cursor-pointer items-center rounded-lg border border-gray-300 text-center  dark:border-gray-700">
          <p className="w-full">
            {previewSource ? "Change Image" : "Upload Image"}
          </p>
        </div>
      </label>

      {previewSource && (
        <button
          type="button"
          className="w-full rounded-lg border border-gray-300 text-center dark:border-gray-700"
        >
          {loading ? (
            <p className="text-4xl">
              <LoadingDots />
            </p>
          ) : (
            "Upload"
          )}
        </button>
      )}
    </div>
  );
}
