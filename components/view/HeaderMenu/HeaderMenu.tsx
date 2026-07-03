import React from "react";
import { useBuilderUiContext, useDocumentContext } from "../../../store";
import { getFrameworkInitialBlock } from "../../../utils/framework";
import { Logo, Menu } from "../../common";
import { HeaderActions } from "./HeaderActions";
import { downloadLayoutZip } from "./headerDownloads";
import styles from "./HeaderMenu.module.scss";

const FEEDBACK_URL = "mailto:info@layoutit.com";

export function HeaderMenu() {
  const { setPreviewMode, setOpenModal } = useBuilderUiContext();
  const { updateBlockTree, framework, blockTree } = useDocumentContext();

  const handleDownloadClick = React.useCallback(
    (type: "javascript" | "typescript") => async () => {
      await downloadLayoutZip({ blockTree, type });
    },
    [blockTree]
  );

  const handleCleanClick = React.useCallback(() => {
    updateBlockTree(getFrameworkInitialBlock(framework));
  }, [framework, updateBlockTree]);

  const handleFeedbackClick = React.useCallback(() => {
    window.location.href = FEEDBACK_URL;
  }, []);

  return (
    <nav className={styles.headerMenuWrapper} aria-label="Primary">
      <Menu className={styles.headerMenu}>
        <Logo />
        <HeaderActions
          onClean={handleCleanClick}
          onDownloadHtml={handleDownloadClick("javascript")}
          onDownloadReact={handleDownloadClick("typescript")}
          onEdit={() => setPreviewMode(false)}
          onFeedback={handleFeedbackClick}
          onPreview={() => setPreviewMode(true)}
          onViewCode={() => setOpenModal(true)}
        />
      </Menu>
    </nav>
  );
}
