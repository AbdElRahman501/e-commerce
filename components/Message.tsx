import Link from "next/link";
import React from "react";

const Message = ({ message }: { message: string }) => {
  return (
    <div className="rounded-md bg-gray-200 p-5 text-center dark:bg-gray-700  lg:px-20">
      {" "}
      <h3 className="text-xl font-bold">{message}</h3>
      <Link href="/shop" className=" underline hover:no-underline ">
        Add some products
      </Link>
    </div>
  );
};

export default Message;
