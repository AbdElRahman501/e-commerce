import Link from "next/link";
import React from "react";

const Message = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
      {" "}
      <h3 className="text-xl font-bold">{message}</h3>
      <Link href="/shop">
        <div className="group mx-auto mt-2 flex h-14 w-full max-w-xs items-center justify-center rounded-lg bg-black uppercase   text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
          <p className="duration-500 group-hover:scale-110">
            continue shopping
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Message;
