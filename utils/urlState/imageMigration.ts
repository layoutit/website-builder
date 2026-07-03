import { IBlock } from "../../types";
import { LAYOUTIT_IMAGE_RE, LOCAL_IMAGE_FILENAMES } from "./constants";

function migrateImageSrc(src: string): string {
  const match = src.match(LAYOUTIT_IMAGE_RE);
  if (!match) return src;

  const filename = match[1];
  if (!LOCAL_IMAGE_FILENAMES.has(filename)) return src;

  return `/${filename}`;
}

export function migrateLayoutImages(block: IBlock): IBlock {
  let didChange = false;
  let nextAttributes = block.attributes;

  if (block.attributes?.src) {
    const migratedSrc = migrateImageSrc(block.attributes.src);
    if (migratedSrc !== block.attributes.src) {
      nextAttributes = { ...block.attributes, src: migratedSrc };
      didChange = true;
    }
  }

  if (block.container) {
    const nextContent = block.content.map(migrateLayoutImages);
    const contentChanged = nextContent.some(
      (child, index) => child !== block.content[index]
    );

    if (didChange || contentChanged) {
      return {
        ...block,
        attributes: nextAttributes,
        content: contentChanged ? nextContent : block.content,
      };
    }

    return block;
  }

  if (didChange) {
    return {
      ...block,
      attributes: nextAttributes,
    };
  }

  return block;
}
