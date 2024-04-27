import React from "react";
import { getAllProperties, getCategoriesWithProductCount } from "../lib";
import dynamic from "next/dynamic";

const FilterContainer = dynamic(() => import("./FilterContainer"), {
  ssr: false,
});

const FilterSection = async () => {
  const { colors, sizes } = await getAllProperties();
  const categories = await getCategoriesWithProductCount();
  return (
    <FilterContainer
      allColors={colors}
      allSizes={sizes}
      categories={categories}
    />
  );
};

export default FilterSection;
