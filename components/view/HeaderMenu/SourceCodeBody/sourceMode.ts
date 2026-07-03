import React from "react";
import { IBlock } from "../../../../types";
import {
  getBootstrapFullPageSourceCode,
  getBootstrapReactSourceCode,
  getBootstrapSourceCode,
} from "../../../../utils/export/sourceCode";

export type SourceMode = "html" | "fullPage" | "react";

export const SOURCE_MODE_OPTIONS: Array<{
  mode: SourceMode;
  label: string;
}> = [
  { mode: "html", label: "HTML" },
  { mode: "fullPage", label: "Full page" },
  { mode: "react", label: "React" },
];

const SOURCE_MODE_STORAGE_KEY = "layoutit.sourceCodeMode";

function isSourceMode(value: string | null): value is SourceMode {
  return value === "html" || value === "fullPage" || value === "react";
}

function getInitialSourceMode(): SourceMode {
  if (typeof window === "undefined") return "html";

  const storedMode = window.localStorage.getItem(SOURCE_MODE_STORAGE_KEY);
  return isSourceMode(storedMode) ? storedMode : "html";
}

function getSourceCode(blockTree: IBlock, sourceMode: SourceMode) {
  if (sourceMode === "react") {
    return getBootstrapReactSourceCode(blockTree);
  }

  return sourceMode === "fullPage"
    ? getBootstrapFullPageSourceCode(blockTree)
    : getBootstrapSourceCode(blockTree);
}

export function useSourceMode(blockTree: IBlock) {
  const [sourceMode, setSourceMode] = React.useState<SourceMode>(
    getInitialSourceMode
  );
  const sourceCode = React.useMemo(
    () => getSourceCode(blockTree, sourceMode),
    [blockTree, sourceMode]
  );

  React.useEffect(() => {
    window.localStorage.setItem(SOURCE_MODE_STORAGE_KEY, sourceMode);
  }, [sourceMode]);

  return {
    sourceCode,
    sourceMode,
    setSourceMode,
  };
}
