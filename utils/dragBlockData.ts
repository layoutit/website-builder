import { IBlock } from "../types";
import { hydrateBlock } from "./urlState/hydrator";
import { sanitizeRawBlock } from "./urlState/sanitizer";
import { stripBlockForUrl } from "./urlState/stripper";

export const DRAGGED_BLOCK_DATA_TYPE = "application/x-layoutit-block";

export function serializeDraggedBlock(block: IBlock): string {
  return JSON.stringify(stripBlockForUrl(block));
}

export function parseDraggedBlock(value: string): IBlock | undefined {
  if (!value) return undefined;

  try {
    const parsed: unknown = JSON.parse(value);
    const sanitized = sanitizeRawBlock(parsed, 0, { count: 0 });
    return sanitized ? hydrateBlock(sanitized) : undefined;
  } catch {
    return undefined;
  }
}
