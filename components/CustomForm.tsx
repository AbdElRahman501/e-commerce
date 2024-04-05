"use client";
import { useFormState } from "react-dom";
import React from "react";

export default function CustomForm({
  action,
  data,
  children,
  className,
}: {
  action: (previousState: any, data: any) => void;
  data: any;
  children: React.ReactNode;
  className?: string;
}) {
  const [message, formAction] = useFormState(action, null);
  const actionWithVariant = formAction.bind(null, data);

  return (
    <form className={className} action={actionWithVariant}>
      {children}
    </form>
  );
}
