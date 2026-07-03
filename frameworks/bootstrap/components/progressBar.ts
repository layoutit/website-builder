import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_PROGRESS_BAR = (
  properties?: { striped: string; animated: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Progress bar",
    class: "progress",
    tag: "div",
    attributes: {
      role: "progressbar",
      "aria-label": "Basic example",
      "aria-valuenow": "75",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
    },
    content: [
      getBlock({
        name: "Progress",
        class: "progress-bar w-75",
        tag: "div",
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
  });
