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
      className="group mt-2 flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-primary_color px-4 py-2 text-center text-white enabled:hover:bg-white enabled:hover:text-black disabled:opacity-80"
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
