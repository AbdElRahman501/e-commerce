"use client";
import React, { useEffect } from "react";
import { CustomInput, LoadingLogo } from "@/components";
import { productInputs } from "@/constants";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import PreviewProduct from "@/components/PreviewProduct";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [productLoading, setProductLoading] = React.useState(true);
  const productId = params.id;
  const [data, setData] = React.useState({} as Product);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newProduct: data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.updatedProduct) return;
        setLoading(false);
        router.push(`/product/${data.updatedProduct.id}`);
      });
  };

  return productLoading ? (
    <LoadingLogo />
  ) : !data ? (
    <div>Product not found</div>
  ) : (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">EditProduct</h1>
      <div className=" flex w-full flex-col gap-10 md:flex-row ">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 ">
          {Object.keys(data.images || {}).map((key) => (
            <div key={key} className="flex w-full items-end gap-2">
              <div className="flex min-w-[25%] max-w-[25%] flex-col gap-2">
                <p>key</p>
                <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-400  text-center text-base   dark:text-white  ">
                  <p>{key}</p>
                </div>
              </div>
              <CustomInput
                label="value"
                type="text"
                placeholder="Enter your value"
                name="value"
                required={true}
                minLength={2}
                value={data.images[key].join(", ")}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    images: {
                      ...prev.images,
                      [key]: e.target.value.split(", "),
                    },
                  }))
                }
              />
            </div>
          ))}
          <CustomInput
            label="Colors"
            type="textarea"
            placeholder="Enter your Colors"
            name="Colors"
            required={true}
            minLength={2}
            value={data.colors}
            onChange={(e) => {
              const keys = e.target.value.split(",").map((item) => item.trim());
              setData((prev) => ({
                ...prev,
                images: matchKeys(keys, prev.images),
                colors: keys,
              }));
            }}
          />
          {productInputs.map((input, index) => (
            <CustomInput
              key={index}
              {...input}
              value={data[input.name as keyof Product]}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  [input.name]:
                    input.type === "array"
                      ? e.target.value.split(",").map((item) => item.trim())
                      : e.target.value,
                }))
              }
            />
          ))}
          <button
            type="submit"
            className="group  mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
          >
            <p className="duration-500 group-hover:scale-110">
              {loading ? "Loading..." : "Update"}
            </p>
          </button>
        </form>
        <div className="w-full">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="group my-2  h-12 w-full rounded-2xl border border-primary_color uppercase md:hidden"
          >
            <p className="duration-500 group-hover:scale-110">
              {preview ? "Close" : "Preview"}
            </p>
          </button>
          <PreviewProduct
            className={`${preview ? "block" : "hidden"} md:block`}
            product={data}
          />
        </div>
      </div>
    </div>
  );
};

function matchKeys(
  keys: string[],
  obj: Record<string, string[]>,
): Record<string, string[]> {
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      delete obj[key];
    }
  });
  keys.forEach((key) => {
    if (!(key in obj)) {
      obj[key] = [""];
    }
  });
  return obj;
}

export default EditProduct;
