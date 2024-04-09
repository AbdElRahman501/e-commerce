"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoadingDots from "./loading-dots";

export default function SubmitButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <button {...props}>
      {pending ? (
        <p className="text-4xl">
          <LoadingDots />
        </p>
      ) : (
        props.children
      )}
    </button>
  );
}
