"use client";
import { useFormState, useFormStatus } from "react-dom";
import { toggleFav } from "../actions/fav.actions";
import React from "react";
import HeartIcon from "../icons/HeartIcon";

function SubmitButton({
  isFav,
  className,
}: {
  isFav: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();
  const [inFav, setInFav] = React.useState(isFav);

  return (
    <button
      type="submit"
      onClick={() => setInFav(!inFav)}
      aria-label="add cart item"
      disabled={pending}
      className="relative h-6 w-6"
    >
      {isFav ? (
        <HeartIcon
          fillRule="nonzero"
          className="h-5 w-5 text-red-800  duration-200 hover:scale-110"
        />
      ) : (
        <HeartIcon
          fillRule="evenodd"
          className="h-5 w-5  duration-200 hover:scale-110"
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
      className="flex h-5 w-5 items-center justify-center"
    >
      <SubmitButton isFav={isFav || false} className={className} />
    </form>
  );
}
