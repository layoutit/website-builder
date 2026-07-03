import React from "react";
import { IBlock, SelectedProperties } from "../../../types";
import { classname } from "../../../utils/classname";
import { Button } from "../Button";
import { DragIcon, RemoveIcon } from "../ButtonIcons/ButtonIcons";
import { Draggable } from "../Draggable";
import { Menu } from "../Menu";
import { PropertiesMenu } from "../PropertiesMenu";
import styles from "./Block.module.scss";

type BlockMenuProps = {
  block: IBlock;
  draggingImage: React.RefObject<Element>;
  isMouseOver: boolean;
  selectedProperties: SelectedProperties;
  setOnProperties: React.Dispatch<React.SetStateAction<SelectedProperties>>;
  onDrag: () => void;
  onDragEnd: () => void;
  onRemove: () => void;
  onRemoveHover: (hovered: boolean) => void;
};

export function BlockMenu(props: BlockMenuProps) {
  const { block } = props;

  return (
    <Menu
      flow="row"
      className={classname(
        styles.blockMenu,
        props.isMouseOver && styles.show,
        !block.container && styles.menuPosition
      )}
    >
      <PropertiesMenu
        id={block.id}
        availableProperties={block.availableProperties}
        selectedProperties={props.selectedProperties}
        setOnProperties={props.setOnProperties}
      />
      {block.draggable && (
        <Draggable
          onDrag={props.onDrag}
          onDragEnd={props.onDragEnd}
          draggingImage={props.draggingImage}
          id={block.id}
          mainContent={block.mainContent}
        >
          <Button bold background="secondary" icon={<DragIcon />}>
            drag
          </Button>
        </Draggable>
      )}
      {block.removable && (
        <Button
          bold
          onClick={props.onRemove}
          onMouseEnter={() => props.onRemoveHover(true)}
          onMouseLeave={() => props.onRemoveHover(false)}
          background="error"
          icon={<RemoveIcon />}
        >
          remove
        </Button>
      )}
    </Menu>
  );
}
