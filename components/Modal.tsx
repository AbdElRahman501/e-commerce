"use client";
import Link, { LinkProps } from "next/link";
import React, { useEffect } from "react";
import Ex_icon from "./icons/Ex_icon";

interface ModalProps {
  isOpen: boolean;
  onCloseBath?: LinkProps["href"];
  children: React.ReactNode;
  delay?: number;
  onClose?: () => void;
  className?: string;
  formAction?: any;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCloseBath,
  children,
  delay = 0,
  onClose,
  className,
  formAction,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    if (isOpen && delay > 0) {
      if (!mounted) {
        setTimeout(() => {
          setIsOpened(true);
        }, delay);
        setMounted(true);
      }
    } else {
      setIsOpened(isOpen);
    }
  }, [isOpen, delay, mounted]);

  if (!isOpened) return null;
  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center">
      {onCloseBath ? (
        <Link
          href={onCloseBath}
          replace
          scroll={false}
          className="absolute inset-0 bg-black opacity-50"
        ></Link>
      ) : onClose ? (
        <div
          onClick={onClose}
          className=" absolute inset-0 cursor-pointer bg-black opacity-50"
        ></div>
      ) : formAction ? (
        <form action={formAction}>
          <button
            type="submit"
            className=" absolute inset-0 cursor-pointer bg-black opacity-50"
          ></button>
        </form>
      ) : (
        <div
          onClick={() => setIsOpened(false)}
          className=" absolute inset-0 cursor-pointer bg-black opacity-50"
        ></div>
      )}
      <div
        className={
          className
            ? className
            : "relative z-10 max-h-[90vh] max-w-[95vw] overflow-y-auto rounded-lg bg-white p-8 shadow-lg dark:bg-[#0d1117] sm:max-w-md"
        }
      >
        {onCloseBath ? (
          <Link
            href={onCloseBath}
            replace
            scroll={false}
            className=" absolute right-0 top-0 p-2 "
          >
            <Ex_icon className="h-8 w-8 text-black sm:dark:text-white" />
          </Link>
        ) : formAction ? (
          <form action={formAction}>
            <button type="submit" className=" absolute right-0 top-0 p-2 ">
              <Ex_icon className="h-8 w-8 text-black sm:dark:text-white" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => {
              setIsOpened(false);
              onClose && onClose();
            }}
            className=" absolute right-0 top-0 p-2 "
          >
            <Ex_icon className="h-8 w-8 text-black sm:dark:text-white" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
