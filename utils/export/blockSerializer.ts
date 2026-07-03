import { IBlock } from "../../types";
import { classname } from "../classname";
import { classesFromProperties } from "../properties";
import { VOID_TAGS } from "./htmlTags";
import { serializeAttributes, SourceTarget } from "./sourceAttributes";
import { escapeSourceText } from "./sourceText";

export function serializeBlock(
  block: IBlock,
  target: SourceTarget,
  inheritedClassName?: string
): string {
  const selectedClassNames = classesFromProperties(block.properties);
  const classes = classname(
    block.class,
    inheritedClassName,
    !block.styledChild && selectedClassNames
  );
  const children = block.container
    ? block.content
        .map((child) =>
          serializeBlock(
            child,
            target,
            block.styledChild ? selectedClassNames : undefined
          )
        )
        .join("")
    : escapeSourceText(block.content);

  if (!block.exportable) return children;

  const attributes = serializeAttributes({
    attributes: block.attributes,
    classes,
    target,
  });

  if (block.childless || VOID_TAGS.has(block.tag)) {
    return `<${block.tag}${attributes}/>`;
  }

  return `<${block.tag}${attributes}>${children}</${block.tag}>`;
}
