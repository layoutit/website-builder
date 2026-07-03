import { IBlock } from "../../../types";
import { downloadFile } from "../../../utils/download";
import { createExportZip } from "../../../utils/exportZip";

const DEFAULT_TITLE = "layoutit-project";
const DEFAULT_DESCRIPTION = "Generated with Layoutit";

type DownloadType = "javascript" | "typescript";

export async function downloadLayoutZip(options: {
  blockTree: IBlock;
  type: DownloadType;
}) {
  const zipBlob = await createExportZip({
    blockTree: options.blockTree,
    type: options.type,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  });

  downloadFile(zipBlob, "zip");
}
