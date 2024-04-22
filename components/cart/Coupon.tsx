"use client";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LoadingDots from "../loading-dots";
import CustomInput from "../CustomInput";

const Coupon = ({ coupon: initCoupon }: { coupon: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [coupon, setCoupon] = React.useState(initCoupon);
  function submitHandler() {
    setLoading(true);
    const newParams = new URLSearchParams(searchParams.toString());
    if (coupon) {
      newParams.set("coupon", coupon.trim());
    } else {
      newParams.delete("coupon");
    }
    router.replace(createUrl(pathname, newParams));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex gap-2">
      <CustomInput
        type="text"
        label="Promo Code"
        placeholder="Promo code"
        defaultValue={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        name="promoCode"
      />
      <div>
        <button
          onClick={submitHandler}
          type="button"
          className="h-12 w-12  rounded-full border-gray-200 bg-primary_color text-3xl text-white hover:bg-white hover:text-black "
        >
          {loading ? (
            <LoadingDots />
          ) : (
            <span className="m-auto block -translate-y-[1px] translate-x-[1px] ">
              &#43;
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Coupon;
