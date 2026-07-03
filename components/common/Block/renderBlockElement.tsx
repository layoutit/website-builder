import React from "react";

type BlockElementProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>;
  children?: React.ReactNode;
};

export function renderBlockElement(
  tag: string,
  props: BlockElementProps,
  children?: React.ReactNode
) {
  return React.createElement(tag, props, children);
}
