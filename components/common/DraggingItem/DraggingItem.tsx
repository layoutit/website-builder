import React, { useRef } from "react";
import { IBlock } from "../../../types";
import { classname } from "../../../utils/classname";
import { beautifyString } from "../../../utils/string";
import { Block } from "../Block";
import { Button } from "../Button";
import { Draggable } from "../Draggable";
import { DragIcon } from "../ButtonIcons/ButtonIcons";
import styles from "./DraggingItem.module.scss";

export function DraggingItem(props: React.PropsWithChildren<{ type: string, block:IBlock, framework: string }>) {
  const draggingView = useRef<HTMLDivElement>(null);
  const { type, block, framework } = props;

  return (
    <div className={styles.draggingItem}>
      <div className={styles.itemList}>
        {beautifyString(type)}
        <div className={styles.dragButtonWrap}>
          <Draggable
            draggingImage={draggingView}
            sideBarItem={true}
            key={type}
            type={type}
          >
            <Button background="secondary" icon={<DragIcon className={styles.draggingIcon} />} className={styles.draggingButton}>
              drag
            </Button>
          </Draggable>
        </div>
      </div>
      <div className={classname(styles.dragItem, `${framework}-view`)} ref={draggingView}>
        <Block hideMenu={true} {...block} />
      </div>
    </div>
  );
}
