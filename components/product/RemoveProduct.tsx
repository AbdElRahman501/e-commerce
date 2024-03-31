"use client";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import { removeProduct } from "../actions/product.actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label="add cart item"
      disabled={pending}
      className="relative h-6 w-6"
    >
      <p className="text-xs  text-red-500">DELETE</p>
    </button>
  );
}

export default function RemoveProduct({ id }: { id: string }) {
  const [message, formAction] = useFormState(removeProduct, null);
  const actionWithVariant = formAction.bind(null, id);

  return (
    <form
      action={actionWithVariant}
      className="flex items-center justify-center"
    >
      <SubmitButton />
    </form>
  );
}
