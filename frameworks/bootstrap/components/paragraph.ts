import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_PARAGRAPH = (
  content?: string,
  properties?: { alignment: string; emphasis: string; lead: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Paragraph",
    tag: "p",
    container: false,
    content,
    properties,
    availableProperties,
    draggable: true,
    removable: true,
    editable: true,
  });
