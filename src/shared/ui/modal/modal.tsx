import ReactDOM from "react-dom";
import { ModalUI } from "./modal-ui/modalUI";
import { useEffect, type FC } from "react";

const modalRoot = document.getElementById("modals");

type TModalProps = {
  onClose: () => void;
  image: string;
  title: string;
  text: string;
  buttonText: string;
};

export const Modal: FC<TModalProps> = ({
  image,
  title,
  text,
  buttonText,
  onClose,
}) => {
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
    <ModalUI
      onClose={onClose}
      image={image}
      title={title}
      text={text}
      buttonText={buttonText}
    />,
    modalRoot as HTMLDivElement,
  );
};
