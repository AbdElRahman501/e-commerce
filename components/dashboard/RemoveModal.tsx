"use client";
import React from "react";
import Modal from "../Modal";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SubmitButton from "../SubmitButton";

const RemoveModal = ({
  name,
  action,
  children,
}: {
  action: any;
  name?: string;
  children?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  if (!action || !name) return null;

  const id = searchParams?.get("remove" + name.toUpperCase() + "Id") || "";

  return (
    <Modal isOpen={!!id} onCloseBath={pathname}>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <form action={action} className="flex flex-col gap-2">
          <input type="text" name="id" value={id} readOnly hidden />
          {children}
          <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
            remove
          </SubmitButton>
        </form>
        <Link
          replace
          href={pathname}
          className="rounded-lg border px-4 py-2 text-center "
        >
          close
        </Link>
      </div>
    </Modal>
  );
};

export default RemoveModal;
