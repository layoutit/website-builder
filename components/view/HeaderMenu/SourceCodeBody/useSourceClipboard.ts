import React from "react";
import { SourceMode } from "./sourceMode";

export type CopyState = "idle" | "copied" | "failed";

type SourceClipboardOptions = {
  codeBlockRef: React.RefObject<HTMLPreElement>;
  openModal: boolean;
  sourceCode: string;
};

function selectSourceCode(codeBlockRef: React.RefObject<HTMLPreElement>) {
  if (!codeBlockRef.current) return;

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(codeBlockRef.current);
  selection?.removeAllRanges();
  selection?.addRange(range);
  codeBlockRef.current.focus();
}

export function getCopyButtonLabel(
  copyState: CopyState,
  sourceMode: SourceMode
) {
  if (copyState !== "copied") return "Copy code";

  return {
    fullPage: "Copied full page",
    html: "Copied HTML",
    react: "Copied React",
  }[sourceMode];
}

export function useSourceClipboard({
  codeBlockRef,
  openModal,
  sourceCode,
}: SourceClipboardOptions) {
  const [copyState, setCopyState] = React.useState<CopyState>("idle");

  React.useEffect(() => {
    if (!openModal) return;

    setCopyState("idle");
  }, [openModal, sourceCode]);

  const copySourceCode = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sourceCode);
      setCopyState("copied");
      return;
    } catch {
      selectSourceCode(codeBlockRef);
    }

    try {
      const copied = document.execCommand("copy");
      setCopyState(copied ? "copied" : "failed");
    } catch {
      setCopyState("failed");
    }
  }, [codeBlockRef, sourceCode]);

  return {
    copySourceCode,
    copyState,
  };
}
