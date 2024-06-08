"use client";
import React from "react";
import Modal from "../Modal";
import CustomInput from "../CustomInput";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createInputArray } from "@/utils";
import SubmitButton from "../SubmitButton";

const AddModal = ({
  name,
  action,
  inputObj,
  children,
}: {
  inputObj: any;
  name?: string;
  action: any;
  children?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  if (!action || !name) return null;

  const addNew = searchParams?.get("addNew" + name.toUpperCase()) || "";
  const inputArray = createInputArray(inputObj);

  return (
    <Modal isOpen={!!addNew} onCloseBath={pathname}>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <form action={action} className="flex flex-col gap-2">
          {children}
          {inputArray.map((item, index) => (
            <CustomInput
              key={index}
              placeholder={item.placeholder}
              label={item.label}
              type={item.type}
              name={item.name}
              required={item.required}
            />
          ))}
          <SubmitButton className="rounded-lg bg-primary_color px-4 py-2 text-center text-white hover:bg-white hover:text-black">
            create
          </SubmitButton>
        </form>
        <Link
          replace
          scroll={false}
          href={pathname}
          className="rounded-lg border px-4 py-2 text-center "
        >
          close
        </Link>
      </div>
    </Modal>
  );
};

export default AddModal;
