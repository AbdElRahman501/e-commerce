import React, { Suspense } from "react";
import { CustomInput, ProductDetailsComponent } from "@/components";
import { CartItem, Product, ProductDetailPageProps } from "@/types";
import { fetchProduct } from "@/lib";
import { productInputs } from "@/constants";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const id = params.id;

  const product = await fetchProduct(id);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-3 px-5 md:gap-5 lg:px-20">
      <Suspense>
        <form className="flex w-full flex-col ">
          {Object.keys(product.images || {}).map((key) => (
            <div key={key} className="flex w-full items-start gap-2">
              <div className="flex min-w-[25%] max-w-[25%] flex-col gap-2">
                <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-400  text-center text-base   dark:text-white  ">
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
                defaultValue={product.images[key].join(", ")}
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
            defaultValue={product.colors.join(", ")}
          />
          {productInputs.map((input, index) => (
            <CustomInput
              key={index}
              {...input}
              defaultValue={product[input.name as keyof Product]?.toString()}
            />
          ))}
          <button
            type="submit"
            className="group  mt-2 h-12 w-full rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
          >
            <p className="duration-500 group-hover:scale-110">Update</p>
          </button>
        </form>
        <ProductDetailsComponent
          {...product}
          isFav={false}
          cart={[] as CartItem[]}
        />
      </Suspense>
    </div>
  );
}
