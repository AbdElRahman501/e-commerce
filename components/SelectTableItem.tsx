"use client";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const SelectTableItem = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSelectedIds = searchParams.get("selectedIds");

  const selectedProducts = useMemo<string[]>(
    () => (initialSelectedIds ? initialSelectedIds.split(",") : []),
    [initialSelectedIds],
  );

  function setParam(selectedIds: string[]) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("selectedIds", selectedIds.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    return router.replace(optionUrl, { scroll: false });
  }

  const handleProductSelect = (itemId: string) => {
    const index = selectedProducts.indexOf(itemId);
    if (index === -1) {
      const products = [...selectedProducts, itemId];
      //   setSelectedProducts(products);
      setParam(products);
    } else {
      const products = selectedProducts.filter((id) => id !== itemId);
      //   setSelectedProducts(products);
      setParam(products);
    }
  };

  return (
    <input
      type="checkbox"
      checked={selectedProducts.includes(id)}
      onChange={() => handleProductSelect(id)}
    />
  );
};

export default SelectTableItem;
