import React from "react";
import { useBuilderUiContext, useDocumentContext } from "../../../../store";
import { Button } from "../../../common";
import { CopyIcon } from "../../../common/ButtonIcons/ButtonIcons";
import styles from "./SourceCodeBody.module.scss";
import { highlightSourceCode } from "./sourceHighlight";
import { useSourceMode } from "./sourceMode";
import { SourceModeSwitch } from "./SourceModeSwitch";
import {
  getCopyButtonLabel,
  useSourceClipboard,
} from "./useSourceClipboard";

export function SourceCodeBody() {
  const { blockTree } = useDocumentContext();
  const { openModal } = useBuilderUiContext();
  const codeBlockRef = React.useRef<HTMLPreElement>(null);
  const { sourceCode, sourceMode, setSourceMode } = useSourceMode(blockTree);
  const { copySourceCode, copyState } = useSourceClipboard({
    codeBlockRef,
    openModal,
    sourceCode,
  });
  const highlightedCode = React.useMemo(
    () => highlightSourceCode(sourceCode),
    [sourceCode]
  );

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.actions}>
        <SourceModeSwitch
          sourceMode={sourceMode}
          setSourceMode={setSourceMode}
        />
        {copyState === "failed" && (
          <span className={styles.status} role="status">
            Copy failed
          </span>
        )}
        <Button
          className={styles.copyButton}
          variant="rounded"
          background="secondary"
          onClick={() => void copySourceCode()}
          icon={<CopyIcon />}
        >
          {getCopyButtonLabel(copyState, sourceMode)}
        </Button>
      </div>
      <pre
        ref={codeBlockRef}
        className={styles.codeArea}
        tabIndex={0}
        aria-label={
          sourceMode === "react" ? "Generated React code" : "Generated HTML code"
        }
      >
        <code>{highlightedCode}</code>
      </pre>
    </div>
  );
}
