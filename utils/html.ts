import { HTMLElement as ParserHTMLElement, parse } from "node-html-parser";
import { Frameworks, IBlock } from "../types";
import { getBlock } from "./block";
import {
  isChildlessElement,
  normalizeHtmlAttributes,
  parseFrameworkClassName,
} from "./htmlPrimitives";

function isTextNode(node: HTMLElement | ParserHTMLElement): boolean {
  return node.nodeType === 3;
}


export function getBlocksServerSide(
  htmlString: string,
  framework: Frameworks,
  name: string,
  options?: Partial<
    Omit<IBlock, "id" | "name" | "tag" | "class" | "attributes" | "childless">
  >
): IBlock {
  const parsedHTML = parse(htmlString);
  const treeWithoutWhitespace = parsedHTML.removeWhitespace();
  const wrapperEl = treeWithoutWhitespace.firstChild as ParserHTMLElement;

  const getBlocks = (element: ParserHTMLElement, elementName: string) => {
    const childNodes = element.childNodes as ParserHTMLElement[];
    const childrenElements = childNodes.filter(
      (child) => !isTextNode(child)
    );
    const { class: elClasses, exportable, editable, ...attributes } =
      element.attributes;
    const parsedElClasses = parseFrameworkClassName(framework, elClasses);
    const isWrapperEl = !element.parentNode.parentNode;
    const tag = element.tagName.toLowerCase();
    const newBlock = getBlock({
      ...(isWrapperEl ? options : {}),
      name: elementName,
      tag,
      class: parsedElClasses,
      content: !!childrenElements.length
        ? childrenElements.map((child) =>
            getBlocks(child, `${elementName}-${child.tagName}`)
          )
        : element.firstChild?.text,
      container: options?.container || !!childrenElements.length,
      attributes: normalizeHtmlAttributes(attributes),
      childless: isChildlessElement(tag),
      ...(exportable === "false" ? { exportable: false } : {}),
      ...(editable === "true" ? { editable: true } : {}),
    });

    return newBlock;
  };

  return getBlocks(wrapperEl, name);
}
