"use client";
import Link, { LinkProps } from "next/link";
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onCloseBath?: LinkProps["href"];
  children: React.ReactNode;
  delay?: number;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCloseBath,
  children,
  delay = 0,
  onClose,
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
      ) : (
        <div
          onClick={() => setIsOpened(false)}
          className=" absolute inset-0 cursor-pointer bg-black opacity-50"
        ></div>
      )}
      <div className="relative z-10 max-h-[90vh] max-w-[95vw] overflow-y-auto rounded-lg bg-white p-8 shadow-lg dark:bg-[#0d1117] sm:max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
