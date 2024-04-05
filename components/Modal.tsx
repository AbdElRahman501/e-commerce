"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-primary_color">
        {children}
        {onClose && (
          <button
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
