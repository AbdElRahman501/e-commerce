import { subscribe } from "@/lib/actions/users.actions";
import React from "react";
import SubmitButton from "./SubmitButton";
import { MdiLightEmail } from "./icons/emailIcon";
import CheckMark from "./icons/CheckMark";

const SubscriptionSection = ({
  customer_posted,
}: {
  customer_posted?: string;
}) => {
  const customerPosted = customer_posted === "true";
  return (
    <form action={subscribe} className="flex flex-col gap-6 p-5 xl:px-20 ">
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-9 w-9 fill-current"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0"></path>
            <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28"></path>
          </g>
        </svg>
      </div>
      <div>
        <h1 className="text-center text-3xl font-bold">
          Subscribe to our Newsletter!
        </h1>
        <p className="mt-5 text-center text-sm">
          Enter your email to receive 15% code on for your first purchase
        </p>
      </div>

      {customerPosted ? (
        <div className="flex w-full justify-center gap-1 rounded-md bg-green-100 p-5 dark:bg-green-950  ">
          <div className="rounded-full bg-green-600 p-1 text-white dark:bg-green-400">
            <CheckMark
              className="h-3 w-3 fill-white dark:fill-black"
              strokeWidth={2}
            />
          </div>
          <p className="text-sm text-green-600 dark:text-green-400">
            You have been subscribed to our newsletter.
          </p>
        </div>
      ) : (
        <div className=" flex w-full flex-col items-center justify-center gap-2 sm:flex-row  ">
          <div className="relative flex w-full flex-col sm:flex-row md:max-w-xs">
            <input
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
              type={"email"}
              name={"email"}
              id={"email"}
              placeholder=" "
              className="peer h-14 w-full rounded-lg border-[1px] border-gray-300 bg-transparent px-4 pt-3 text-base outline-none  placeholder-shown:pt-0 focus:border-2  focus:border-black focus:pt-3 focus:text-black motion-reduce:transition-none dark:border-gray-700  dark:text-white dark:placeholder-gray-300 focus:dark:border-white  focus:dark:text-white  "
            />
            <label
              className="peer-placeholder-shown:text-blue-gray-500  peer-disabled:peer-placeholder-shown:text-blue-gray-500 !overflow-block pointer-events-none absolute left-0 top-2 flex h-full w-full select-none truncate px-4 text-[11px] font-normal leading-tight text-gray-500 transition-all  peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75]  peer-focus:top-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-disabled:text-transparent dark:peer-focus:text-white "
              htmlFor={"email"}
            >
              {"Email"}
            </label>
          </div>
          <SubmitButton
            type="submit"
            className="group mt-2 flex h-14 w-full items-center justify-center rounded-full bg-black px-5 uppercase  text-white duration-300 hover:bg-white hover:text-black sm:w-fit"
          >
            <MdiLightEmail className="mx-2 h-6 w-6 fill-current" /> Subscribe
          </SubmitButton>
        </div>
      )}
    </form>
  );
};

export default SubscriptionSection;
