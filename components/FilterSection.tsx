import React from "react";
import { getAllProperties } from "../lib";
import { getCategories } from "@/lib/actions/product.actions";
import FilterContainer from "./FilterContainer";

const FilterSection = async () => {
  const { colors, sizes } = await getAllProperties();
  const categories = await getCategories();
  return (
    <FilterContainer
      allColors={colors}
      allSizes={sizes}
      categories={categories}
    />
  );
};

export default FilterSection;
