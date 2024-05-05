"use client";
import { CartItem, Product, ProductOnSaleType } from "@/types";
import React from "react";
import CustomInput from "../CustomInput";
import { productInputs } from "@/constants";
import ProductDetailsComponent from "../ProductDetailsComponent";
import CustomForm from "../CustomForm";
import { updateProduct } from "../actions/product.actions";
import ImageEditor from "./ImageEditor";
import { useFormStatus } from "react-dom";
import ContentEditor from "./ContentEditor";
import SubmitButton from "../SubmitButton";

const UpdateProduct = ({ product }: { product: ProductOnSaleType }) => {
  const [data, setData] = React.useState<any>({
    ...product,
    colors: product.colors.join(","),
    sizes: product.sizes.join(","),
  });

  const [images, setImages] = React.useState<Record<string, string[]>>(
    product.images,
  );
  const [preview, setPreview] = React.useState(false);

  return (
    <>
      <CustomForm
        action={updateProduct}
        data={{
          ...data,
          colors: Object.keys(images || {}).map((key) => key),
          sizes: data.sizes.split(",").map((item: string) => item.trim()),
          images: images,
        }}
        className="flex w-full flex-col gap-3 px-5 md:gap-5 lg:px-20"
      >
        <ImageEditor images={images} setImages={setImages} />
        {productInputs.map((input, index) => (
          <CustomInput
            key={index}
            {...input}
            value={data[input.name as keyof Product]?.toString()}
            onChange={(e) => {
              if (input.type === "number") {
                setData({
                  ...data,
                  [input.name as keyof Product]: +e.target.value,
                });
                return;
              }
              setData({
                ...data,
                [input.name as keyof Product]: e.target.value,
              });
            }}
          />
        ))}
        <ContentEditor
          content={data.content}
          setContent={(content) => setData({ ...data, content })}
        />
        <SubmitButton
          type="submit"
          className="group flex h-14 w-full items-center justify-center rounded-lg bg-black px-5 uppercase text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Update
        </SubmitButton>
      </CustomForm>
      <div className="px-5 md:gap-5 lg:px-20">
        <button
          onClick={() => setPreview(!preview)}
          className="group flex h-14 w-full items-center justify-center rounded-lg px-5 uppercase  duration-300 hover:bg-black hover:text-white  dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          <p className="duration-500 group-hover:scale-110">
            {preview ? "Close" : "Preview"}
          </p>
        </button>
      </div>
      {preview && (
        <ProductDetailsComponent
          {...{
            ...data,
            colors: Object.keys(images || {}).map((key) => key),
            sizes: data.sizes.split(",").map((item: string) => item.trim()),
            images: images,
          }}
          isFav={false}
          preview={true}
          cart={[] as CartItem[]}
        />
      )}
    </>
  );
};

export default UpdateProduct;
