import { IBlock } from "../../../types";
import { getBlock } from "../../../utils/block";
import {
  isChildlessElement,
  normalizeHtmlAttributes,
  parseFrameworkClassName,
} from "../../../utils/htmlPrimitives";
import { serializeBlock } from "../../../utils/export/blockSerializer";
import { unwrap } from "../../../utils/unwrap";

const EDITOR_ALLOWED_TAGS = new Set([
  "a",
  "b",
  "br",
  "div",
  "em",
  "i",
  "p",
  "s",
  "span",
  "strong",
  "u",
]);

const EDITOR_SAFE_LINK_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

function isSafeEditorHref(value: string): boolean {
  try {
    const url = new URL(value, window.location.origin);
    return EDITOR_SAFE_LINK_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

function cleanEditorNode(node: ChildNode): ChildNode[] {
  if (node.nodeType === Node.TEXT_NODE) {
    return [document.createTextNode(node.textContent || "")];
  }

  if (!(node instanceof Element)) return [];

  const rawTag = node.tagName.toLowerCase();
  if (!EDITOR_ALLOWED_TAGS.has(rawTag)) {
    return Array.from(node.childNodes).flatMap(cleanEditorNode);
  }

  const tag = rawTag === "div" || rawTag === "p" ? "span" : rawTag;
  const element = document.createElement(tag);

  if (tag === "a") {
    const href = node.getAttribute("href");
    if (href && isSafeEditorHref(href)) {
      element.setAttribute("href", href);
      element.setAttribute("rel", "noreferrer");
    }
  }

  if (tag !== "br") {
    Array.from(node.childNodes)
      .flatMap(cleanEditorNode)
      .forEach((child) => element.appendChild(child));
  }

  return [element];
}

export function normalizeEditorMarkup(htmlString: string): string {
  if (typeof document === "undefined") return htmlString || "";

  const template = document.createElement("template");
  const wrapper = document.createElement("div");
  template.innerHTML = htmlString || "";
  Array.from(template.content.childNodes)
    .flatMap(cleanEditorNode)
    .forEach((node) => wrapper.appendChild(node));

  return wrapper.innerHTML;
}

export function isEditorFragmentBlock(block: IBlock): boolean {
  return block.name === "";
}

function isLineBreak(element?: ChildNode): boolean {
  if (!element) return false;
  if (
    element.childNodes.length === 1 &&
    element.childNodes[0].nodeName.toLocaleLowerCase() === "br"
  )
    return true;
  return false;
}

function isTextNode(node: ChildNode): boolean {
  return node.nodeType === 3;
}

function isTextEditorParagraphText(element: HTMLElement): boolean {
  return (
    !!element.childNodes.length &&
    element.classList.contains("editor-p")
  );
}

function isElementWithChildText(element: HTMLElement): boolean {
  return (
    !isTextNode(element) &&
    element.childNodes.length === 1 &&
    isTextNode(element.childNodes[0])
  );
}

function parseEditorNode(
  node: ChildNode,
  elementName?: string
): IBlock {
  if (isTextNode(node)) {
    return getBlock({
      name: elementName || "",
      tag: "span",
      class: "",
      content: node.textContent || "",
      container: false,
      exportable: false,
      editable: true,
    });
  }

  if (!(node instanceof HTMLElement)) {
    return getBlock({
      name: "removable",
      container: false,
    });
  }

  const element = node;
  const childNodes = Array.from(element.childNodes);
  const isTextEditorParagraph = isTextEditorParagraphText(element);
  const elementClass = isTextEditorParagraph ? "" : element.className;
  const parsedElClasses = elementClass
    ? parseFrameworkClassName("bootstrap", elementClass)
    : "";
  const isElementWithText = isElementWithChildText(element);
  const attributes = normalizeHtmlAttributes(
    element
      .getAttributeNames?.()
      .reduce(
        (acc, curr) => ({ ...acc, [curr]: element.getAttribute(curr) }),
        {}
      )
  );

  if (isLineBreak(element)) {
    return getBlock({
      container: false,
      name: "br",
      tag: "br",
      content: "",
      childless: true,
    });
  }

  if (
    !isChildlessElement(element.tagName) &&
    !element.childNodes.length
  ) {
    return getBlock({
      name: "removable",
      container: false,
    });
  }

  const tag = isTextEditorParagraph ? "span" : element.tagName.toLowerCase();

  return getBlock({
    name: elementName || "",
    tag,
    class: parsedElClasses,
    content:
      !isElementWithText
        ? childNodes
            .map((child) => parseEditorNode(child, elementName))
            .filter((child) => child.name !== "removable")
        : element.textContent || "",
    container: !isElementWithText,
    attributes,
    childless: isChildlessElement(tag),
    ...(isTextEditorParagraph ? { exportable: false } : {}),
    ...(isElementWithText ? { editable: true } : {}),
  });
}

export function normalizePendingEditorHtml(html?: string) {
  return html ? unwrap(html) : "";
}

export function flattenEditedBlockContent(parent: IBlock) {
  return parent.container
    ? parent.content
        .map((child) => serializeBlock(child, "html"))
        .join("")
    : parent.content;
}

export function editorBlocksFromHtml(htmlString: string) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = normalizeEditorMarkup(htmlString);

  return parseEditorNode(wrapper, "").content;
}
