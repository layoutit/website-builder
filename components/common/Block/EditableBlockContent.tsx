import { IBlock } from "../../../types";
import { BlockContent } from "./BlockContent";
import { BlockDropHandler } from "./BlockDropZones";

export function EditableBlockContent(props: {
  block: IBlock;
  frameworkClassNames: string;
  isEditing: boolean;
  onTextChange: (content: string | undefined) => void;
  onDrop: BlockDropHandler;
  renderChildBlock: (block: IBlock, className?: string) => React.ReactNode;
}) {
  return (
    <BlockContent
      block={props.block}
      frameworkClassNames={props.frameworkClassNames}
      isEditing={props.isEditing}
      onDrop={props.onDrop}
      onTextChange={props.onTextChange}
      renderChildBlock={props.renderChildBlock}
    />
  );
}
