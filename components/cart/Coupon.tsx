"use client";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import LoadingDots from "../loading-dots";
import CustomInput from "../CustomInput";
import Plus_Icon from "../icons/plus_icon";

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
          className="h-14 w-14 rounded-lg border-gray-200 bg-black text-center text-3xl text-white duration-300 hover:bg-white hover:text-black "
        >
          <div className="flex items-center justify-center">
            {loading ? <LoadingDots /> : <Plus_Icon className="h-8 w-8" />}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Coupon;
