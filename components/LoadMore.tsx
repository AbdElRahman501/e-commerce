"use client";
import { createUrl } from "@/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const LoadMore = ({ newLimit }: { newLimit: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function updateLimit() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("l", newLimit.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    return optionUrl;
  }
  return (
    <Link
      href={updateLimit()}
      scroll={false}
      className="group mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
    >
      <p className="duration-500 group-hover:scale-110">Load More</p>
    </Link>
  );
};

export default LoadMore;
