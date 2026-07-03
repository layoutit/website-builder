import React from "react";
import { IBlock } from "../../../types";
import { BlockRenderer } from "./BlockRenderer";

type BlockProps = IBlock & {
  className?: string;
  hideMenu?: boolean;
};

export function Block(props: BlockProps) {
  const renderChildBlock = React.useCallback(
    (block: IBlock, className?: string) => (
      <Block
        {...block}
        className={className}
        hideMenu={props.hideMenu || Boolean(className)}
      />
    ),
    [props.hideMenu]
  );

  return <BlockRenderer block={props} renderChildBlock={renderChildBlock} />;
}
