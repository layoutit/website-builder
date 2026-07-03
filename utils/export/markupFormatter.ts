import { VOID_TAGS } from "./htmlTags";

function getTagName(token: string) {
  return token.match(/^<\/?\s*([a-zA-Z0-9-]+)/)?.[1].toLowerCase();
}

function isOpeningTag(token: string) {
  return token.startsWith("<") && !token.startsWith("</");
}

function isClosingTag(token: string) {
  return token.startsWith("</");
}

function isSelfClosingTag(token: string) {
  const tagName = getTagName(token);
  return token.endsWith("/>") || !!(tagName && VOID_TAGS.has(tagName));
}

function normalizeTextNode(token: string) {
  return token.replace(/\s+/g, " ").trim();
}

export function formatMarkup(markup: string) {
  const tokens = markup.match(/<[^>]+>|[^<]+/g) || [];
  const lines: string[] = [];
  let indentLevel = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const indent = "  ".repeat(indentLevel);

    if (isClosingTag(token)) {
      indentLevel = Math.max(indentLevel - 1, 0);
      lines.push(`${"  ".repeat(indentLevel)}${token}`);
      continue;
    }

    if (isOpeningTag(token)) {
      const tagName = getTagName(token);
      const nextToken = tokens[index + 1];
      const closingToken = tokens[index + 2];
      const hasInlineText =
        nextToken &&
        !nextToken.startsWith("<") &&
        closingToken === `</${tagName}>`;

      if (hasInlineText) {
        lines.push(
          `${indent}${token}${normalizeTextNode(nextToken)}${closingToken}`
        );
        index += 2;
        continue;
      }

      lines.push(`${indent}${token}`);

      if (!isSelfClosingTag(token)) {
        indentLevel += 1;
      }

      continue;
    }

    const text = normalizeTextNode(token);
    if (text) {
      lines.push(`${indent}${text}`);
    }
  }

  return lines.join("\n");
}
