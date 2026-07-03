import { createHtmlZip } from "./export/htmlZip";
import { resolveExportMetadata, type ExportZipOptions } from "./export/metadata";
import { createReactZip } from "./export/reactZip";
import {
  getBootstrapReactSourceCode,
  getBootstrapSourceCode,
} from "./export/sourceCode";

export const createExportZip = async ({
  blockTree,
  type,
  title,
  description,
}: ExportZipOptions) => {
  const metadata = resolveExportMetadata({ title, description });
  const markup = type !== "javascript"
    ? getBootstrapReactSourceCode(blockTree)
    : getBootstrapSourceCode(blockTree);
  const zip = type !== "javascript"
    ? await createReactZip(markup, metadata)
    : await createHtmlZip(markup, metadata);

  return zip.generateAsync({ type: "blob" });
};
