"use client";
import Link from "next/link";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onCloseBath?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCloseBath, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {onCloseBath ? (
        <Link
          href={onCloseBath}
          className="absolute inset-0 bg-black opacity-50"
        ></Link>
      ) : (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <div className="relative z-10 max-h-[90vh] min-w-[60vw] max-w-md overflow-y-auto rounded-lg bg-white p-8 shadow-lg dark:bg-[#0d1117]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
