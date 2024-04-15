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
  const { loadingItem, children, ...rest } = props;
  return (
    <button {...rest}>
      {pending ? (
        loadingItem ? (
          loadingItem
        ) : (
          <p className="text-4xl">
            <LoadingDots />
          </p>
        )
      ) : (
        children
      )}
    </button>
  );
}
