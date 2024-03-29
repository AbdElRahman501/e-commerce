import { SectionTitleProps } from "@/types";
import Link from "next/link";
import DropDown_icon from "./icons/DropDown_icon";

const SectionTitle = ({ title, url, theme, className }: SectionTitleProps) => {
  return (
    <div
      className={`title flex items-center justify-between text-black  dark:text-white ${className}`}
    >
      <h1 className="text-2xl font-bold uppercase md:text-4xl ">{title}</h1>
      <Link
        href={url}
        className={
          "group flex items-center justify-between  gap-2 rounded-full text-sm md:text-base"
        }
      >
        <p className="uppercase group-hover:underline">See All</p>
        <div
          className={`${theme === "dark" ? "text-black dark:bg-white" : "dark:bg-primary_color dark:group-hover:bg-gray-200 dark:group-hover:text-black"} flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 duration-300 group-hover:bg-black group-hover:text-white `}
        >
          <DropDown_icon className="h-4 w-4 -rotate-[135deg] fill-current " />
        </div>
      </Link>
    </div>
  );
};

export default SectionTitle;
