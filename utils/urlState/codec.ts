import { IBlock } from "../../types";
import { withStableIds } from "../block";
import { decodeBase64ToUtf8, fromBase64Url } from "./base64";
import {
  DEFAULT_LAYOUT_STATE,
  MAX_ENCODED_LAYOUT_LENGTH,
  MAX_JSON_LAYOUT_LENGTH,
} from "./constants";
import { migrateLayoutImages } from "./imageMigration";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "./lz";
import { hydrateBlock } from "./hydrator";
import { sanitizeRawBlock } from "./sanitizer";
import { stripBlockForUrl } from "./stripper";

export function getDefaultLayoutState(): IBlock | undefined {
  if (!DEFAULT_LAYOUT_STATE) return undefined;
  const decoded = decodeLayoutState(DEFAULT_LAYOUT_STATE);
  return decoded ? migrateLayoutImages(decoded) : undefined;
}

export function encodeLayoutState(blockTree: IBlock): string {
  const json = JSON.stringify(stripBlockForUrl(blockTree));
  const compressed = compressToEncodedURIComponent(json);
  return `lz:${compressed}`;
}

export function decodeLayoutState(encoded: string): IBlock | null {
  try {
    if (encoded.length > MAX_ENCODED_LAYOUT_LENGTH) return null;

    let json: string | null = null;
    if (encoded.startsWith("lz:")) {
      json = decompressFromEncodedURIComponent(encoded.slice(3));
    }
    if (!json) {
      const payload = encoded.startsWith("b64:") ? encoded.slice(4) : encoded;
      json = decodeBase64ToUtf8(fromBase64Url(payload));
    }

    if (json.length > MAX_JSON_LAYOUT_LENGTH) return null;

    const parsed: unknown = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    const sanitized = sanitizeRawBlock(parsed, 0, { count: 0 });
    if (!sanitized || sanitized.container !== true) return null;
    return withStableIds(hydrateBlock(sanitized), "block");
  } catch {
    return null;
  }
}
