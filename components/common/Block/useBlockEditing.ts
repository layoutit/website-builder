import React from "react";
import { IBlock } from "../../../types";
import { getTreeBlockParent } from "../../../utils/blockTree";
import {
  editorBlocksFromHtml,
  flattenEditedBlockContent,
  isEditorFragmentBlock,
  normalizePendingEditorHtml,
} from "../TexEditor/editorHtml";
import { UpdateBlockContent } from "./blockTypes";
import { EditorState } from "../../../store/storeTypes";

type BlockEditingOptions = {
  block: IBlock;
  blockTree: IBlock;
  updateBlockContent: UpdateBlockContent;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
};

function commitPreviousTextEdit(options: {
  activeBlockId: string;
  editorState: EditorState;
  updateBlockContent: UpdateBlockContent;
}) {
  const { activeBlockId, editorState, updateBlockContent } = options;

  if (
    activeBlockId === editorState.pendingBlockId ||
    activeBlockId === "" ||
    editorState.pendingBlockId === ""
  ) {
    return;
  }

  updateBlockContent(
    editorState.pendingBlockId,
    editorBlocksFromHtml(editorState.pendingHtml)
  );
}

export function useBlockEditing({
  block,
  blockTree,
  updateBlockContent,
  editorState,
  setEditorState,
}: BlockEditingOptions) {
  const handleTextEdition = React.useCallback(
    (html?: string) => {
      setEditorState((state) => ({
        ...state,
        pendingHtml: normalizePendingEditorHtml(html),
      }));
    },
    [setEditorState]
  );

  const handleBlockClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (isEditorFragmentBlock(block)) {
        const parent = getTreeBlockParent(blockTree, block.id);
        if (parent) updateBlockContent(parent.id, flattenEditedBlockContent(parent));
      }

      commitPreviousTextEdit({
        activeBlockId: block.id,
        editorState,
        updateBlockContent,
      });

      setEditorState((state) => {
        const activeBlockId = isEditorFragmentBlock(block)
          ? getTreeBlockParent(blockTree, block.id)?.id || ""
          : block.container
            ? ""
            : block.id;
        const isEditableLeaf = !block.container && block.editable;

        return {
          activeBlockId,
          pendingBlockId: isEditableLeaf ? block.id : "",
          pendingHtml:
            isEditableLeaf && state.pendingBlockId === block.id
              ? state.pendingHtml
              : isEditableLeaf
                ? block.content
                : "",
        };
      });
    },
    [block, blockTree, editorState, setEditorState, updateBlockContent]
  );

  return {
    handleBlockClick,
    handleTextEdition,
    isEditing: editorState.activeBlockId === block.id && Boolean(block.editable),
  };
}
