import React from "react";
import {
  useBlockActionsContext,
  useBuilderUiContext,
  useDocumentContext,
  useEditorContext,
} from "../../../store";
import { IBlock } from "../../../types";
import { classesFromProperties } from "../../../utils/properties";
import styles from "./Block.module.scss";
import { BlockMenu } from "./BlockMenu";
import { composeBlockElementProps } from "./blockElementProps";
import { EditableBlockContent } from "./EditableBlockContent";
import { renderBlockElement } from "./renderBlockElement";
import { useBlockDrop } from "./useBlockDrop";
import { useBlockEditing } from "./useBlockEditing";

type BlockRendererProps = {
  block: IBlock & {
    className?: string;
    hideMenu?: boolean;
  };
  renderChildBlock: (block: IBlock, className?: string) => React.ReactNode;
};

export function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  const { id, properties } = block;
  const { blockTree } = useDocumentContext();
  const {
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockContent,
  } = useBlockActionsContext();
  const {
    editorState,
    setEditorState,
    closeEditor,
  } = useEditorContext();
  const { previewMode } = useBuilderUiContext();

  const [isDragging, setIsDragging] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [isRemoveHover, setIsRemoveHover] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);
  const [selectedProperties, setSelectedProperties] = React.useState(properties);

  const handleDrop = useBlockDrop({ blockId: id, addBlock, moveBlock });
  const frameworkClassNames = classesFromProperties(selectedProperties);

  const handlerRemove = React.useCallback(() => {
    removeBlock(id);
    closeEditor();
  }, [closeEditor, id, removeBlock]);
  const draggingComponent = React.useCallback(() => setIsDragging(true), []);
  const endDragComponent = React.useCallback(() => setIsDragging(false), []);
  const handleMouseEnter = React.useCallback(() => setIsMouseOver(true), []);
  const handleMouseLeave = React.useCallback(() => setIsMouseOver(false), []);
  const { handleBlockClick, handleTextEdition, isEditing } = useBlockEditing({
    block,
    blockTree,
    updateBlockContent,
    editorState,
    setEditorState,
  });
  const shouldRenderMenu =
    !block.hideMenu &&
    !previewMode &&
    (block.draggable ||
      block.removable ||
      Boolean(block.availableProperties?.length));

  const tagAttr = composeBlockElementProps({
    block,
    ref,
    classNames: [
      (block.draggable || block.removable || block.droppable) && styles.block,
      block.container && (block.labeled || block.droppable) && styles.spacing,
      block.labeled && !previewMode && styles.label,
      (!block.content || block.content.length === 0) && styles.empty,
      isDragging && styles.dragging,
      isEditing && styles.editingMode,
      isRemoveHover && styles.removeHover,
      block.class,
      block.className,
      !block.styledChild && frameworkClassNames,
      previewMode && block.class === "row" && block.preview,
    ],
    previewMode,
    onClick: handleBlockClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });

  if (block.childless) return renderBlockElement(block.tag, tagAttr);

  return renderBlockElement(
    block.tag,
    tagAttr,
    <>
      {shouldRenderMenu && (
        <BlockMenu
          block={block}
          draggingImage={ref}
          isMouseOver={isMouseOver}
          selectedProperties={selectedProperties}
          setOnProperties={setSelectedProperties}
          onDrag={draggingComponent}
          onDragEnd={endDragComponent}
          onRemove={handlerRemove}
          onRemoveHover={setIsRemoveHover}
        />
      )}
      <EditableBlockContent
        block={block}
        frameworkClassNames={frameworkClassNames}
        isEditing={isEditing}
        onDrop={handleDrop}
        onTextChange={handleTextEdition}
        renderChildBlock={props.renderChildBlock}
      />
    </>
  );
}
