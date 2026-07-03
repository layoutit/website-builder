import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_LABEL = (
  properties?: { style: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Label",
    tag: "div",
    content: [
      getBlock({
        name: "Label",
        class: "badge",
        tag: "span",
        content: "Label",
        container: false,
      }),
    ],
    properties,
    availableProperties,
    styledChild: true,
    container: true,
    removable: true,
    draggable: true,
    droppable: false,
    exportable: false,
  });
