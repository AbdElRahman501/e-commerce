"use client";
import { ArrowButtonProps } from "@/types";
import Link from "next/link";
import React from "react";

const ArrowButton = ({ className, href }: ArrowButtonProps) => {
  return (
    <Link
      href={href}
      className={`m-[5px] flex h-[50px] w-[50px] items-center justify-center rounded-full  duration-300 hover:scale-110 hover:bg-gray-400 ${className}`}
    >
      <p className="-rotate-45">{`->`}</p>
    </Link>
  );
};

export default ArrowButton;
