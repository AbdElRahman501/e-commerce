"use client";
import { useFormState } from "react-dom";
import React from "react";

export default function CustomForm({
  action,
  customAction,
  data,
  children,
  className,
}: {
  action: (previousState: any, data: any) => void;
  customAction?: () => void;
  data: any;
  children: React.ReactNode;
  className?: string;
}) {
  const [message, formAction] = useFormState(action, null);
  const actionWithVariant = formAction.bind(null, data);

  function myFunction() {
    customAction && customAction();
    actionWithVariant();
  }

  return (
    <form className={className} action={myFunction}>
      {children}
    </form>
  );
}
