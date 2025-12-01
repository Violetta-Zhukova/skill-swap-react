import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./popup-menu.module.css";

export type PopupMenuPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "fixed-top-right";

export type PopupMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: PopupMenuPosition;
  anchorRef?: React.RefObject<HTMLElement | null>;
};

export const PopupMenu = ({
  isOpen,
  onClose,
  children,
  position = "bottom-left",
  anchorRef,
}: PopupMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!menuRef.current || menuRef.current.contains(target)) return;

      // Для fixed позиции проверяем только меню
      if (position === "fixed-top-right") {
        onClose();
        return;
      }

      // Для остальных позиций проверяем и якорь
      if (anchorRef?.current && !anchorRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, anchorRef, position]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const updatePosition = () => {
      const menu = menuRef.current;
      if (!menu) return;

      const menuRect = menu.getBoundingClientRect();

      // Если позиция fixed-top-right, позиционируем относительно viewport
      if (position === "fixed-top-right") {
        menu.style.top = "104px";
        menu.style.right = "16px";
        menu.style.left = "auto";
        return;
      }

      // Для остальных позиций нужен anchorRef
      if (!anchorRef?.current) return;
      const anchor = anchorRef.current;

      const anchorRect = anchor.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const gap = 8; // Отступ между якорем и меню

      switch (position) {
        case "top-left":
          top = anchorRect.top - menuRect.height - gap;
          left = anchorRect.left;
          break;
        case "top-right":
          top = anchorRect.top - menuRect.height - gap;
          left = anchorRect.right - menuRect.width;
          break;
        case "bottom-left":
          top = anchorRect.bottom + gap;
          left = anchorRect.left;
          break;
        case "bottom-right":
          top = anchorRect.bottom + gap;
          left = anchorRect.right - menuRect.width;
          break;
      }

      // Проверка на выход за границы экрана
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left + menuRect.width > viewportWidth) {
        left = viewportWidth - menuRect.width - 8;
      }
      if (left < 0) {
        left = 8;
      }

      if (top + menuRect.height > viewportHeight) {
        top = anchorRect.top - menuRect.height;
      }
      if (top < 0) {
        top = anchorRect.bottom;
      }

      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
      menu.style.right = "auto";
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, position, anchorRef]);

  if (!isOpen) return null;

  return createPortal(
    <div ref={menuRef} className={styles.popupMenu}>
      {children}
    </div>,
    document.body,
  );
};
