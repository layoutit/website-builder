import React from "react";
import { IBlock } from "../../../types";
import { AddBlock, MoveBlock } from "./blockTypes";

export function useBlockDrop(options: {
  blockId: string;
  addBlock: AddBlock;
  moveBlock: MoveBlock;
}) {
  const { blockId, addBlock, moveBlock } = options;

  return React.useCallback(
    (siblingID?: string) => {
      return (type?: string, id?: string, block?: IBlock) => {
        if (id) {
          moveBlock(blockId, id, siblingID);
          return;
        }

        if (type) {
          addBlock(blockId, type, siblingID, block);
        }
      };
    },
    [addBlock, blockId, moveBlock]
  );
}
