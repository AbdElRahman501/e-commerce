"use client";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoadingDots from "./loading-dots";

export default function SubmitButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    loadingItem?: React.ReactNode;
  },
) {
  const { pending } = useFormStatus();
  return (
    <button {...props}>
      {pending ? (
        props.loadingItem ? (
          props.loadingItem
        ) : (
          <p className="text-4xl">
            <LoadingDots />
          </p>
        )
      ) : (
        props.children
      )}
    </button>
  );
}
