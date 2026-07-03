import React from "react";
import { useBuilderUiContext } from "../../../store";
import styles from "./Modal.module.scss";
import { IModal } from "../../../types/index";

export function Modal(props: IModal) {
  const { openModal, setOpenModal } = useBuilderUiContext();

  const handleClose = React.useCallback(
    () => {
      setOpenModal(false);
    },
    [setOpenModal]
  );

  const handleInternalClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  React.useEffect(() => {
    if (!openModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal, setOpenModal]);

  return (
    openModal ?
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="layoutit-modal-title"
        onClick={handleClose}
      >
        <div className={styles.content} onClick={handleInternalClick}>
          <div className={styles.header}>
            <button
              className={styles.close}
              onClick={handleClose}
              type="button"
              aria-label="Close modal"
            >
              <span>X</span>
            </button>
            <h4 className={styles.title} id="layoutit-modal-title">
              {props.title}
            </h4>
            {props.subtitle &&
              <p className={styles.subtitle}>
                {props.subtitle}
              </p>
            }
          </div>
          <hr className={styles.divider} />
          <div className={styles.body}>
            {props.body}
          </div>
          <div className={styles.footer}>
            {props.footer}
          </div>
        </div>
      </div>
      : null
  );
};
