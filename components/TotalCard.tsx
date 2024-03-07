import { DashboardCardProps } from "@/types";
import Image from "next/image";
import React from "react";

const TotalCard = ({
  image,
  title,
  number,
  description,
}: DashboardCardProps) => {
  return (
    <div className="flex h-28 items-center  gap-3 rounded-3xl border border-blue-300 bg-white p-5 shadow-md ">
      <Image
        src={image}
        width={45}
        height={45}
        objectFit="contain"
        alt={`${title} icon`}
      />
      <div>
        <h1 className="text-base font-bold">{title}</h1>
        <p className="text-sm font-bold">
          {number}{" "}
          <span className=" text-xs font-normal text-green-600">
            {description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TotalCard;
