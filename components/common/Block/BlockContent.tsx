import React from "react";
import { IBlock } from "../../../types";
import { classname } from "../../../utils/classname";
import { Droppable } from "../Droppable";
import { TextEditor } from "../TexEditor";
import { BlockDropHandler } from "./BlockDropZones";

type RenderChildBlock = (block: IBlock, className?: string) => React.ReactNode;

type BlockContentProps = {
  block: IBlock & { className?: string };
  frameworkClassNames: string;
  isEditing: boolean;
  onDrop: BlockDropHandler;
  onTextChange: (value: string | undefined) => void;
  renderChildBlock: RenderChildBlock;
};

export function BlockContent(props: BlockContentProps) {
  const { block, frameworkClassNames } = props;

  if (block.container) {
    return (
      <>
        {block.droppable && (
          <Droppable onDrop={props.onDrop()} mainBlock={block.mainBlock} />
        )}
        {block.content.map((child) => (
          <React.Fragment key={child.id}>
            {props.renderChildBlock(
              child,
              block.styledChild ? frameworkClassNames : undefined
            )}
            {block.droppable && (
              <Droppable onDrop={props.onDrop(child.id)} mainBlock={block.mainBlock} />
            )}
          </React.Fragment>
        ))}
      </>
    );
  }

  if (!props.isEditing) return <>{block.content}</>;

  return (
    <TextEditor
      className={classname(block.class, block.className, frameworkClassNames)}
      onChange={props.onTextChange}
      value={block.content}
    />
  );
}
