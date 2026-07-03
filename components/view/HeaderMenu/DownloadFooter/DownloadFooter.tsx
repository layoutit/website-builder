import React from "react";
import { useBuilderUiContext } from "../../../../store";
import styles from "./DownloadFooter.module.scss";

export function DownloadFooter() {
  const { setOpenModal } = useBuilderUiContext();

  const handleClick = React.useCallback(
    () => {
      setOpenModal(false);
    },
    [setOpenModal]
  );

  return (
    <div className={styles.footer}>
      <button className={styles.closeButton} onClick={handleClick}>
        Close
      </button>
    </div>
  );
};
