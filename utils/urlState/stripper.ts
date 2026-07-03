import { IBlock } from "../../types";
import { hasNonEmptyValues } from "./records";

export function stripBlockForUrl(block: IBlock): Record<string, unknown> {
  const stripped: Record<string, unknown> = {
    name: block.name,
    container: block.container,
  };

  if (block.tag && block.tag !== "div") stripped.tag = block.tag;
  if (block.class) stripped.class = block.class;
  if (block.attributes && Object.keys(block.attributes).length > 0) {
    stripped.attributes = block.attributes;
  }
  if (block.properties && hasNonEmptyValues(block.properties)) {
    stripped.properties = block.properties;
  }
  if (block.size) stripped.size = block.size;

  stripped.content = block.container
    ? block.content.map(stripBlockForUrl)
    : block.content;

  return stripped;
}
