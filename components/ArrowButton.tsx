"use client";
import { ArrowButtonProps } from "@/types";
import Link from "next/link";
import React from "react";
import DropDown_icon from "./icons/DropDown_icon";

const ArrowButton = ({ className, href }: ArrowButtonProps) => {
  return (
    <Link
      href={href}
      className={` flex h-[50px] w-[50px] items-center justify-center rounded-full  duration-300 hover:scale-110  ${className}`}
    >
      <DropDown_icon className=" w-6 -rotate-[135deg] " />
    </Link>
  );
};

export default ArrowButton;
