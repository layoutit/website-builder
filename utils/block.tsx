import { IBlock } from "../types";
import { deriveBlockRuntime } from "./blockRuntime";
import { createId } from "./id";

type BlockInput = {
  container: boolean;
  name: string;
  content?: string | IBlock[];
} & Partial<Omit<IBlock, "container" | "content" | "id" | "name">>;

export function getBlock(
  block: BlockInput
): IBlock {
  const {
    container: _container,
    content: _content,
    exportable,
    properties,
    size,
    tag,
    ...blockOptions
  } = block;
  const layoutInput = block.container
    ? {
        id: "",
        name: block.name,
        tag: block.tag || "div",
        class: block.class,
        properties: block.properties || {},
        attributes: block.attributes,
        size: block.size,
        container: true as const,
        content: [],
      }
    : {
        id: "",
        name: block.name,
        tag: block.tag || "div",
        class: block.class,
        properties: block.properties || {},
        attributes: block.attributes,
        size: block.size,
        container: false as const,
        content: "",
      };
  const baseBlock = {
    ...deriveBlockRuntime(layoutInput),
    ...blockOptions,
    id: createId(),
    tag: tag || "div",
    properties: properties || {},
    size: size ? size : '',
    preview: "preview",
    exportable: exportable ?? true,
  };

  if (block.container) {
    return {
      ...baseBlock,
      container: true,
      content: Array.isArray(block.content) ? block.content : [],
      droppable: block.droppable || false,
    };
  }

  return {
    ...baseBlock,
    container: false,
    content: typeof block.content === "string" ? block.content : "",
    droppable: undefined,
  };
}

export function withStableIds(tree: IBlock, prefix = "block"): IBlock {
  let index = 0;

  const assignIds = (block: IBlock): IBlock => {
    const id = `${prefix}-${index++}`;

    if (block.container) {
      return {
        ...block,
        id,
        content: block.content.map(assignIds),
      };
    }

    return {
      ...block,
      id,
    };
  };

  return assignIds(tree);
}

export function withFreshIds(tree: IBlock): IBlock {
  const assignIds = (block: IBlock): IBlock => {
    if (block.container) {
      return {
        ...block,
        id: createId(),
        content: block.content.map(assignIds),
      };
    }

    return {
      ...block,
      id: createId(),
    };
  };

  return assignIds(tree);
}
