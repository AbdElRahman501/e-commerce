"use client";
import { CollectionType, ContentType, Product, Variation } from "@/types";
import React from "react";
import CustomInput from "../CustomInput";
import { productInputs } from "@/constants";
import CustomForm from "../CustomForm";
import { updateProducts } from "../actions/product.actions";
import ContentEditor from "./ContentEditor";
import SubmitButton from "../SubmitButton";
import VariationsEditor from "./VariationsEditor";
import CollectionSelector from "./CollectionSelector";

const UpdateProducts = ({
  selectedIds,
  collections,
}: {
  collections: CollectionType[];
  selectedIds: string[];
}) => {
  const [data, setData] = React.useState<any>({});
  const [profitRate, setProfitRate] = React.useState<number>(25);
  return (
    <>
      <CustomForm
        action={updateProducts}
        data={{ ids: selectedIds, data }}
        className="flex w-full flex-col gap-3 px-5 md:gap-5 lg:px-20"
      >
        <VariationsEditor
          images={data.images || []}
          variations={data.variations || []}
          setVariations={(variations: Variation[]) =>
            setData({ ...data, variations })
          }
          profitRate={profitRate}
        />
        <div className="flex">
          <p>
            estimatePrice :{" "}
            {(data.minPrice / ((100 - profitRate) / 100)).toFixed(2)}
          </p>
          <CustomInput
            label="profitRate"
            type="number"
            placeholder="Enter product profitRate"
            name="profitRate"
            value={profitRate}
            required={false}
            onChange={(e) => setProfitRate(+e.target.value)}
          />
        </div>
        {productInputs.map((input, index) => (
          <CustomInput
            key={index}
            {...input}
            required={false}
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
        <CollectionSelector
          selectedOptions={data.collections || []}
          setSelectedOptions={(collections) =>
            setData({ ...data, collections })
          }
          collections={collections.map((c) => c.name)}
        />
        <ContentEditor
          content={(data.content as ContentType[]) || []}
          setContent={(content: ContentType[]) => setData({ ...data, content })}
        />
        <SubmitButton
          type="submit"
          className="group flex h-14 w-full items-center justify-center rounded-lg bg-primary_color px-5 uppercase text-white duration-300 hover:bg-white hover:text-black"
        >
          Update
        </SubmitButton>
      </CustomForm>
    </>
  );
};

export default UpdateProducts;
