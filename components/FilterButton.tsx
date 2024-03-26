"use client";
import { createUrl } from "@/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FilterButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams?.get("ft") === "true";

  function setIsOpen(isOpen: boolean) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("ft", isOpen.toString());
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl);
  }

  const openFilter = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 220, behavior: "smooth" });
      }, 300);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <div>
      <button
        type="button"
        onClick={openFilter}
        className="flex h-14 w-14 flex-grow-0 items-center justify-center  rounded-2xl border bg-primary_color dark:bg-white md:hidden"
      >
        <Image
          src={isOpen ? "/icons/close.svg" : "/icons/filter.svg"}
          alt="search"
          width={30}
          height={30}
          className="invert dark:invert-0"
        />
      </button>
    </div>
  );
};

export default FilterButton;
