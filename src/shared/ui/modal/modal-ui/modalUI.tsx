import type { FC } from "react";
import styles from "./modalUI.module.css";
import { ModalOverlayUI } from "../modal-overlay/modal-overlay";
import type React from "react";

type TModalUIProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const ModalUI: FC<TModalUIProps> = ({ children, onClose }) => (
  <>
    <div className={styles.modal}>{children}</div>
    <ModalOverlayUI onClick={onClose} />
  </>
);
