import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_TITLE = (
  content?: string,
  properties?: { alignment: string; emphasis: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Title",
    class: "h3",
    tag: "h3",
    container: false,
    content,
    properties,
    availableProperties,
    draggable: true,
    removable: true,
    editable: true,
  });
