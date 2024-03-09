"use client";
import React, { useEffect } from "react";
import { CustomInput } from "@/components";
import { productInputs } from "@/constants";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { getProduct } from "@/utils";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = React.useState<Product>({} as Product);
  const [loading, setLoading] = React.useState(true);
  const productId = params.id;
  const [data, setData] = React.useState({} as Product);
  const [keys, setKeys] = React.useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!product?.id) {
      getProduct(setProduct, setLoading, productId);
    }
  }, [product]);

  useEffect(() => {
    if (product && data.id !== product?.id) {
      setData(product);
      setKeys(Object.keys(product.images || {}));
    }
  }, [product]);

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

  return !product ? (
    <div>Product not found</div>
  ) : (
    <div className="p-5 lg:px-20">
      <h1 className="pb-5 text-xl font-semibold md:text-3xl">EditProduct</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className=" flex w-full flex-col gap-10 md:flex-row "
      >
        <div className="flex w-full flex-col gap-2 ">
          {keys.map((key) => (
            <div className="flex w-full items-end gap-2">
              <div className="flex min-w-[25%] max-w-[25%] flex-col gap-2">
                <p>key</p>
                <div className="h-14 w-full rounded-2xl border border-gray-400 bg-transparent p-2 px-4 pe-10  text-center text-base outline-none focus:border-orange-500 focus:ring-blue-500   dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-200">
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
                value={data.images[key]}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    images: { ...prev.images, [key]: e.target.value },
                  }))
                }
              />
            </div>
          ))}
          <CustomInput
            label="Colors"
            type="text"
            placeholder="Enter your Colors"
            name="Colors"
            required={true}
            minLength={2}
            value={keys}
            onChange={(e) => {
              const keys = e.target.value.split(",").map((item) => item.trim());
              setKeys(keys);
              setData((prev) => ({
                ...prev,
                images: filterObjectByKeys(keys, prev.images || {}),
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
        </div>
        <button
          type="submit"
          className="group  mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
        >
          <p className="duration-500 group-hover:scale-110">
            {loading ? "Loading..." : "Update"}
          </p>
        </button>
      </form>
    </div>
  );
};

function filterObjectByKeys<T>(
  keys: string[],
  obj: Record<string, T>,
): Record<string, T> {
  const filteredObject: Record<string, T> = {};

  keys.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      filteredObject[key] = obj[key];
    }
  });

  return filteredObject;
}

export default EditProduct;
