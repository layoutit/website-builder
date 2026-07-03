import React from "react";
import { useBuilderUiContext } from "../../../store";
import { classname } from "../../../utils/classname";
import { DRAGGED_BLOCK_DATA_TYPE, parseDraggedBlock } from "../../../utils/dragBlockData";
import styles from "./Droppable.module.scss";
import { IBlock } from "../../../types";

type DroppableProps = {
  mainBlock?: boolean;
  onDrop?: (type?: string, id?: string, block?: IBlock) => void;
};

export function Droppable(props: React.PropsWithChildren<DroppableProps>) {
  const { children, mainBlock, onDrop } = props;
  const { allowDropElement, dropAreaHeight } = useBuilderUiContext();
  const [isOver, setIsOver] = React.useState(false);
  const canDrop = React.useMemo(
    () => (mainBlock && allowDropElement) || mainBlock === undefined,
    [allowDropElement, mainBlock]
  );

  const handleDragEnter = React.useCallback(() => {
    setIsOver(true);
  }, []);

  const handleDragLeave = React.useCallback(() => {
    setIsOver(false);
  }, []);

  const handleDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (canDrop) {
        event.preventDefault();
        event.stopPropagation();

        onDrop?.(
          event.dataTransfer.getData("type"),
          event.dataTransfer.getData("id"),
          parseDraggedBlock(event.dataTransfer.getData(DRAGGED_BLOCK_DATA_TYPE))
        );
      }

      setIsOver(false);
    },
    [canDrop, onDrop]
  );

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ minHeight: isOver && canDrop ? dropAreaHeight : undefined }}
      className={classname(styles.droppable, isOver && canDrop && styles.droppableOver)}
      data-droppable="true"
    >
      {children}
    </div>
  );
}
