import { Frameworks } from "../types";

export function parseFrameworkClassName(framework?: Frameworks, classes?: string) {
  if (!classes) return "";
  if (framework && framework !== "bootstrap") return "";
  return classes;
}

export function normalizeHtmlAttributes(
  attributes?: { [key: string]: string | null }
): { [key: string]: string } | undefined {
  if (!attributes) return attributes;

  return Object.entries(attributes).reduce<{ [key: string]: string }>(
    (result, [key, value]) => {
      if (value === null || value === undefined) return result;
      if (key === "class") return result;
      if (key === "for") return { ...result, htmlFor: value };
      if (key === "autocomplete") return { ...result, autoComplete: value };

      return { ...result, [key]: value };
    },
    {}
  );
}

export function isChildlessElement(elementTag: string): boolean {
  return ["img", "br"].includes(elementTag.toLowerCase());
}
