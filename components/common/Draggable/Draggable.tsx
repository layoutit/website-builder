import React from "react";
import { useBuilderUiContext, useCatalogContext, useEditorContext } from "../../../store";
import { IBlock } from "../../../types";
import { DRAGGED_BLOCK_DATA_TYPE, serializeDraggedBlock } from "../../../utils/dragBlockData";
import styles from "./Draggable.module.scss";

type DraggableProps = {
  type?: string;
  id?: string;
  block?: IBlock;
  onDragStart?: (e: React.DragEvent<HTMLElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLElement>) => void;
  onDrag?: (e: React.DragEvent<HTMLElement>) => void;
  draggingImage?: React.RefObject<Element>;
  sideBarItem?: boolean;
  mainContent?: boolean;
};

export function Draggable(props: React.PropsWithChildren<DraggableProps>) {
  const {
    type,
    id,
    block,
    onDragStart,
    onDragEnd,
    onDrag,
    draggingImage,
    sideBarItem,
    mainContent,
  } = props;
  const { components } = useCatalogContext();
  const { closeEditor } = useEditorContext();
  const { setAllowDropElement, setDropAreaHeight } = useBuilderUiContext();
  const handleDragStart = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (type) {
        e.dataTransfer.setData("type", type);
        setAllowDropElement(block?.mainContent ?? components[type]?.mainContent);
      }
      if (block) {
        e.dataTransfer.setData(DRAGGED_BLOCK_DATA_TYPE, serializeDraggedBlock(block));
      }
      if (id) {
        e.dataTransfer.setData("id", id);
        setAllowDropElement(mainContent);
      }

      if (typeof document !== "undefined") {
        document.body.classList.add("dragging");
      }

      e.dataTransfer.effectAllowed = "all";
      e.dataTransfer.dropEffect = "copy";

      if (draggingImage?.current) {
        const { width, right, top, height } =
          draggingImage.current.getBoundingClientRect();
        const { clientX, clientY } = e;
        const xPoss = sideBarItem ? Math.min(24, Math.round(width * 0.3)) : width * 2 - (right - clientX) * 2;
        const yPoss = sideBarItem ? Math.min(24, Math.round(height * 0.3)) : (clientY - top) * 2;
        setDropAreaHeight(`${height}px`);
        e.dataTransfer.setDragImage(draggingImage.current, xPoss, yPoss);
      }
      closeEditor();

      onDragStart?.(e);
    },
    [
      components,
      block,
      draggingImage,
      id,
      mainContent,
      onDragStart,
      setAllowDropElement,
      setDropAreaHeight,
      closeEditor,
      sideBarItem,
      type,
    ]
  );

  const handleDragEnd = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("dragging");
      }
      onDragEnd?.(e);
    },
    [onDragEnd]
  );

  const handleDrag = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      onDrag?.(e);
    },
    [onDrag]
  );

  return (
    <span
      draggable
      className={styles.draggable}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </span>
  );
}
