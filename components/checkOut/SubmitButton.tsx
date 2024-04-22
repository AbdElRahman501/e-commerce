"use client";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";

export default function SubmitButton({
  title,
  disable,
}: {
  disable: boolean;
  title: string;
}) {
  const { pending } = useFormStatus();
  console.log(pending || disable);

  return (
    <button
      type="submit"
      aria-label="checkout"
      disabled={pending || disable}
      className="enabled:group mt-2 h-14 w-full overflow-hidden rounded-2xl bg-black px-5 uppercase  text-white duration-300 enabled:hover:bg-white enabled:hover:text-black dark:bg-white dark:text-black dark:enabled:hover:bg-black dark:enabled:hover:text-white"
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
