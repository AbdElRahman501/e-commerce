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

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="group mt-2  h-12 w-full overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
    >
      <p className="duration-500 group-hover:scale-110">
        {pending ? "Loading..." : "Update"}
      </p>
    </button>
  );
};

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
        <SubmitButton />
      </CustomForm>

      <button
        onClick={() => setPreview(!preview)}
        className="group my-2 h-12 w-full overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
      >
        <p className="duration-500 group-hover:scale-110">Preview</p>
      </button>
      {preview &&
        [""].map((_, key) => {
          const modifiedData = {
            ...data,
            colors: Object.keys(images || {}).map((key) => key),
            sizes: data.sizes.split(",").map((item: string) => item.trim()),
            images: images,
          };
          return (
            <ProductDetailsComponent
              key={key}
              {...modifiedData}
              isFav={false}
              preview={true}
              cart={[] as CartItem[]}
            />
          );
        })}
    </>
  );
};

export default UpdateProduct;
