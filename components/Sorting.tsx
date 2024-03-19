"use client";
import { createUrl } from "@/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sorting = ({ classNames = "" }: { classNames?: string }) => {
  const options = ["Price: Low to High", "Price: High to Low"];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function changHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", e.target.value);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.push(optionUrl);
  }

  return (
    <div className={classNames}>
      {" "}
      <Image
        src={"/icons/sort.svg"}
        width={24}
        height={24}
        alt={"sort icon"}
        className="dark:invert"
      />
      <select
        name="sort"
        id="sort"
        value={searchParams?.get("sort") || ""}
        onChange={changHandler}
        className="h-full w-full appearance-none rounded-2xl bg-transparent text-base outline-none "
      >
        <option value="" disabled>
          {" "}
          sort{" "}
        </option>
        {options &&
          options.map((option, i) => (
            <option key={i} value={option} className="dark:text-black">
              {option}
            </option>
          ))}
      </select>
      <Image
        src={"/icons/arrow-down.svg"}
        width={24}
        height={24}
        alt={"sort icon"}
        className="dark:invert"
      />
    </div>
  );
};

export default Sorting;
