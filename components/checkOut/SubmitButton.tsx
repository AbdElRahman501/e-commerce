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
      className="group mt-2 h-12 w-full overflow-hidden rounded-2xl bg-primary_color uppercase  text-white hover:bg-gray-900"
    >
      {pending ? (
        <p className="duration-500 group-hover:scale-110">
          <LoadingDots />
        </p>
      ) : (
        <p className="duration-500 group-hover:scale-110">{title}</p>
      )}
    </button>
  );
}
