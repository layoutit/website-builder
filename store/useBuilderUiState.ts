import React from "react";
import { defaultEditorState } from "./storeTypes";

export function useBuilderUiState() {
  const [dropAreaHeight, setDropAreaHeight] = React.useState<string>();
  const [allowDropElement, setAllowDropElement] = React.useState<boolean>();
  const [editorState, setEditorState] = React.useState(defaultEditorState);
  const [typecode, setTypecode] = React.useState("javascript");
  const [previewMode, setPreviewMode] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const closeEditor = React.useCallback(() => {
    setEditorState((state) => ({ ...state, activeBlockId: "" }));
  }, []);

  return {
    dropAreaHeight,
    setDropAreaHeight,
    allowDropElement,
    setAllowDropElement,
    editorState,
    setEditorState,
    closeEditor,
    previewMode,
    setPreviewMode,
    openModal,
    setOpenModal,
    typecode,
    setTypecode,
  };
}
