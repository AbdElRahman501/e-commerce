"use client";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import LoadingDots from "./loading-dots";

const LoadMore = ({
  newLimit,
  limit,
  length,
}: {
  length: number;
  limit: number;
  newLimit: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  function updateLimit() {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("l", newLimit.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  }

  useEffect(() => {
    if (length === limit) {
      setLoading(false);
    }
  }, [length, limit]);

  if (length < limit) return null;

  return (
    <button
      onClick={() => updateLimit()}
      disabled={loading}
      type="button"
      aria-label="Load More"
      className="group mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-primary_color px-4 py-2 text-center text-white hover:bg-white hover:text-black"
    >
      <p className="duration-500 group-hover:scale-110">
        {loading ? (
          <p className="text-4xl">
            <LoadingDots />
          </p>
        ) : (
          "Load More"
        )}
      </p>
    </button>
  );
};

export default LoadMore;
