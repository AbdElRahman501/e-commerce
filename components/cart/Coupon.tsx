"use client";
import { createUrl } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LoadingDots from "../loading-dots";

const Coupon = ({ coupon }: { coupon: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const coupon = val.coupon as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());
    if (coupon.value) {
      newParams.set("coupon", coupon.value.trim());
    } else {
      newParams.delete("coupon");
    }
    router.replace(createUrl("/cart", newParams));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Coupon code"
        name="coupon"
        defaultValue={coupon}
        className=" h-12 w-full rounded-2xl border border-gray-500 bg-transparent px-4  outline-none dark:placeholder:text-gray-300 "
      />
      <div>
        <button
          type="submit"
          className="h-12 w-12  rounded-full bg-primary_color hover:bg-gray-900 "
        >
          {loading ? (
            <LoadingDots />
          ) : (
            <span className="m-auto block -translate-y-[1px] translate-x-[1px] text-3xl  text-white hover:scale-110">
              &#43;
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Coupon;
