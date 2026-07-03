import {
  MAX_ATTRIBUTE_LENGTH,
  MAX_BLOCKS,
  MAX_CHILDREN_PER_BLOCK,
  MAX_CLASS_LENGTH,
  MAX_NAME_LENGTH,
  MAX_TEXT_LENGTH,
  MAX_TREE_DEPTH,
  SAFE_ATTRIBUTES,
  SAFE_CLASS_RE,
  SAFE_SIZE_RE,
  SAFE_TAGS,
  SAFE_URL_PROTOCOLS,
} from "./constants";
import { isRecord } from "./records";
import { SanitizedBlock, SanitizedBlockBase } from "./sanitizedBlock";

function safeString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  if (value.length > maxLength) return undefined;
  return value;
}

function safeClassName(value: unknown): string | undefined {
  const className = safeString(value, MAX_CLASS_LENGTH);
  if (!className) return undefined;
  return SAFE_CLASS_RE.test(className) ? className : undefined;
}

function safeTagName(value: unknown): string {
  const tag = safeString(value, 40)?.toLowerCase();
  return tag && SAFE_TAGS.has(tag) ? tag : "div";
}

function isAllowedAttributeName(name: string): boolean {
  if (/^on/i.test(name) || name.toLowerCase() === "style") return false;
  return (
    SAFE_ATTRIBUTES.has(name) ||
    SAFE_ATTRIBUTES.has(name.toLowerCase()) ||
    name.toLowerCase().startsWith("aria-") ||
    name.toLowerCase().startsWith("data-bs-")
  );
}

function isSafeUrlAttribute(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("#")) return true;

  try {
    const url = new URL(value, "https://layoutit.local");
    return SAFE_URL_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

function sanitizeAttributes(value: unknown): { [key: string]: string } | undefined {
  if (!isRecord(value)) return undefined;

  const sanitized = Object.entries(value).reduce<{ [key: string]: string }>(
    (result, [key, rawValue]) => {
      if (!isAllowedAttributeName(key)) return result;
      const attributeValue = safeString(rawValue, MAX_ATTRIBUTE_LENGTH);
      if (!attributeValue) return result;
      if ((key === "href" || key === "src") && !isSafeUrlAttribute(attributeValue)) {
        return result;
      }
      if (key === "target" && !["_blank", "_self", "_parent", "_top"].includes(attributeValue)) {
        return result;
      }

      return { ...result, [key]: attributeValue };
    },
    {}
  );

  return Object.keys(sanitized).length ? sanitized : undefined;
}

function sanitizeProperties(value: unknown): { [key: string]: string } {
  if (!isRecord(value)) return {};

  return Object.entries(value).reduce<{ [key: string]: string }>(
    (result, [key, rawValue]) => {
      const propertyKey = safeString(key, 80);
      const propertyValue = safeClassName(rawValue);
      if (!propertyKey || !propertyValue) return result;
      return { ...result, [propertyKey]: propertyValue };
    },
    {}
  );
}

export type SanitizeContext = {
  count: number;
};

export function sanitizeRawBlock(
  raw: unknown,
  depth: number,
  context: SanitizeContext
): SanitizedBlock | null {
  if (!isRecord(raw) || depth > MAX_TREE_DEPTH) return null;
  context.count += 1;
  if (context.count > MAX_BLOCKS) return null;

  const tag = safeTagName(raw.tag);
  const inferredContainer = Array.isArray(raw.content);
  const container =
    typeof raw.container === "boolean" ? raw.container : inferredContainer;
  const size = safeString(raw.size, 80);

  const baseBlock: SanitizedBlockBase = {
    name: safeString(raw.name, MAX_NAME_LENGTH) || "Block",
    tag,
    class: safeClassName(raw.class),
    properties: sanitizeProperties(raw.properties),
    attributes: sanitizeAttributes(raw.attributes),
    size: size && SAFE_SIZE_RE.test(size) ? size : undefined,
  };

  if (container) {
    if (!Array.isArray(raw.content)) {
      return { ...baseBlock, container: true, content: [] };
    }
    if (raw.content.length > MAX_CHILDREN_PER_BLOCK) return null;

    const content = raw.content.flatMap((child) => {
      const sanitizedChild = sanitizeRawBlock(child, depth + 1, context);
      return sanitizedChild ? [sanitizedChild] : [];
    });

    return { ...baseBlock, container: true, content };
  }

  const content = safeString(raw.content, MAX_TEXT_LENGTH) || "";
  return { ...baseBlock, container: false, content };
}
