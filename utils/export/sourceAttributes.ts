import { IBlock } from "../../types";
import { escapeSourceText } from "./sourceText";

export type SourceTarget = "html" | "jsx";

const HTML_ATTRIBUTE_NAMES: Record<string, string> = {
  acceptCharset: "acceptcharset",
  autoComplete: "autocomplete",
  autoFocus: "autofocus",
  className: "class",
  colSpan: "colspan",
  contentEditable: "contenteditable",
  htmlFor: "for",
  maxLength: "maxlength",
  minLength: "minlength",
  readOnly: "readonly",
  rowSpan: "rowspan",
  spellCheck: "spellcheck",
  tabIndex: "tabindex",
};

const JSX_ATTRIBUTE_NAMES: Record<string, string> = {
  acceptcharset: "acceptCharset",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  class: "className",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  for: "htmlFor",
  maxlength: "maxLength",
  minlength: "minLength",
  readonly: "readOnly",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  tabindex: "tabIndex",
};

function toAttributeName(name: string, target: SourceTarget) {
  if (target === "html") {
    return HTML_ATTRIBUTE_NAMES[name] || name;
  }

  return JSX_ATTRIBUTE_NAMES[name.toLowerCase()] || name;
}

export function serializeAttributes(options: {
  attributes: IBlock["attributes"];
  classes: string;
  target: SourceTarget;
}) {
  const { attributes, classes, target } = options;
  const entries = [
    ...(classes ? [["class", classes]] : []),
    ...Object.entries(attributes || {}).filter(
      ([name]) => name !== "class" && name !== "className"
    ),
  ];

  if (entries.length === 0) return "";

  return entries
    .map(([name, value]) => {
      const attributeName = toAttributeName(name, target);
      return ` ${attributeName}="${escapeSourceText(value)}"`;
    })
    .join("");
}
