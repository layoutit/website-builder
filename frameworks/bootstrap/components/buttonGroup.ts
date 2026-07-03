import { IAvailableProperties } from "../../../types";
import { getBlock } from "../../../utils/block";

export const BOOTSTRAP_BUTTON_GROUP = (
  buttons: string[],
  properties?: { size?: string; direction: string },
  availableProperties?: IAvailableProperties[]
) =>
  getBlock({
    name: "Button group",
    tag: "div",
    content: [
      getBlock({
        name: "btn-group",
        class: "btn-group",
        tag: "div",
        attributes: {
          role: "group",
          "aria-label": "Button group",
        },
        content: buttons.map((button) =>
          getBlock({
            name: "Button",
            class: "btn btn-primary",
            tag: "button",
            attributes: {
              type: "button",
            },
            content: button,
            container: false,
          })
        ),
        container: true,
        droppable: false,
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
