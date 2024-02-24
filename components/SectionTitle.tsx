import { SectionTitleProps } from "@/types";
import Link from "next/link";

const SectionTitle = ({ title, url, className, theme }: SectionTitleProps) => {
  return (
    <div className={`title flex items-center justify-between ${className}`}>
      <h1 className="text-xl md:text-3xl font-bold ">{title}</h1>
      <Link
        href={url}
        className={`group flex items-center justify-between gap-2 rounded-full border ${theme === "dark" ? "border-white" : "border-black"} p-1 ps-3 text-base dark:border-white`}
      >
        <h1 className="group-hover:underline">See All</h1>
        <div
          className={`m-[5px] flex  h-[24px] w-[24px] items-center  justify-center rounded-full bg-primary_color ${theme === "dark" ? "!bg-white !text-black" : "dark:bg-white dark:text-black"} text-white  duration-300 hover:bg-gray-400  group-hover:scale-110 `}
        >
          <p className="-rotate-45">{`->`}</p>
        </div>
      </Link>
    </div>
  );
};

export default SectionTitle;
