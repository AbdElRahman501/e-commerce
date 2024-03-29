import Link from "next/link";
import React from "react";

const Message = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
      {" "}
      <h3 className="text-xl font-bold">{message}</h3>
      <Link href="/shop">
        <div className="group mx-auto mt-2 flex h-14 w-full max-w-xs items-center justify-center rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900">
          <p className="duration-500 group-hover:scale-110">
            continue shopping
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Message;
