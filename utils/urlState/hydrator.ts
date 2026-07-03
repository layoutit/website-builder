import { IBlock } from "../../types";
import { deriveBlockRuntime } from "../blockRuntime";
import { SanitizedBlock } from "./sanitizedBlock";

export function hydrateBlock(block: SanitizedBlock): IBlock {
  const layoutBlock = {
    id: "",
    name: block.name,
    tag: block.tag,
    class: block.class,
    properties: block.properties,
    attributes: block.attributes,
    size: block.size,
  };

  if (block.container) {
    const hydratedBlock = {
      ...layoutBlock,
      container: true,
      content: block.content.map(hydrateBlock),
    } as IBlock;

    return {
      ...hydratedBlock,
      ...deriveBlockRuntime(hydratedBlock),
      preview: "preview",
    };
  }

  const hydratedBlock = {
    ...layoutBlock,
    container: false,
    content: block.content,
  } as IBlock;

  return {
    ...hydratedBlock,
    ...deriveBlockRuntime(hydratedBlock),
    preview: "preview",
  };
}
