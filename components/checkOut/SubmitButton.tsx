"use client";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";

export default function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="checkout"
      disabled={pending}
      className="group mt-2 h-14 w-full overflow-hidden rounded-2xl bg-black px-5 uppercase  text-white duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
    >
      {pending ? (
        <p className="text-4xl duration-300 group-hover:scale-110">
          <LoadingDots />
        </p>
      ) : (
        <p className="duration-300 group-hover:scale-110">{title}</p>
      )}
    </button>
  );
}
