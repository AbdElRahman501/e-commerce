"use client";
import { useFormStatus } from "react-dom";
import LoadingDots from "../loading-dots";
import { useEffect, useState } from "react";

export default function SubmitButton({
  title,
  disable,
}: {
  disable?: boolean;
  title: string;
}) {
  const { pending } = useFormStatus();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted && pending) {
      localStorage.removeItem("cartItems");
    }
  }, [submitted, pending]);

  return (
    <button
      type="submit"
      onClick={() => setSubmitted(true)}
      aria-label="checkout"
      disabled={pending || disable}
      className="max-h-14 w-full rounded-lg border bg-black p-4 text-center uppercase text-white  duration-300 hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
    >
      {pending ? (
        <p className="text-4xl duration-300 ">
          <LoadingDots />
        </p>
      ) : (
        title
      )}
    </button>
  );
}
