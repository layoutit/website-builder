import React, { useRef, useState, useCallback } from "react";
import { IBlock } from "../../../types";
import { classname } from "../../../utils/classname";
import { Block } from "../Block";
import { Button } from "../Button";
import { Draggable } from "../Draggable";
import styles from "./DraggingGrid.module.scss";
import { BOOTSTRAP_COLUMN } from "../../../frameworks/bootstrap/components/column";
import { BOOTSTRAP_ROW } from "../../../frameworks/bootstrap/components/row";
import { DragIcon } from "../ButtonIcons/ButtonIcons";

export function DraggingGrid(props: React.PropsWithChildren<{ type: string, block: IBlock }>) {
  const [isSizeValid, setIsSizeValid] = useState<boolean>(true);
  const draggingView = useRef<HTMLDivElement>(null);
  const { type, block } = props;
  const gridColumns = block.container ? block.content : [];
  const [size, setSize] = useState<string | undefined>(
    gridColumns.map((column) => column.size).join(' ')
  );
  const isDragEnabled = Boolean(size) && isSizeValid;
  const dragBlock = React.useMemo(
    () =>
      isDragEnabled && size
        ? BOOTSTRAP_ROW(BOOTSTRAP_COLUMN(size, [], {}), "", true)
        : block,
    [block, isDragEnabled, size]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextSize = e.target.value;
      setSize(nextSize);
      const validation: boolean = nextSize.split(' ').map(n => parseInt(n)).reduce((prev, current) => prev + current, 0) === 12;
      setIsSizeValid(validation);
    },
    []
  );

  return (
    <div className={styles.draggingItem}>
      <div className={styles.itemList}>
        <input className={styles.columnSize} type="text" placeholder="Enter your own" onChange={handleChange} value={size} />
        <div className={styles.dragButtonWrap}>
          {isDragEnabled ? (
            <Draggable
              draggingImage={draggingView}
              sideBarItem={true}
              key={type}
              type={type}
              block={dragBlock || undefined}
            >
              <Button
                small
                background="secondary"
                icon={<DragIcon className={styles.draggingIcon} />}
                className={classname(styles.draggingButton, !isDragEnabled && styles.draggingButtonDisabled)}
                disabled={!isDragEnabled}
              >
                drag
              </Button>
            </Draggable>
          ) : (
            <Button
              small
              background="secondary"
              icon={<DragIcon className={styles.draggingIcon} />}
              className={classname(styles.draggingButton, styles.draggingButtonDisabled)}
              disabled={!isDragEnabled}
            >
              drag
            </Button>
          )}
        </div>
      </div>
      <div className={classname(styles.dragItem)} ref={draggingView}>
        <Block hideMenu={true} {...dragBlock} />
      </div>
    </div>
  );
}
