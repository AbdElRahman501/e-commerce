import React from "react";
import { getAllProperties } from "../lib";
import { getCollectionsWithCategories } from "@/lib/actions/product.actions";
import FilterContainer from "./FilterContainer";

const FilterSection = async () => {
  const { colors, sizes } = await getAllProperties();
  const collectionsWithCategories = await getCollectionsWithCategories();
  return (
    <FilterContainer
      allColors={colors}
      allSizes={sizes}
      collectionsWithCategories={collectionsWithCategories}
    />
  );
};

export default FilterSection;
