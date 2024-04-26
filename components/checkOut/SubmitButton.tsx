"use client";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";

export default function SubmitButton({
  title,
  disable,
}: {
  disable?: boolean;
  title: string;
}) {
  const { pending } = useFormStatus();
  console.log(pending || disable);

  return (
    <button
      type="submit"
      aria-label="checkout"
      disabled={pending || disable}
      className="mt-2 h-14 w-full overflow-hidden rounded-lg bg-black px-5 uppercase text-white  duration-300 enabled:hover:bg-white enabled:hover:text-black disabled:opacity-75 dark:bg-white dark:text-black dark:enabled:hover:bg-black dark:enabled:hover:text-white"
    >
      {pending ? (
        <p className="text-4xl duration-300 ">
          <LoadingDots />
        </p>
      ) : (
        <p className="duration-300 ">{title}</p>
      )}
    </button>
  );
}
