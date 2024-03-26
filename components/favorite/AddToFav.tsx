"use client";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import LoadingDots from "../loading-dots";
import { toggleFav } from "../actions/fav.actions";

function SubmitButton({
  isFav,
  className,
}: {
  isFav: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="add cart item"
      aria-disabled={pending}
      className="relative h-6 w-6"
    >
      {pending ? (
        <LoadingDots className={className || "invert dark:invert-0"} />
      ) : (
        <Image
          src={isFav ? "/icons/heart-fill.svg" : "/icons/heart.svg"}
          alt="heart icon"
          fill
          sizes="100%"
          className={` ${isFav ? "" : className || "invert dark:invert-0"} duration-200 hover:scale-110 `}
        />
      )}
    </button>
  );
}

export default function AddToFav({
  id,
  inFav,
  className,
}: {
  className?: string;
  id: string;
  inFav: boolean;
}) {
  const [isFav, formAction] = useFormState(toggleFav, inFav);
  const actionWithVariant = formAction.bind(null, id);

  return (
    <form
      action={actionWithVariant}
      className="flex items-center justify-center"
    >
      <SubmitButton isFav={isFav || false} className={className} />
    </form>
  );
}
