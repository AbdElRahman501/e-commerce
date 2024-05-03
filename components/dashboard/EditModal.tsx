"use client";
import React from "react";
import Modal from "../Modal";
import CustomInput from "../CustomInput";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createInputArray } from "@/utils";
import SubmitButton from "../SubmitButton";

const EditModal = ({
  name,
  action,
  data,
  inputObj,
  children,
}: {
  data: any;
  inputObj: any;
  name?: string;
  action?: any;
  children?: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (!data || !action || !name) return null;
  const editId = searchParams?.get("edit" + name.toUpperCase() + "Id") || "";
  const inputArray = createInputArray(inputObj);
  const selectedItem = data.find(
    (x: any) => x._id === editId || x.id === editId,
  );

  return (
    <Modal isOpen={!!selectedItem} onCloseBath={pathname}>
      <div className="flex flex-col gap-5 p-5 lg:p-20">
        <form action={action} className="flex min-w-60 flex-col gap-2">
          {children}
          <input type="text" name="id" value={editId} readOnly hidden />
          {inputArray.map((item, index) => {
            return (
              <CustomInput
                key={index}
                placeholder={item.placeholder}
                label={item.label}
                type={item.type}
                defaultValue={selectedItem?.[item.name]}
                name={item.name}
                options={item.options}
                required={item.required}
              />
            );
          })}
          <SubmitButton className="rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-white hover:text-black dark:bg-white  dark:text-black dark:hover:bg-black dark:hover:text-white">
            Update
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

export default EditModal;
