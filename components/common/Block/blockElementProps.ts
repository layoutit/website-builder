import React from "react";
import { IBlock } from "../../../types";
import { classname } from "../../../utils/classname";

const INTERNAL_ATTRIBUTE_NAMES = new Set([
  "class",
  "className",
  "style",
  "ref",
  "onClick",
  "onMouseEnter",
  "onMouseLeave",
  "data-id",
  "data-container",
  "data-name",
  "data-preview",
]);

function filterBlockAttributes(attributes: IBlock["attributes"]) {
  if (!attributes) return undefined;

  return Object.entries(attributes).reduce<Record<string, string>>(
    (result, [name, value]) => {
      if (INTERNAL_ATTRIBUTE_NAMES.has(name)) return result;
      if (/^on/i.test(name)) return result;
      return { ...result, [name]: value };
    },
    {}
  );
}

export function composeBlockElementProps(options: {
  block: IBlock & { className?: string };
  ref: React.RefObject<HTMLElement>;
  classNames: Array<string | false | undefined>;
  previewMode: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
}) {
  const { block } = options;

  return {
    ...filterBlockAttributes(block.attributes),
    ref: options.ref,
    className: classname(...options.classNames),
    onClick: options.onClick,
    "data-id": block.id,
    "data-container": block.container,
    "data-name": block.name,
    "data-preview": options.previewMode,
    onMouseEnter: options.onMouseEnter,
    onMouseLeave: options.onMouseLeave,
  };
}
