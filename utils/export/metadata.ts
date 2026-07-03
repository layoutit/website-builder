import { IBlock } from "../../types";

export type ExportZipOptions = {
  blockTree: IBlock;
  type: "javascript" | "typescript";
  title?: string;
  description?: string;
};

export type ExportMetadata = {
  title: string;
  description: string;
  packageName: string;
  escapedTitle: string;
  escapedDescription: string;
};

const DEFAULT_TITLE = "layoutit-project";
const DEFAULT_DESCRIPTION = "Generated with Layoutit";

const normalizeText = (value: string | undefined, fallback: string) => {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    const replacements: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return replacements[char];
  });

const normalizePackageName = (value: string) => {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/(^[._-]+|[._-]+$)/g, "")
    .slice(0, 214);

  return normalized || DEFAULT_TITLE;
};

export function resolveExportMetadata(options: {
  title?: string;
  description?: string;
}): ExportMetadata {
  const title = normalizeText(options.title, DEFAULT_TITLE);
  const description = normalizeText(options.description, DEFAULT_DESCRIPTION);

  return {
    title,
    description,
    packageName: normalizePackageName(title),
    escapedTitle: escapeHtml(title),
    escapedDescription: escapeHtml(description),
  };
}
