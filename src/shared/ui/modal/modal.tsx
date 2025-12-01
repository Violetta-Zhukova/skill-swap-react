import ReactDOM from "react-dom";
import { ModalUI } from "./modal-ui/modalUI";
import React, { useEffect, type FC } from "react";

const modalRoot = document.getElementById("modals");

type TModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: FC<TModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI onClose={onClose}>{children}</ModalUI>,
    modalRoot as HTMLDivElement,
  );
};
