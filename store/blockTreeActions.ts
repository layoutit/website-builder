import React from "react";
import { BlockAttributes, ComponentRegistry, IBlock, SelectedProperties } from "../types";
import {
  addTreeBlock,
  moveTreeBlock,
  replaceTreeBlock,
  removeTreeBlock,
  updateTreeBlockAttributes,
  updateTreeBlockContent,
  updateTreeBlockProperties,
} from "../utils/blockTree";
import { withFreshIds } from "../utils/block";

type BlockTreeActionsOptions = {
  components: ComponentRegistry;
  setBlockTree: React.Dispatch<React.SetStateAction<IBlock>>;
};

export function useBlockTreeActions({
  components,
  setBlockTree,
}: BlockTreeActionsOptions) {
  const addBlock = React.useCallback(
    (parentID: string, type: string, siblingID?: string, block?: IBlock) => {
      const descriptor = type ? components[type] : undefined;
      const newBlock = block ? withFreshIds(block) : descriptor?.create();
      if (!newBlock) return;

      setBlockTree((blockTree) =>
        addTreeBlock(blockTree, parentID, newBlock, siblingID)
      );
    },
    [components, setBlockTree]
  );

  const removeBlock = React.useCallback(
    (id: string) => {
      setBlockTree((blockTree) => removeTreeBlock(blockTree, id));
    },
    [setBlockTree]
  );

  const moveBlock = React.useCallback(
    (parentID: string, id: string, siblingID?: string) => {
      setBlockTree((blockTree) =>
        moveTreeBlock(blockTree, parentID, id, siblingID)
      );
    },
    [setBlockTree]
  );

  const updateBlockProperties = React.useCallback(
    (id: string, selectedProperties: SelectedProperties) => {
      setBlockTree((blockTree) =>
        updateTreeBlockProperties(blockTree, id, selectedProperties)
      );
    },
    [setBlockTree]
  );

  const updateBlockAttributes = React.useCallback(
    (id: string, attributes: BlockAttributes | undefined) => {
      setBlockTree((blockTree) =>
        updateTreeBlockAttributes(blockTree, id, attributes)
      );
    },
    [setBlockTree]
  );

  const updateBlockContent = React.useCallback(
    (id: string, content: string | IBlock[]) => {
      setBlockTree((blockTree) => updateTreeBlockContent(blockTree, id, content));
    },
    [setBlockTree]
  );

  const replaceBlock = React.useCallback(
    (id: string, block: IBlock) => {
      setBlockTree((blockTree) => replaceTreeBlock(blockTree, id, block));
    },
    [setBlockTree]
  );

  return {
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockProperties,
    updateBlockAttributes,
    updateBlockContent,
    replaceBlock,
  };
}
