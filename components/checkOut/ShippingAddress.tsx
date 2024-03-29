"use client";
import React from "react";
import CustomInput from "../CustomInput";
import { CityType, GovernorateType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils";

const ShippingAddress = ({
  governorate,
  cities,
}: {
  governorate: GovernorateType[];
  cities: CityType[];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const state = searchParams?.get("state") || "";
  const city = searchParams?.get("city") || "";

  const [selectedState, setSelectedState] = React.useState(state);
  const [selectedCity, setSelectedCity] = React.useState(city);

  function addParam(key: string, value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value.toString().toLocaleLowerCase().trim());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  const govChange = (event: any) => {
    const state =
      governorate.find(
        (item) => item.governorate_name_en === event.target.value,
      )?.id || "";
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("state", state.toString().toLocaleLowerCase().trim());
    newSearchParams.set("city", "");
    setSelectedState(state);
    setSelectedCity("");
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <CustomInput
          label="State"
          type="select"
          value={
            governorate.find((item) => item.id == selectedState)
              ?.governorate_name_en || ""
          }
          options={governorate.map((item) => item.governorate_name_en)}
          onChange={govChange}
          placeholder="Choose your state"
          name="state"
          required={true}
        />
        <CustomInput
          label="city"
          type="select"
          disabled={!selectedState}
          value={cities.find((item) => item.id == city)?.city_name_en || ""}
          options={cities
            .filter((city) => city.governorate_id == selectedState)
            .map((item) => item.city_name_en)}
          onChange={(event) => {
            const city =
              cities.find((item) => item.city_name_en === event.target.value)
                ?.id || "";
            addParam("city", city);
            setSelectedCity(city);
          }}
          placeholder="Choose your city"
          name="city"
          required={true}
        />
      </div>
    </>
  );
};

export default ShippingAddress;
