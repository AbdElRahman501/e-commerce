"use client";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import LoadingDots from "../loading-dots";
import CustomInput from "../CustomInput";
import Plus_Icon from "../icons/plus_icon";
import CheckMark from "../icons/CheckMark";

const Coupon = ({
  coupon: initCoupon,
  success,
  error,
}: {
  success?: boolean;
  error?: boolean;
  coupon: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [changed, setIsChanged] = React.useState(false);
  const [coupon, setCoupon] = React.useState(initCoupon);
  function submitHandler() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setIsChanged(false);
    const newParams = new URLSearchParams(searchParams.toString());
    if (coupon) {
      newParams.set("coupon", coupon.trim());
    } else {
      newParams.delete("coupon");
    }
    router.replace(createUrl(pathname, newParams), { scroll: false });
  }

  useEffect(() => {
    if ((success || error) && loading) {
      setLoading(false);
    }
  }, [success, error, loading]);
  return (
    <div className="flex gap-2">
      <CustomInput
        type="text"
        label="Promo Code"
        placeholder="Promo code"
        defaultValue={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setIsChanged(true);
        }}
        name="promoCode"
      />
      <div>
        <button
          onClick={submitHandler}
          type="button"
          disabled={loading || !coupon}
          aria-disabled={loading}
          aria-label="add cart item"
          className={`${success && !changed ? "bg-green-500" : " bg-black "} h-14 w-14 rounded-lg border-gray-200 text-center text-3xl text-white duration-300 enabled:hover:bg-white enabled:hover:text-black disabled:opacity-50 `}
        >
          <div className="flex items-center justify-center">
            {loading ? (
              <LoadingDots />
            ) : success && !changed ? (
              <CheckMark className=" w-9 fill-current" />
            ) : (
              <Plus_Icon className=" w-8" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Coupon;
