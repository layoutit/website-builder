import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_BUTTON = (
  isAnchor?: boolean,
  properties?: {
    style?: string;
    size?: string;
    block?: string;
    active?: string;
    disabled?: string;
  },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: isAnchor ? "Anchor button" : "Button",
    tag: "div",
    availableProperties,
    content: [
      getBlock({
        name: "Button",
        class: "btn btn-success",
        tag: isAnchor ? "a" : "button",
        content: "Button",
        attributes: isAnchor
          ? {
              href: "#",
              role: "button",
            }
          : {
              type: "button",
            },
        properties,
        editable: true,
        container: false,
      }),
    ],
    styledChild: true,
    container: true,
    droppable: false,
    removable: true,
    draggable: true,
    exportable: false,
  });
