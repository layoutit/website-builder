import { BlockRuntime, LayoutBlock } from "../types";
import { BOOTSTRAP_PROPERTIES } from "../frameworks/bootstrap/properties";
import { VOID_TAGS } from "./export/htmlTags";

function hasClass(block: LayoutBlock, className: string): boolean {
  return block.class?.split(/\s+/).includes(className) ?? false;
}

function hasClassPrefix(block: LayoutBlock, prefix: string): boolean {
  return block.class?.split(/\s+/).some((className) => className.startsWith(prefix)) ?? false;
}

function isEditableTextBlock(block: LayoutBlock): boolean {
  if (block.container) return false;
  return ["p", "span", "a", "h1", "h2", "h3", "h4", "h5", "h6"].includes(block.tag);
}

const CHROME_ROOT_NAMES = new Set([
  "Accordion",
  "Address",
  "Anchor button",
  "Alert",
  "Badge",
  "Blockquote",
  "Breadcrumb",
  "Button group",
  "Card",
  "Carousel",
  "Description list",
  "Dropdown",
  "Form",
  "Form check",
  "Form floating",
  "Form range",
  "Form select",
  "Input group",
  "Jumbotron",
  "List group",
  "Media",
  "Modal",
  "Nav",
  "Navbar",
  "Ordered list",
  "Page header",
  "Pagination",
  "Paragraph",
  "Placeholder",
  "Progress bar",
  "Tabs",
  "Text",
  "Title",
  "Unordered list",
]);

function isChromeRootBlock(block: LayoutBlock): boolean {
  if (block.name === "Button" || block.name === "Image" || block.name === "Label") {
    return block.tag === "div";
  }
  if (block.name === "Table") return block.tag === "div";
  return CHROME_ROOT_NAMES.has(block.name);
}

function getAvailableProperties(block: LayoutBlock) {
  if (block.name === "Title") return BOOTSTRAP_PROPERTIES.text;
  if (block.name === "Paragraph") {
    return [...BOOTSTRAP_PROPERTIES.text, ...BOOTSTRAP_PROPERTIES.paragraph];
  }
  if (block.name === "Blockquote") return BOOTSTRAP_PROPERTIES.blockquote;
  if (block.name === "Unordered list" || block.name === "Ordered list") {
    return BOOTSTRAP_PROPERTIES.list;
  }
  if (block.name === "Table" && block.tag === "div") return BOOTSTRAP_PROPERTIES.table;
  if (block.name === "Form") return BOOTSTRAP_PROPERTIES.form;
  if (block.name === "Button" && block.tag === "div") return BOOTSTRAP_PROPERTIES.button;
  if (block.name === "Anchor button") return BOOTSTRAP_PROPERTIES.button;
  if (block.name === "Image" && block.tag === "div") return BOOTSTRAP_PROPERTIES.image;
  if (block.name === "Button group") return BOOTSTRAP_PROPERTIES.buttonGroup;
  if (block.name === "Dropdown") return BOOTSTRAP_PROPERTIES.dropdown;
  if (block.name === "Nav") return BOOTSTRAP_PROPERTIES.nav;
  if (block.name === "Pagination") return BOOTSTRAP_PROPERTIES.pagination;
  if (block.name === "Label" && block.tag === "div") return BOOTSTRAP_PROPERTIES.label;
  if (block.name === "Jumbotron") return BOOTSTRAP_PROPERTIES.jumbotron;
  if (block.name === "Progress bar") return BOOTSTRAP_PROPERTIES.progressBar;
  if (block.name === "Card") return BOOTSTRAP_PROPERTIES.card;
  if (block.name === "Alert") return BOOTSTRAP_PROPERTIES.alert;
  if (block.name === "Navbar") return BOOTSTRAP_PROPERTIES.navbar;
  return undefined;
}

function isStyledChildWrapper(block: LayoutBlock): boolean {
  if (block.name === "Button" || block.name === "Image" || block.name === "Label") {
    return block.tag === "div";
  }
  return (
    block.name === "Alert" ||
    block.name === "Button group" ||
    block.name === "Card" ||
    block.name === "Navbar" ||
    block.name === "Pagination" ||
    block.name === "Progress bar" ||
    (block.name === "Table" && block.tag === "div")
  );
}

function isNonExportableWrapper(block: LayoutBlock): boolean {
  if (block.name === "Button" || block.name === "Image" || block.name === "Label") {
    return block.tag === "div";
  }
  return (
    block.name === "Accordion" ||
    block.name === "Alert" ||
    block.name === "Badge" ||
    block.name === "Button group" ||
    block.name === "Card" ||
    block.name === "Carousel" ||
    block.name === "List group" ||
    block.name === "Modal" ||
    block.name === "Navbar" ||
    block.name === "Tabs" ||
    block.name === "Text" ||
    (block.name === "Table" && block.tag === "div")
  );
}

export function deriveBlockRuntime(block: LayoutBlock): BlockRuntime {
  const isContainer = block.name === "Container" || hasClass(block, "container");
  const isRow = block.name.startsWith("Row") || hasClass(block, "row");
  const isColumn = block.name === "Column" || hasClassPrefix(block, "col-");
  const isEditable = isEditableTextBlock(block);
  const ownsChrome = isRow || (!isContainer && isChromeRootBlock(block));

  return {
    childless: VOID_TAGS.has(block.tag),
    droppable: block.container && (isContainer || isColumn),
    draggable: ownsChrome,
    removable: ownsChrome,
    labeled: block.container && (isContainer || isRow || isColumn),
    editable: isEditable,
    styledChild: isStyledChildWrapper(block),
    exportable: !isNonExportableWrapper(block),
    availableProperties: getAvailableProperties(block),
    mainBlock: isContainer ? true : undefined,
    mainContent: isRow ? true : undefined,
  };
}
