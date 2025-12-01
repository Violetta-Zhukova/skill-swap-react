import type { FC } from "react";
import styles from "./modalUI.module.css";
import { ModalOverlayUI } from "../modal-overlay/modal-overlay";

type TModalUIProps = {
  image: string;
  title: string;
  text: string;
  buttonText: string;
  onClose: () => void;
};

export const ModalUI: FC<TModalUIProps> = ({
  image,
  title,
  text,
  buttonText,
  onClose,
}) => {
  return (
    <>
      <div className={styles.modal}>
        <img src={image} className={styles.image} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.content}>{text}</p>
        <button onClick={onClose} className={styles.button}>
          {buttonText}
        </button>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  );
};
